import type {EngineAdapterId} from './types';

export const ENGINE_ADAPTERS: {id:EngineAdapterId;name:string;version:string;supportedPlatforms:string[];isAvailable:boolean;availabilityNotes:string}[] = [
  {
    id: 'dosbox-wasm',
    name: 'DOSBox WebAssembly (js-dos 6.22 runtime)',
    version: '6.22.60',
    supportedPlatforms: ['dos'],
    isAvailable: true,
    availabilityNotes: 'Integrado ao RETRO OS para execução real de binários DOS em WebAssembly no cliente.'
  },
  {
    id: 'native-js',
    name: 'RETRO OS Native JavaScript Game Engine',
    version: '1.0.0',
    supportedPlatforms: ['browser', 'win95_98'],
    isAvailable: true,
    availabilityNotes: 'Módulos de jogos desenvolvidos internamente com Canvas/DOM (Batalha Naval, Campo Minado, Snake, Paciência).'
  },
  {
    id: 'scummvm-web',
    name: 'ScummVM Web (WebAssembly)',
    version: '2.8.0-future',
    supportedPlatforms: ['dos', 'arcade', 'other'],
    isAvailable: false,
    availabilityNotes: 'Futuro: requer avaliação de licenciamento, tamanho do binário WASM e empacotamento de assets sob demanda.'
  },
  {
    id: 'js-dos-v7',
    name: 'js-dos v7+ (Cloud-DOS / Emscripten mod)',
    version: '7.x-future',
    supportedPlatforms: ['dos'],
    isAvailable: false,
    availabilityNotes: 'Futuro: sob análise para suporte ampliado a ciclos dinâmicos e modo protegido avançado.'
  },
  {
    id: 'retroarch-wasm',
    name: 'RetroArch WebAssembly / Libretro Web Core',
    version: '1.16-future',
    supportedPlatforms: ['arcade', 'other'],
    isAvailable: false,
    availabilityNotes: 'Futuro: em avaliação para núcleos abertos de computadores clássicos de 8/16-bit.'
  }
];

export function getEngineAdapter(id: EngineAdapterId): (typeof ENGINE_ADAPTERS)[number] | undefined {
  return ENGINE_ADAPTERS.find(adapter => adapter.id === id);
}
