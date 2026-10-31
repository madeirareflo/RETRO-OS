// RETRO OS — Contratos e Definições de Tipos dos 37 Jogos (Missão 003P-ANTI)
// Extensão dos tipos do Retro Game Launcher para suportar todo o acervo histórico

export type GameStatus003P =
  | 'playable'              // Execução comprovada e testada no navegador
  | 'ready_for_manual_test' // Motor conectado e arquivos instalados; aguarda teste humano
  | 'installed'             // Arquivos presentes no IndexedDB
  | 'files_required'        // Perfil pronto, requer arquivos legítimos do usuário (ZIP)
  | 'engine_required'       // Requer motor WebAssembly dedicado ainda não compilado
  | 'museum'                // Ficha histórica, acervo cultural sem emulação web
  | 'user_approved';        // Aprovado explicitamente pelo proprietário após teste

export type EngineType003P =
  | 'dosbox-wasm'           // js-dos 6.22 / DOSBox WebAssembly (Totalmente Funcional)
  | 'scummvm-web'           // ScummVM WebAssembly (SCUMM v7 / Aventuras LucasArts)
  | 'devilutionx-wasm'      // DevilutionX WebAssembly (Diablo 1)
  | 'openclaw-wasm'         // OpenClaw WebAssembly (Captain Claw)
  | 'ioquake3-wasm'         // ioquake3 WebAssembly (Quake III Arena)
  | 're3-wasm'              // re3 WebAssembly (GTA III)
  | 'native-js'             // Jogos nativos TypeScript/Canvas (Mines, Snake, Naval)
  | 'none';                 // Sem motor (Modo Museu Histórico)

export interface GameCatalogProfile003P {
  id: string;
  catalogNumber: number;
  title: string;
  year: number;
  platform: 'dos' | 'win95_98' | 'winxp';
  platformDisplay: string;
  genre: string;
  developer: string;
  publisher: string;
  description: string;
  engineId: EngineType003P;
  status: GameStatus003P;
  entryExecutable?: string;
  requiredFiles: string[];
  optionalFiles: string[];
  savePattern: string;
  emulationProfile?: {
    cycles: number | 'auto' | 'max';
    machine: string;
    memoryMb: number;
    aspectRatio: boolean;
    scaler: string;
    soundCard: string;
    oplMode: string;
  };
  controlsHint: string;
  savesHint: string;
  licenseNotes: string;
  legalSourceUrl: string;
}
