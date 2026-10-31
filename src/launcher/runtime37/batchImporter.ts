// RETRO OS — Gerenciador de Importação em Lote (Missão 003P-ANTI)
// Importação segura e transparente de múltiplos pacotes ZIP para a biblioteca IndexedDB

import {identifyPackageCandidate, validateGamePackage, type BatchCandidateMatch} from './packageInstaller';

export interface BatchItemState {
  file: File;
  archiveName: string;
  match: BatchCandidateMatch;
  validationStatus: 'pending' | 'valid' | 'invalid' | 'skipped';
  validationMessage: string;
  filesInside: string[];
  installed: boolean;
}

export interface BatchSummary {
  totalFiles: number;
  matchedCount: number;
  validCount: number;
  invalidCount: number;
  skippedCount: number;
  items: BatchItemState[];
}

/**
 * Cria a sessão de importação em lote a partir de uma lista de arquivos File recebidos via drag-and-drop.
 */
export function createBatchImportSession(files: File[]): BatchSummary {
  const items: BatchItemState[] = files.map(f => {
    const match = identifyPackageCandidate(f.name);
    return {
      file: f,
      archiveName: f.name,
      match,
      validationStatus: 'pending',
      validationMessage: match.status === 'matched' 
        ? `Identificado automaticamente como: ${match.matchedTitle} (${match.confidence}% de certeza).`
        : match.status === 'ambiguous'
        ? `Correspondência ambígua entre: ${match.possibleCandidates.join(', ')}.`
        : 'Não foi possível identificar o jogo pelo nome do arquivo ZIP.',
      filesInside: [],
      installed: false
    };
  });

  return {
    totalFiles: items.length,
    matchedCount: items.filter(i => i.match.status === 'matched').length,
    validCount: 0,
    invalidCount: 0,
    skippedCount: 0,
    items
  };
}

/**
 * Atualiza o estado de um item do lote após descompactação da lista de arquivos em memória.
 */
export function updateBatchItemWithFiles(
  item: BatchItemState,
  archiveFiles: string[]
): BatchItemState {
  item.filesInside = archiveFiles;

  // Se o match estava ambíguo ou não reconhecido, reavaliar com a lista de arquivos internos
  if (item.match.status !== 'matched') {
    item.match = identifyPackageCandidate(item.archiveName, archiveFiles);
  }

  if (item.match.status === 'matched' && item.match.matchedGameId) {
    const val = validateGamePackage(item.match.matchedGameId, archiveFiles);
    item.validationStatus = val.isValid ? 'valid' : 'invalid';
    item.validationMessage = val.diagnosticMessage;
  } else {
    item.validationStatus = 'invalid';
    item.validationMessage = 'Arquivo não associado a nenhum perfil de jogo suportado.';
  }

  return item;
}
