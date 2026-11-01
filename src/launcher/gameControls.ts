import {getProfileById} from './runtime37/catalog37Games';

export interface ControlsManual {
  id: string;
  title: string;
  version: string;
  summary: string;
  start: string;
  rows: {keys: string; action: string; note: string}[];
  pause: string;
  menu: string;
  exit: string;
  audio: string;
  saves: string;
  sources: {title: string; url: string}[];
}

const manuals: Record<string, ControlsManual> = {
  prince: {
    id: 'prince',
    title: 'Prince of Persia',
    version: 'Demo DOS 1.0; outras edições podem diferir',
    summary: 'Setas: mover, saltar e abaixar · Shift: passos/ação · Esc: pausa · Ctrl+K: modo teclado',
    start: 'Aguarde a introdução e pressione uma tecla, por exemplo Enter. Após entrar na partida, clique em Ativar teclado (Ctrl+K). Esse botão envia o comando nativo e devolve o foco ao jogo. Aguarde a animação inicial antes de mover. Se não responder, volte a selecionar o modo teclado.',
    rows: [
      {keys: '← / →', action: 'Andar/correr para esquerda e direita', note: 'Movimento breve observado nesta correção; homologação final é do proprietário.'},
      {keys: '↑ / ↓', action: 'Saltar/subir e abaixar/descer, conforme o contexto', note: 'Comandos documentados; não foi testada toda combinação da demo.'},
      {keys: 'Shift + direção', action: 'Passos cuidadosos; agarrar/ação conforme o contexto', note: 'Documentado; depende da situação do personagem.'},
      {keys: 'Ctrl+K', action: 'Selecionar modo teclado', note: 'A demo instalada confirmou a indicação KEYBOARD MODE.'}
    ],
    pause: 'Esc pausa; outra tecla retoma conforme a edição. Não confundir com sair para o desktop.',
    menu: 'Esta edição usa atalhos DOS, não o mesmo menu de DOOM. Na introdução, uma tecla inicia a partida.',
    exit: 'Ctrl+Q sai da demo para o prompt DOS. Sair para o desktop fecha a emulação.',
    audio: 'Ative o áudio no botão da janela. As opções disponíveis dependem da demo; não alteramos seus arquivos de som.',
    saves: 'A demo limitada não tem salvamento homologado. Não se promete Ctrl+G/Ctrl+L da edição completa para esta demo.',
    sources: [{title: 'Guia do projeto DOSBox Staging para esta demo', url: 'https://www.dosbox-staging.org/preview/dev/0.83/getting-started/setting-up-prince-of-persia/'}]
  },
  'doom-shareware': {
    id: 'doom-shareware',
    title: 'DOOM Shareware',
    version: 'DOS v1.9 — episódio 1',
    summary: 'Setas: mover/virar · Ctrl: disparar · Espaço: usar · Esc: menu · Pause: pausa',
    start: 'Aguarde o título e pressione Esc ou Enter para acessar o menu. Escolha New Game e as opções da edição shareware.',
    rows: [
      {keys: '↑ / ↓; ← / →', action: 'Avançar/recuar; virar', note: 'Padrão da edição; pode ser remapeado no SETUP.'},
      {keys: 'Ctrl; Espaço', action: 'Disparar; abrir portas/usar', note: 'Padrão da edição, não homologação individual de cada tecla.'},
      {keys: 'Shift; Alt + direção', action: 'Correr; deslocamento lateral', note: 'Depende do mapeamento do jogador.'},
      {keys: 'Tab; 1–7', action: 'Mapa; armas disponíveis', note: 'Tab vai ao jogo quando a tela tem foco; o shareware limita o conteúdo.'},
      {keys: 'F2 / F3', action: 'Salvar / carregar pelo menu nativo', note: 'Saves desta instalação ainda dependem de teste humano.'}
    ],
    pause: 'Pause pausa/retoma. Esc abre o menu e não equivale ao botão de pausa genérica da janela.',
    menu: 'Esc abre/fecha o menu; setas selecionam e Enter confirma.',
    exit: 'Menu Quit Game ou F10, conforme a edição; depois Sair para o desktop para encerrar a janela.',
    audio: 'O botão Ativar áudio libera o áudio do navegador. Configuração de placa/volume pertence ao SETUP e ao menu do DOOM; não foi alterada nesta correção.',
    saves: 'Slots nativos DOOMSAV*.DSG; F2/F3. Persistência depende da edição e deve ser verificada pelo proprietário.',
    sources: [{title: 'Arquivos originais e documentação do shareware', url: 'https://www.gamers.org/games/doom/'}]
  },
  'duke-shareware': {
    id: 'duke-shareware',
    title: 'Duke Nukem 3D Shareware',
    version: 'DOS v1.3d — episódio 1',
    summary: 'Setas: mover/virar · Ctrl: disparar · Espaço: usar · A: salto · Z: abaixar · Esc: menu',
    start: 'Aguarde a compilação dos CONs e a introdução. Esc abre o menu; escolha New Game. A demonstração automática não significa que o teclado está controlando uma partida.',
    rows: [
      {keys: '↑ / ↓; ← / →', action: 'Avançar/recuar; virar', note: 'Confirmado no CFG inicial fornecido; configurações pessoais podem diferir.'},
      {keys: 'Ctrl; Espaço', action: 'Disparar; abrir/usar', note: 'CFG inicial: Fire/Open. Pode ser remapeado.'},
      {keys: 'A; Z', action: 'Saltar; abaixar', note: 'CFG inicial: Jump/Crouch. Espaço não é salto neste CFG.'},
      {keys: 'Shift; Alt', action: 'Correr; deslocamento lateral', note: 'CFG inicial: Run/Strafe.'},
      {keys: 'F2 / F3', action: 'Salvar / carregar pelo menu nativo', note: 'Verificar na edição/configuração em uso.'}
    ],
    pause: 'Use Pause para pausa; Esc para o menu. O painel de ajuda não pausa automaticamente o jogo.',
    menu: 'Esc abre/fecha o menu; setas e Enter navegam. Mouse e mira dependem do Controller Setup.',
    exit: 'Quit Game/Yes sai para C: no DOSBox; Sair para o desktop encerra a janela.',
    audio: 'O CFG inicial tinha áudio desativado. Para configurar, saia por Quit Game sem fechar a emulação; no prompt DOS C: digite SETUP. Use Sound Setup e os testes nativos, salve e execute Save and launch Duke Nukem 3D. O runtime anuncia A220, IRQ7, DMA1/HDMA5; isso não é garantia de toda placa/opção. Ative também o áudio do navegador. Nenhuma configuração sonora foi forçada nesta correção.',
    saves: 'Slots GAME*.SAV, conforme a edição. O CFG alterado pelo SETUP e saves ficam no armazenamento do jogo; testar recuperação manualmente.',
    sources: [{title: 'FAQ mantida pelo projeto EDuke32 sobre as edições', url: 'https://wiki.eduke32.com/wiki/Frequently_Asked_Questions'}]
  },
  'dos-quake-1996': {
    id: 'dos-quake-1996',
    title: 'Quake',
    version: 'DOS v1.06 Shareware',
    summary: 'Mouse look / WASD ou Setas: mover · Clique/Ctrl: disparar · Espaço: pular · 1–8: armas · Esc: menu',
    start: 'Aguarde a inicialização do executável DOS (QUAKE.EXE). Pressione Esc para abrir o menu principal ou entrar na partida. Clique na tela para capturar a entrada/mouse look. Shift+Esc libera o mouse.',
    rows: [
      {keys: 'Mouse / Setas', action: 'Mirar / Virar e Mover', note: 'Mouse look nativo ou navegação por teclado.'},
      {keys: 'W, A, S, D / Setas', action: 'Avançar, recuar e strafe lateral', note: 'Pode ser remapeado nas opções de Options > Customize Controls.'},
      {keys: 'Botão Esquerdo / Ctrl', action: 'Disparar arma ativa', note: 'Disparo primário.'},
      {keys: 'Espaço', action: 'Pular', note: 'Salto e impulsão vertical.'},
      {keys: '1 – 8', action: 'Selecionar armas', note: 'Machado, espingarda, shotgun de dois canos, lança-pregos, etc.'},
      {keys: 'Esc', action: 'Menu principal / Pausar', note: 'Acessa Save, Load e Opções de controles.'},
      {keys: 'Shift + Esc', action: 'Liberar cursor do mouse', note: 'Atalho do emulador web para devolver o cursor ao desktop.'}
    ],
    pause: 'Pressione Pause ou Esc para pausar o jogo e acessar os menus.',
    menu: 'Esc abre e fecha o menu do Quake. Use as setas ou mouse para selecionar e Enter para confirmar.',
    exit: 'Menu Quit Game ou Sair para o desktop para fechar a janela.',
    audio: 'Áudio Sound Blaster 16 emulado. Ative o áudio na barra superior da janela se o navegador bloquear.',
    saves: 'Slots nativos S0.SAV a S9.SAV na pasta ID1, persistidos no armazenamento local.',
    sources: [{title: 'Manual oficial Quake id Software', url: 'https://www.quakewiki.net/archives/manual/index.html'}]
  },
  'dos-heretic-1994': {
    id: 'dos-heretic-1994',
    title: 'Heretic: Shadow of the Serpent Riders',
    version: 'DOS v1.2 / Shareware v1.0',
    summary: 'Setas: mover · Ctrl: disparar magia · Espaço: usar/portas · Enter: usar item · [ ]: inventário · Esc: menu',
    start: 'Pressione Esc ou Enter na tela de introdução para abrir o menu principal. Selecione New Game e escolha a dificuldade.',
    rows: [
      {keys: '↑ / ↓; ← / →', action: 'Avançar/recuar; virar personagem', note: 'Setas direcionais padrão.'},
      {keys: 'Ctrl', action: 'Disparar cajado / magia ativa', note: 'Ataque mágico.'},
      {keys: 'Espaço', action: 'Usar / Abrir portas e acionar botões', note: 'Ação primária.'},
      {keys: '[ / ]', action: 'Navegar no inventário de itens', note: 'Seleciona frascos, anéis, asas de voo ou artefatos.'},
      {keys: 'Enter', action: 'Usar artefato selecionado do inventário', note: 'Consome o item ativo.'},
      {keys: 'PageUp / PageDown', action: 'Olhar para cima e para baixo', note: 'Mira vertical clássica do Heretic.'},
      {keys: 'Home', action: 'Recentralizar visão', note: 'Retorna a linha de visão ao horizonte.'},
      {keys: 'F2 / F3', action: 'Salvar / Carregar partida', note: 'Acesso rápido aos slots nativos.'}
    ],
    pause: 'Pause pausa e retoma o jogo. Esc abre o menu principal.',
    menu: 'Esc alterna o menu. Setas navegam e Enter seleciona a opção.',
    exit: 'Opção Quit Game no menu ou fechar a janela para retornar ao desktop.',
    audio: 'Música MIDI/OPL3 e efeitos Sound Blaster 16 nativos.',
    saves: 'Slots HTICSAV0.DSG a HTICSAV5.DSG salvos nativamente no armazenamento do navegador.',
    sources: [{title: 'Heretic Wiki e Referência Raven Software', url: 'https://heretic.fandom.com/wiki/Controls'}]
  },
  'dos-freedoom': {
    id: 'dos-freedoom',
    title: 'Freedoom Phase 1 — FastDoom',
    version: 'FastDoom 2024 / Freedoom v0.13',
    summary: 'Setas: mover · Ctrl: disparar · Espaço: usar portas · 1–7: armas · Esc: menu · Shift+Esc: desktop',
    start: 'Pressione Enter ou Esc no título para entrar no menu principal e iniciar uma nova partida.',
    rows: [
      {keys: '↑ / ↓; ← / →', action: 'Avançar/recuar e virar', note: 'Movimentação principal.'},
      {keys: 'Ctrl', action: 'Disparar arma ativa', note: 'Tiro primário.'},
      {keys: 'Espaço', action: 'Abrir portas e acionar interruptores', note: 'Ação do cenário.'},
      {keys: 'Shift + Setas', action: 'Correr', note: 'Acelera a movimentação.'},
      {keys: '1 – 7', action: 'Selecionar armas', note: 'Armas do fuzileiro Freedoom.'},
      {keys: 'F2 / F3', action: 'Salvar / Carregar', note: 'Slots rápidos nativos.'}
    ],
    pause: 'Pause tecla de pausa; Esc abre o menu.',
    menu: 'Esc abre e fecha o menu.',
    exit: 'Quit Game ou Sair para fechar a emulação.',
    audio: 'Áudio OPL3 Sound Blaster emulado.',
    saves: 'DOOMSAV?.DSG gravados no armazenamento local.',
    sources: [{title: 'Projeto Freedoom', url: 'https://freedoom.github.io/'}]
  },
  'dos-klab': {
    id: 'dos-klab',
    title: "Ken's Labyrinth 2.1",
    version: 'Versão 2.1 Integral (1993)',
    summary: 'Setas: mover/virar · Ctrl: atirar · Espaço: portas/interagir · Esc: menu · Shift+Esc: desktop',
    start: 'Pressione Enter na tela inicial para iniciar a jornada pelo labirinto de Ken.',
    rows: [
      {keys: '↑ / ↓; ← / →', action: 'Avançar/recuar e virar', note: 'Movimento pelo labirinto.'},
      {keys: 'Ctrl', action: 'Disparar projéteis / gomas', note: 'Ataque contra monstros.'},
      {keys: 'Espaço', action: 'Abrir portas e recolher itens', note: 'Interação com cenário.'},
      {keys: 'Alt + ← / →', action: 'Strafe lateral', note: 'Deslocamento lateral.'},
      {keys: 'Esc', action: 'Menu do jogo e opções de salvar', note: 'Salvar e carregar slots.'}
    ],
    pause: 'Esc abre o menu de opções e pausa a ação.',
    menu: 'Esc para abrir o menu do labirinto.',
    exit: 'Quit Game para sair ao DOS ou fechar a janela.',
    audio: 'Música e efeitos sonoros AdLib/Sound Blaster.',
    saves: 'Arquivos .SAV do Ken gravados no armazenamento persistente.',
    sources: [{title: 'Ken Silverman Official Site', url: 'https://advsys.net/ken/klab.htm'}]
  },
  'dos-skyroads': {
    id: 'dos-skyroads',
    title: 'SkyRoads',
    version: 'Versão 1993 Integral',
    summary: 'Setas: acelerar/frear/guinada · Espaço: pular · Enter: confirmar · Shift+Esc: desktop',
    start: 'Pressione Enter ou Espaço para selecionar o percurso no menu orbital e acelerar.',
    rows: [
      {keys: '↑', action: 'Acelerar nave', note: 'Aumenta velocidade no túnel.'},
      {keys: '↓', action: 'Frear / desacelerar', note: 'Reduz a velocidade.'},
      {keys: '← / →', action: 'Guinada / Mudar de faixa', note: 'Evita armadilhas e quedas no vácuo.'},
      {keys: 'Espaço', action: 'Salto propulsor', note: 'Salta plataformas e fendas espaciais.'},
      {keys: 'Esc', action: 'Pausar e retornar ao menu de percursos', note: 'Reinicia o percurso se necessário.'}
    ],
    pause: 'Esc pausa o voo da nave e abre a seleção de fases.',
    menu: 'Setas e Enter navegam pelas fases e naves.',
    exit: 'Esc no menu principal para sair ao DOS ou fechar a janela.',
    audio: 'Efeitos sonoros e trilha sintetizada OPL2/3.',
    saves: 'Progresso de fases concluídas gravado nas configurações locais.',
    sources: [{title: 'Bluemoon Interactive SkyRoads History', url: 'http://www.bluemoon.ee/history/skyroads/'}]
  }
};

// Aliases para identificadores alternativos
manuals['dos-prince-1990'] = manuals['prince'];
manuals['dos-doom-1993'] = manuals['doom-shareware'];
manuals['dos-duke3d-1996'] = manuals['duke-shareware'];

export function gameControlsManual(profileId?: string, title?: string): ControlsManual | null {
  if (!profileId) return null;
  const manual = manuals[profileId];
  if (manual) {
    return {...manual, title: title || manual.title};
  }

  // Tentar encontrar perfil formal no catálogo de 37 clássicos
  const p = getProfileById(profileId);
  if (p) {
    const hintRows: {keys: string; action: string; note: string}[] = [];
    if (p.controlsHint) {
      const parts = p.controlsHint.split('·').map(s => s.trim());
      for (const part of parts) {
        const [keys, ...rest] = part.split(':');
        if (keys && rest.length) {
          hintRows.push({
            keys: keys.trim(),
            action: rest.join(':').trim(),
            note: 'Extraído do perfil de emulação'
          });
        }
      }
    }

    return {
      id: p.id,
      title: title || p.title,
      version: 'Edição compatível DOSBox / Retro OS',
      summary: p.controlsHint || 'Clique na tela para focar · Shift+Esc: liberar mouse/teclado',
      start: 'Aguarde a inicialização. Pressione Enter ou Esc para acessar o menu da partida.',
      rows: hintRows,
      pause: 'Pressione Pause ou Esc no jogo para pausar a emulação.',
      menu: 'Esc alterna entre o jogo e o menu nativo.',
      exit: 'Sair para o desktop encerra a janela de emulação.',
      audio: 'Áudio emulado Sound Blaster 16 / OPL3. Use o botão Ativar Áudio na barra se necessário.',
      saves: p.savesHint || 'Saves persistidos localmente no navegador.',
      sources: [{title: 'Referência legal do perfil', url: p.legalSourceUrl}]
    };
  }

  return null;
}
