// RETRO OS — Instalador de Jogos e Verificador Estrutural por Perfil (Missão 003P-ANTI)
// Validação estática de arquivos de pacotes ZIP com suporte a importação individual e lote

import {CATALOG_37_GAMES, getProfileById} from './catalog37Games';
import type {GameCatalogProfile003P} from './types003p';

export interface FileInspectionResult {
  isValid: boolean;
  gameId: string;
  matchedProfile?: GameCatalogProfile003P;
  status: 'valid' | 'missing_required' | 'unsupported_platform' | 'unknown_archive';
  entryExecutableFound?: string;
  detectedFiles: string[];
  missingRequiredFiles: string[];
  diagnosticMessage: string;
}

export interface BatchCandidateMatch {
  archiveName: string;
  matchedGameId?: string;
  matchedTitle?: string;
  status: 'matched' | 'ambiguous' | 'unrecognized';
  possibleCandidates: string[];
  confidence: number;
}

/**
 * Valida a lista de arquivos presentes dentro de um arquivo ZIP para um determinado jogo.
 */
export function validateGamePackage(
  gameId: string,
  archiveFiles: string[]
): FileInspectionResult {
  const profile = getProfileById(gameId);
  if (!profile) {
    return {
      isValid: false,
      gameId,
      status: 'unknown_archive',
      detectedFiles: archiveFiles,
      missingRequiredFiles: [],
      diagnosticMessage: `Nenhum perfil cadastrado para o ID: ${gameId}`
    };
  }

  // Título exclusivo do Museu Histórico (sem arquivos executáveis esperados)
  if (profile.engineId === 'none' || profile.status === 'museum') {
    return {
      isValid: false,
      gameId,
      matchedProfile: profile,
      status: 'unsupported_platform',
      detectedFiles: archiveFiles,
      missingRequiredFiles: [],
      diagnosticMessage: `${profile.title} é um clássico de Windows preservado no Modo Museu Histórico do RETRO OS. Execução via navegador não é suportada.`
    };
  }

  // Normalizar caminhos para minúsculas e barras normais
  const normalizedArchive = archiveFiles.map(f => f.replace(/\\/g, '/').toLowerCase());
  const missing: string[] = [];

  for (const req of profile.requiredFiles) {
    const reqNorm = req.toLowerCase();
    const found = normalizedArchive.some(f => f === reqNorm || f.endsWith('/'+reqNorm));
    if (!found) {
      missing.push(req);
    }
  }

  if (missing.length > 0) {
    return {
      isValid: false,
      gameId,
      matchedProfile: profile,
      status: 'missing_required',
      detectedFiles: archiveFiles,
      missingRequiredFiles: missing,
      diagnosticMessage: `Faltam arquivos obrigatórios para ${profile.title}: ${missing.join(', ')}. Certifique-se de que o pacote ZIP contenha a distribuição completa dos dados do jogo.`
    };
  }

  return {
    isValid: true,
    gameId,
    matchedProfile: profile,
    status: 'valid',
    entryExecutableFound: profile.entryExecutable,
    detectedFiles: archiveFiles,
    missingRequiredFiles: [],
    diagnosticMessage: `Todos os arquivos requeridos para ${profile.title} foram validados com sucesso.`
  };
}

/**
 * Analisa o nome de um arquivo ZIP ou os arquivos dentro dele e identifica automaticamente a qual jogo dos 37 ele pertence.
 * Usado pelo assistente de importação em lote para mapeamento sem intervenção manual cansativa.
 */
export function identifyPackageCandidate(
  archiveName: string,
  containedFiles: string[] = []
): BatchCandidateMatch {
  const cleanName = archiveName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const matches: { game: GameCatalogProfile003P; score: number }[] = [];

  for (const game of CATALOG_37_GAMES) {
    let score = 0;
    const cleanTitle = game.title.toLowerCase().replace(/[^a-z0-9]/g, '');

    // 1. Checagem por nome do arquivo
    if (cleanName.includes(cleanTitle) || cleanTitle.includes(cleanName)) {
      score += 50;
    }

    // 2. Checagem por executável característico
    if (game.entryExecutable && containedFiles.length > 0) {
      const exeLower = game.entryExecutable.toLowerCase();
      if (containedFiles.some(f => (f.toLowerCase()===exeLower||f.toLowerCase().endsWith('/'+exeLower)))) {
        score += 30;
      }
    }

    // 3. Checagem por arquivo de dados característico (ex: DOOM1.WAD, LEVELS.DAT, DUKE3D.GRP)
    if (game.requiredFiles.length > 0 && containedFiles.length > 0) {
      for (const req of game.requiredFiles) {
        const reqLower = req.toLowerCase();
        if (containedFiles.some(f => (f.toLowerCase()===reqLower||f.toLowerCase().endsWith('/'+reqLower)))) {
          score += 20;
        }
      }
    }

    if (score >= 40) {
      matches.push({ game, score });
    }
  }

  matches.sort((a, b) => b.score - a.score);

  if (matches.length === 1 || (matches.length > 1 && matches[0].score > matches[1].score + 20)) {
    return {
      archiveName,
      matchedGameId: matches[0].game.id,
      matchedTitle: matches[0].game.title,
      status: 'matched',
      possibleCandidates: [matches[0].game.title],
      confidence: Math.min(matches[0].score, 100)
    };
  }

  if (matches.length > 1) {
    return {
      archiveName,
      status: 'ambiguous',
      possibleCandidates: matches.map(m => m.game.title),
      confidence: matches[0].score
    };
  }

  return {
    archiveName,
    status: 'unrecognized',
    possibleCandidates: [],
    confidence: 0
  };
}
