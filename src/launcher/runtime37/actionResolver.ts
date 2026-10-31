// RETRO OS — Resolução de Estado e Controle do Botão "Jogar" (Missão 003P-ANTI)
// Determina as ações ativas na UI para cada jogo, sem criar botões falsos

import type {GameCatalogProfile003P} from './types003p';

export interface GameButtonState {
  canPlay: boolean;
  buttonLabel: string;
  buttonAction: 'launch_dosbox' | 'launch_wasm_port' | 'launch_scummvm' | 'open_installer' | 'open_museum' | 'none';
  badgeLabel: string;
  badgeColor: 'green' | 'blue' | 'yellow' | 'gray' | 'purple';
  statusExplanation: string;
}

/**
 * Avalia as condições reais do jogo no cliente e determina o estado do botão principal.
 */
export function resolveGameAction(
  profile: GameCatalogProfile003P,
  isFilesInstalledLocally: boolean,
  isEngineSupportedInBrowser: boolean
): GameButtonState {
  // 1. Títulos do Museu Histórico (Windows nativo sem motor web)
  if (profile.engineId === 'none' || profile.status === 'museum') {
    return {
      canPlay: false,
      buttonLabel: 'Ver Ficha no Museu',
      buttonAction: 'open_museum',
      badgeLabel: 'MUSEU HISTÓRICO',
      badgeColor: 'purple',
      statusExplanation: `${profile.title} é preservado no Museu Histórico do RETRO OS como marco cultural. Não possui emulação web nativa.`
    };
  }

  if(!isEngineSupportedInBrowser)return {canPlay:false,buttonLabel:'Motor pendente',buttonAction:'none',badgeLabel:'MOTOR PENDENTE',badgeColor:'blue',statusExplanation:'Motor/perfil ainda não validado neste runtime. Arquivos sozinhos não habilitam execução.'};
  // 2. Jogos DOSBox com arquivos instalados no IndexedDB
  if (profile.engineId === 'dosbox-wasm' && isEngineSupportedInBrowser && isFilesInstalledLocally) {
    return {
      canPlay: true,
      buttonLabel: `Jogar ${profile.title}`,
      buttonAction: 'launch_dosbox',
      badgeLabel: 'PRONTO P/ JOGAR',
      badgeColor: 'green',
      statusExplanation: 'Arquivos validados e instalados no armazenamento local. Clique para iniciar no DOSBox WebAssembly.'
    };
  }

  // 3. Jogos DOSBox aguardando arquivos do usuário
  if (profile.engineId === 'dosbox-wasm' && isEngineSupportedInBrowser && !isFilesInstalledLocally) {
    return {
      canPlay: false,
      buttonLabel: 'Importar Arquivos (ZIP)',
      buttonAction: 'open_installer',
      badgeLabel: 'ARQUIVOS NECESSÁRIOS',
      badgeColor: 'yellow',
      statusExplanation: `Perfil de emulação preparado. Requer que você forneça o pacote ZIP com ${profile.requiredFiles.join(', ')}.`
    };
  }

  // 4. Jogos com motores WebAssembly dedicados (DevilutionX, OpenClaw, ScummVM, etc.)
  if (profile.engineId !== 'dosbox-wasm' && (profile.engineId as string) !== 'none') {
    if (isEngineSupportedInBrowser && isFilesInstalledLocally) {
      return {
        canPlay: true,
        buttonLabel: `Jogar ${profile.title}`,
        buttonAction: profile.engineId === 'scummvm-web' ? 'launch_scummvm' : 'launch_wasm_port',
        badgeLabel: 'PRONTO P/ JOGAR',
        badgeColor: 'green',
        statusExplanation: 'Motor WebAssembly dedicado e arquivos de dados carregados.'
      };
    }

    return {
      canPlay: false,
      buttonLabel: 'Requer Motor Dedicado',
      buttonAction: 'open_installer',
      badgeLabel: 'MOTOR EM PREPARAÇÃO',
      badgeColor: 'blue',
      statusExplanation: `${profile.title} é suportado pelo motor ${profile.engineId}. Integração web pendente, sem data prometida.`
    };
  }

  return {
    canPlay: false,
    buttonLabel: 'Indisponível',
    buttonAction: 'none',
    badgeLabel: 'INDISPONÍVEL',
    badgeColor: 'gray',
    statusExplanation: 'Sem suporte técnico de execução.'
  };
}
