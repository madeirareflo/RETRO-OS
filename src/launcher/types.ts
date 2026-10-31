// RETRO OS — Retro Game Launcher (003G)
// Extensible game entry contract inspired by LaunchBox / eXoDOS architecture, adapted for web client sandbox

export type GameStatus =
  | 'playable'           // Execution validated in browser (JS native or WASM emulator)
  | 'installed'          // Files / assets present in local storage, execution ready to test
  | 'ready_to_configure' // Valid package recognized, needs setup profile
  | 'requires_files'     // Metadata cataloged, actual game files absent
  | 'incompatible'       // Known incompatibility block in current web environment
  | 'museum'             // Historical editorial entry without execution
  | 'evaluating';        // Compatibility under review

export type PlatformId =
  | 'dos'
  | 'win95_98'
  | 'winxp'
  | 'browser'
  | 'arcade'
  | 'other';

export type EngineAdapterId =
  | 'native-js'
  | 'dosbox-wasm'
  | 'scummvm-web'     // Future adapter
  | 'js-dos-v7'       // Future adapter
  | 'retroarch-wasm'  // Future adapter
  | 'none';

export interface GameEntry {
  id: string;                     // Unique identifier e.g. "dos-disquete" or "museum-1"
  title: string;                  // Display title e.g. "Disquete Perdido DOS"
  sortTitle?: string;             // For alphabetical sorting
  year: number;                   // Launch year e.g. 1993, 2026
  platform: PlatformId;           // Platform classification
  platformDisplay: string;        // Human readable platform e.g. "DOS real em DOSBox/WebAssembly"
  genre: string;                  // Primary genre e.g. "Aventura", "Labirinto", "FPS"
  genres?: string[];              // Multiple genres
  developer: string;              // Creator/Studio
  publisher: string;              // Original publisher
  description: string;            // Notes, relevance or manual synopsis
  mechanics?: string;             // Mechanics summary
  requirements?: string;          // System requirements
  availability?: string;          // Legal availability notes
  externalUrl?: string | null;    // Legal store/reference link
  sourceReference?: string;       // Wiki or documentation source
  status: GameStatus;             // Visible consistent state (Phase 9)
  isFavorite: boolean;            // Favorite marker
  isInstalled: boolean;           // Local installation flag
  isPlayable: boolean;            // Direct play capability flag
  appId?: string | null;          // RETRO OS window manager app ID e.g. "dosgame", "naval"
  engineId: EngineAdapterId;      // Selected emulator / engine adapter (Phase 8)
  entryExecutable?: string;       // e.g. "DISQUETE.COM", "GAME.EXE"
  virtualPath?: string;           // Virtual storage path e.g. "A:/GAMES/DISQUETE.COM"
  emulationProfile?: {
    cycles?: number | 'auto' | 'max';
    machine?: string;
    memoryMb?: number;
    aspectRatio?: boolean;
    scaler?: string;
    soundDevice?: string;
  };
  customCollections?: string[];   // User or predefined collections
  dateAdded: string;              // ISO timestamp
  lastPlayed?: string | null;     // ISO timestamp
  playCount: number;
  boxArtUrl?: string | null;      // Box front image or custom vector art
  screenshotUrls?: string[];      // Array of editorial / preview screenshots
  metadataOrigin: 'builtin-museum' | 'user-imported' | 'synthetic-benchmark';
}

export interface EmulatorAdapter {
  id: EngineAdapterId;
  name: string;
  version: string;
  supportedPlatforms: PlatformId[];
  isAvailable: boolean;          // true if adapter is currently implemented
  availabilityNotes?: string;
  init: (container: HTMLElement, config?: Record<string, unknown>) => Promise<void>;
  mountFiles: (files: { name: string; data: Uint8Array }[]) => Promise<void>;
  launch: (entryExecutable: string) => Promise<void>;
  pause: () => void;
  resume: () => void;
  requestFullscreen: () => void;
  mute: (muted: boolean) => void;
  shutdown: () => Promise<void>;
}
