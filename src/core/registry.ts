import type {Language} from './i18n';
import {getTranslation} from './i18n';

export const registry=[
{id:'computer',name:'Meu Computador',icon:'computer',group:'Acessórios'},
{id:'documents',name:'Meus Documentos',icon:'folder',group:'Documentos'},
{id:'floppy',name:'Disquete A:',icon:'floppy',group:'Acessórios'},
{id:'internet',name:'Internet',icon:'globe',group:'Programas'},
{id:'games',name:'Jogos',icon:'games',group:'Jogos'},
{id:'paint',name:'Paint',icon:'paint',group:'Acessórios'},
{id:'notepad',name:'Bloco de Notas',icon:'note',group:'Acessórios'},
{id:'player',name:'Toca-MP3',icon:'music',group:'Programas'},
{id:'chat',name:'Bate-Papo',icon:'chat',group:'Programas'},
{id:'trash',name:'Lixeira',icon:'trash',group:'Acessórios'},
{id:'settings',name:'Painel de Controle',icon:'settings',group:'Configurações'},
{id:'about',name:'Sobre o RETRO OS',icon:'disc',group:'Ajuda'},
{id:'calculator',name:'Calculadora',icon:'calculator',group:'Acessórios'},
{id:'terminal',name:'Terminal',icon:'terminal',group:'Acessórios'},
{id:'mines',name:'Campo Minado',icon:'mine',group:'Jogos'},
{id:'snake',name:'Snake',icon:'snake',group:'Jogos'},
{id:'solitaire',name:'Paciência',icon:'cards',group:'Jogos'},
{id:'run',name:'Executar',icon:'terminal',group:'Programas'},
{id:'dialup',name:'Conectar à Internet',icon:'globe',group:'Programas'},
{id:'timemachine',name:'Máquina do Tempo',icon:'disc',group:'Programas'},
{id:'saver',name:'Protetor de Tela',icon:'computer',group:'Configurações'},
{id:'backup',name:'Backup e Restauração',icon:'floppy',group:'Configurações'},
{id:'lan',name:'LAN House',icon:'computer',group:'Programas'},
{id:'community',name:'Comunidades e Perfis',icon:'chat',group:'Programas'},
{id:'messenger',name:'Retro Messenger',icon:'chat',group:'Programas'},
{id:'dosgame',name:'Disquete Perdido DOS',icon:'floppy',group:'Jogos'},
{id:'dos-freedoom',name:'Freedoom Phase 1',icon:'games',group:'Jogos'},
{id:'dos-klab',name:"Ken's Labyrinth",icon:'games',group:'Jogos'},
{id:'dos-skyroads',name:'SkyRoads',icon:'games',group:'Jogos'},
{id:'retrolauncher',name:'Retro Game Launcher',icon:'games',group:'Jogos'},
{id:'dos-imported',name:'Jogo DOS importado',icon:'floppy',group:'Jogos'},
{id:'gamecenter',name:'Retro Game Center',icon:'games',group:'Jogos'},
{id:'naval',name:'Batalha Naval',icon:'games',group:'Jogos'},
{id:'tasks',name:'Gerenciador de Tarefas',icon:'computer',group:'Acessórios'},
{id:'media',name:'Central de Discos',icon:'disc',group:'Programas'}
] as const;

export type AppId=typeof registry[number]['id'];

const appTranslationKeys: Record<AppId, keyof ReturnType<typeof getTranslation>> = {
  computer: 'appComputer',
  documents: 'appDocuments',
  floppy: 'appFloppy',
  internet: 'appInternet',
  games: 'appGames',
  paint: 'appPaint',
  notepad: 'appNotepad',
  player: 'appPlayer',
  chat: 'appChat',
  trash: 'appTrash',
  settings: 'appSettings',
  about: 'appAbout',
  calculator: 'appCalculator',
  terminal: 'appTerminal',
  mines: 'appMines',
  snake: 'appSnake',
  solitaire: 'appSolitaire',
  run: 'appRun',
  dialup: 'appDialup',
  timemachine: 'appTimeMachine',
  saver: 'appSaver',
  backup: 'appBackup',
  lan: 'appLan',
  community: 'appCommunity',
  messenger: 'appMessenger',
  dosgame: 'appDosGame',
  'dos-freedoom': 'appFreedoom',
  'dos-klab': 'appKlab',
  'dos-skyroads': 'appSkyroads',
  retrolauncher: 'appLauncher',
  'dos-imported': 'appDosImported',
  gamecenter: 'appGameCenter',
  naval: 'appNaval',
  tasks: 'appTasks',
  media: 'appMedia'
};

export const appInfo = (id: AppId, lang: Language = 'pt-BR') => {
  const item = registry.find(a => a.id === id)!;
  const t = getTranslation(lang);
  const key = appTranslationKeys[id];
  const translatedName = key && typeof t[key] === 'string' ? (t[key] as string) : item.name;
  return {
    ...item,
    name: translatedName
  };
};
