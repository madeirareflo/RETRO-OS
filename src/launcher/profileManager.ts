// RETRO OS — Gerenciador e Conversor de Perfis DOSBox e eXoDOS (Missão 003J)

export type MachineType = 'hercules' | 'cga' | 'tandy' | 'ega' | 'vga' | 'svga_s3';
export type SoundCardType = 'none' | 'sb16' | 'sb2' | 'sbpro' | 'gus';

export interface EmulationProfile {
  id: string;
  name: string;
  description: string;
  machine: MachineType;
  memoryMb: number;
  cycles: number | 'auto' | 'max';
  aspectRatio: boolean;
  scaler: string;
  soundCard: SoundCardType;
  oplMode: 'auto' | 'opl2' | 'opl3';
  soundRate: number;
  entryExecutable: string;
  parameters?: string;
  customAutoexec?: string[];
  isExoConverted?: boolean;
  exoConversionNotes?: string[];
}

export const BUILTIN_PROFILES: Record<string, EmulationProfile> = {
  'dos-basic': {
    id: 'dos-basic',
    name: 'DOS Básico (Compatibilidade Geral)',
    description: 'Configuração equilibrada para títulos de 16/32-bit (VGA, 16MB RAM, ciclos automáticos).',
    machine: 'vga',
    memoryMb: 16,
    cycles: 'auto',
    aspectRatio: true,
    scaler: 'normal2x',
    soundCard: 'sb16',
    oplMode: 'opl2',
    soundRate: 44100,
    entryExecutable: 'GAME.EXE'
  },
  'dos-platform': {
    id: 'dos-platform',
    name: 'DOS Plataforma & Arcade (Ciclos Fixos)',
    description: 'Ciclos moderados e limitação estrita para jogos com física vinculada à taxa de clock (ex: SkyRoads, Prince of Persia).',
    machine: 'vga',
    memoryMb: 8,
    cycles: 3000,
    aspectRatio: true,
    scaler: 'normal2x',
    soundCard: 'sb16',
    oplMode: 'opl2',
    soundRate: 44100,
    entryExecutable: 'PLAY.EXE'
  },
  'dos-adventure': {
    id: 'dos-adventure',
    name: 'DOS Aventura & Point-and-Click',
    description: 'Otimizado para clássicos SCUMM e aventuras com interface de mouse, VGA 256 cores e áudio AdLib.',
    machine: 'vga',
    memoryMb: 16,
    cycles: 4000,
    aspectRatio: true,
    scaler: 'normal2x',
    soundCard: 'sb16',
    oplMode: 'opl3',
    soundRate: 44100,
    entryExecutable: 'START.EXE'
  },
  'dos-fps': {
    id: 'dos-fps',
    name: 'DOS FPS & 3D (Desempenho Máximo)',
    description: 'Memória estendida de 32MB a 64MB e ciclos máximos para jogos de ação tridimensional (ex: FastDoom, Ken\'s Labyrinth).',
    machine: 'svga_s3',
    memoryMb: 32,
    cycles: 'max',
    aspectRatio: true,
    scaler: 'normal2x',
    soundCard: 'sb16',
    oplMode: 'opl3',
    soundRate: 44100,
    entryExecutable: 'DOOM.EXE'
  },
  'dos-strategy': {
    id: 'dos-strategy',
    name: 'DOS Estratégia em Tempo Real',
    description: 'Suporte a SVGA com alta resolução virtual e ciclos ajustados para IA de RTS clássicos.',
    machine: 'svga_s3',
    memoryMb: 32,
    cycles: 'auto',
    aspectRatio: true,
    scaler: 'normal2x',
    soundCard: 'sb16',
    oplMode: 'opl3',
    soundRate: 44100,
    entryExecutable: 'WAR.EXE'
  }
};

export interface ExoConversionResult {
  profile: EmulationProfile;
  recognizedKeys: { key: string; originalValue: string; convertedValue: unknown }[];
  ignoredKeys: { key: string; originalValue: string; reason: string }[];
}

/**
 * Converte um arquivo INI/CONF padrão do DOSBox (como os do eXoDOS) para o perfil nativo do RETRO OS.
 * Modo 100% estático e seguro sem execução de scripts no hospedeiro.
 */
export function convertExoDosConfig(confContent: string, titleHint = 'Jogo eXoDOS'): ExoConversionResult {
  const recognizedKeys: ExoConversionResult['recognizedKeys'] = [];
  const ignoredKeys: ExoConversionResult['ignoredKeys'] = [];

  const profile: EmulationProfile = {
    id: `exo-${Date.now()}`,
    name: `Perfil Convertido: ${titleHint}`,
    description: `Perfil importado e adaptado do eXoDOS para execução web no RETRO OS.`,
    machine: 'vga',
    memoryMb: 16,
    cycles: 'auto',
    aspectRatio: true,
    scaler: 'normal2x',
    soundCard: 'sb16',
    oplMode: 'opl3',
    soundRate: 44100,
    entryExecutable: 'GAME.EXE',
    isExoConverted: true,
    exoConversionNotes: []
  };

  const lines = confContent.split('\n');
  let currentSection = '';

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#') || line.startsWith(';')) continue;

    if (line.startsWith('[') && line.endsWith(']')) {
      currentSection = line.slice(1, -1).toLowerCase();
      continue;
    }

    const eqIdx = line.indexOf('=');
    if (eqIdx === -1) continue;

    const key = line.slice(0, eqIdx).trim().toLowerCase();
    const val = line.slice(eqIdx + 1).trim();

    // Seção [dosbox]
    if (currentSection === 'dosbox') {
      if (key === 'memsize') {
        const num = parseInt(val, 10);
        if (!isNaN(num) && num > 0) {
          profile.memoryMb = Math.min(Math.max(num, 4), 64);
          recognizedKeys.push({ key: 'memsize', originalValue: val, convertedValue: profile.memoryMb });
        }
      } else if (key === 'machine') {
        if (['cga', 'tandy', 'ega', 'vga', 'svga_s3'].includes(val.toLowerCase())) {
          profile.machine = val.toLowerCase() as MachineType;
          recognizedKeys.push({ key: 'machine', originalValue: val, convertedValue: profile.machine });
        } else {
          ignoredKeys.push({ key: 'machine', originalValue: val, reason: 'Máquina legada convertida para padrão VGA' });
        }
      } else {
        ignoredKeys.push({ key: `${currentSection}.${key}`, originalValue: val, reason: 'Opção específica de host nativo' });
      }
    }
    // Seção [cpu]
    else if (currentSection === 'cpu') {
      if (key === 'cycles') {
        const lowerVal = val.toLowerCase();
        if (lowerVal === 'auto' || lowerVal === 'max') {
          profile.cycles = lowerVal;
          recognizedKeys.push({ key: 'cycles', originalValue: val, convertedValue: profile.cycles });
        } else {
          const cNum = parseInt(val, 10);
          if (!isNaN(cNum) && cNum > 0) {
            profile.cycles = cNum;
            recognizedKeys.push({ key: 'cycles', originalValue: val, convertedValue: profile.cycles });
          }
        }
      } else {
        ignoredKeys.push({ key: `${currentSection}.${key}`, originalValue: val, reason: 'Parâmetro de arquitetura de CPU x86 nativa' });
      }
    }
    // Seção [sblaster]
    else if (currentSection === 'sblaster') {
      if (key === 'oplmode') {
        if (val.toLowerCase().includes('opl3')) profile.oplMode = 'opl3';
        else profile.oplMode = 'opl2';
        recognizedKeys.push({ key: 'oplmode', originalValue: val, convertedValue: profile.oplMode });
      } else if (key === 'sbtype') {
        if (val.toLowerCase().includes('none')) profile.soundCard = 'none';
        else profile.soundCard = 'sb16';
        recognizedKeys.push({ key: 'sbtype', originalValue: val, convertedValue: profile.soundCard });
      } else {
        ignoredKeys.push({ key: `${currentSection}.${key}`, originalValue: val, reason: 'Parâmetro de porta/IRQ de hardware' });
      }
    }
    // Seções nativas não aplicáveis ao sandbox do navegador
    else if (['ipx', 'serial', 'joystick', 'pci', 'midi'].includes(currentSection)) {
      ignoredKeys.push({ key: `${currentSection}.${key}`, originalValue: val, reason: 'Subsistema não aplicável ao sandbox WebAssembly' });
    }
  }

  return { profile, recognizedKeys, ignoredKeys };
}
