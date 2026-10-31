// RETRO OS — Motor de Execução e Montagem DOSBox WebAssembly dos 16 Jogos DOS
// Missão 003P-ANTI • Inicializador Robusto e Isolado para js-dos 6.22

import {getProfileById} from './catalog37Games';
import {safeDosPath} from '../packageValidation';

export interface MountedDosTree {
  rootVirtualDir: string;
  entryExecutable: string;
  files: { name: string; data: Uint8Array }[];
  mountScript: string[];
}

export interface DosRuntimeConfig {
  gameId: string;
  title: string;
  executable: string;
  cycles: number | 'auto' | 'max';
  machine: string;
  memoryMb: number;
  aspectRatio: boolean;
  scaler: string;
  soundCard: string;
  oplMode: string;
  autoexecCommands: string[];
}

/**
 * Normaliza os arquivos de um pacote ZIP para criar a raiz virtual de montagem C: do DOSBox.
 * Se o pacote contiver uma pasta pai (ex: DOOM/DOOM.EXE), a subárvore é normalizada para a raiz virtual.
 */
export function prepareDosFilesystem(
  gameId: string,
  rawArchiveFiles: { name: string; data: Uint8Array }[]
): MountedDosTree {
  const profile = getProfileById(gameId);
  if (!profile || profile.engineId !== 'dosbox-wasm') {
    throw new Error(`Jogo ${gameId} não é um título compatível com DOSBox WebAssembly.`);
  }

  rawArchiveFiles=rawArchiveFiles.map(f=>({...f,name:safeDosPath(f.name.replaceAll('\\','/'))}));
  const targetExe = (profile.entryExecutable || '').toUpperCase();
  
  // Localizar o caminho do executável dentro do arquivo ZIP
  const exeEntry = rawArchiveFiles.find(f => {
    const baseName = f.name.split('/').at(-1)?.split('\\').at(-1)?.toUpperCase();
    return baseName === targetExe;
  });

  if (!exeEntry) {
    throw new Error(`Executável ${targetExe} não encontrado no pacote fornecido para ${profile.title}.`);
  }

  // Determinar diretório base dentro do ZIP
  const normalizedExePath = exeEntry.name.replace(/\\/g, '/');
  const baseDir = normalizedExePath.slice(0, normalizedExePath.lastIndexOf('/') + 1);

  // Filtrar arquivos pertencentes a esse diretório e remover o prefixo da pasta
  const virtualFiles = rawArchiveFiles
    .filter(f => f.name.replace(/\\/g, '/').startsWith(baseDir))
    .map(f => {
      const normName = f.name.replace(/\\/g, '/');
      const cleanName = normName.slice(baseDir.length);
      return {
        name: cleanName,
        data: f.data
      };
    })
    .filter(f => f.name.length > 0 && !f.name.endsWith('/'));

  // Construir comandos de autoexec limpos
  const mountScript = [
    `mount c .`,
    `c:`,
    `@cls`,
    `${targetExe}`
  ];

  return {
    rootVirtualDir: 'C:/',
    entryExecutable: targetExe,
    files: virtualFiles,
    mountScript
  };
}

/**
 * Gera a configuração precisa de runtime para o dosbox.conf / js-dos.
 */
export function buildDosRuntimeConfig(gameId: string): DosRuntimeConfig {
  const profile = getProfileById(gameId);
  if (!profile) {
    throw new Error(`Perfil do jogo ${gameId} não encontrado.`);
  }

  const emu = profile.emulationProfile || {
    cycles: 20000,
    machine: 'svga_s3',
    memoryMb: 16,
    aspectRatio: true,
    scaler: 'normal2x',
    soundCard: 'sb16',
    oplMode: 'opl3'
  };

  const autoexecCommands = [
    `mount c .`,
    `c:`,
    `@cls`,
    `${profile.entryExecutable || 'GAME.EXE'}`
  ];

  return {
    gameId: profile.id,
    title: profile.title,
    executable: profile.entryExecutable || 'GAME.EXE',
    cycles: emu.cycles,
    machine: emu.machine,
    memoryMb: emu.memoryMb,
    aspectRatio: emu.aspectRatio,
    scaler: emu.scaler,
    soundCard: emu.soundCard,
    oplMode: emu.oplMode,
    autoexecCommands
  };
}
