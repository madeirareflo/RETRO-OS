import {useState} from 'react';
import {Icon} from '../components/Icon';
import type {Theme} from '../core/contracts';
import type {VFile} from '../storage/local';

export function ExplorerSidebar({
  theme,
  path,
  current,
  all,
  tree,
  navigate
}: {
  theme: Theme;
  path: string;
  current?: VFile | null;
  all: VFile[];
  tree: boolean;
  navigate: (path: string) => void;
}) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const heading = (name: string, id: string) => (
    <h3>
      <button
        className="xp-task-toggle"
        aria-expanded={!collapsed[id]}
        onClick={() => setCollapsed(old => ({...old, [id]: !old[id]}))}
      >
        <span>{name}</span>
        <span className="xp-chevron" aria-hidden="true">
          {collapsed[id] ? '⌄' : '⌃'}
        </span>
      </button>
    </h3>
  );

  const launch = (id: string) =>
    window.dispatchEvent(new CustomEvent('retro:open-app', {detail: id}));

  const title = path ? path.split('/').pop() || path : 'Meu Computador';

  if (tree) {
    return (
      <aside className="explorer-sidebar explorer-tree">
        <h3>Pastas</h3>
        <div className="folder-tree">
          <button className={!path ? 'tree-selected' : ''} onClick={() => navigate('')}>
            <Icon name="computer" size={16} />Meu Computador
          </button>
          {['A:', 'C:', 'D:', ...all.filter(f => f.kind === 'folder').map(f => f.path)].map(p => (
            <button
              className={path === p ? 'tree-selected' : ''}
              key={p}
              style={{paddingLeft: 5 + p.split('/').length * 13}}
              onClick={() => navigate(p)}
            >
              <span className="tree-join">└</span>
              <Icon name={p === 'A:' ? 'floppy' : p === 'C:' ? 'drive' : p === 'D:' ? 'disc' : 'folder'} size={16} />
              {p.includes('/') ? p.split('/').pop() : p}
            </button>
          ))}
        </div>
        <small>Disco virtual local</small>
      </aside>
    );
  }

  if (theme === 'xp') {
    return (
      <aside className="explorer-sidebar xp-task-pane">
        <section className="xp-task-section">
          {heading(path ? 'Tarefas de arquivos e pastas' : 'Tarefas do sistema', 'tasks')}
          <div className="xp-section-content" hidden={collapsed.tasks}>
            {path ? (
              <>
                <button onClick={() => launch('notepad')}>
                  <Icon name="note" size={16} />
                  <span>Criar documento de texto</span>
                </button>
                <button onClick={() => launch('paint')}>
                  <Icon name="paint" size={16} />
                  <span>Criar um desenho</span>
                </button>
              </>
            ) : (
              <>
                <button onClick={() => launch('settings')}>
                  <Icon name="settings" size={16} />
                  <span>Abrir o Painel de Controle</span>
                </button>
                <button onClick={() => launch('settings')}>
                  <Icon name="paint" size={16} />
                  <span>Alterar uma configuração</span>
                </button>
              </>
            )}
          </div>
        </section>

        <section className="xp-task-section">
          {heading('Outros locais', 'places')}
          <div className="xp-section-content" hidden={collapsed.places}>
            <button onClick={() => navigate('C:/Meus Documentos')}>
              <Icon name="folder" size={16} />
              <span>Meus Documentos</span>
            </button>
            <button onClick={() => navigate('')}>
              <Icon name="computer" size={16} />
              <span>Meu Computador</span>
            </button>
            <button onClick={() => launch('dialup')}>
              <Icon name="globe" size={16} />
              <span>Conexões de rede</span>
            </button>
          </div>
        </section>

        <section className="xp-task-section">
          {heading('Detalhes', 'details')}
          <div className="xp-section-content xp-details-body" hidden={collapsed.details}>
            <b>{current?.path.split('/').pop() || title}</b>
            <p>
              {current
                ? current.kind === 'folder'
                  ? 'Pasta de arquivos'
                  : current.kind === 'image'
                  ? 'Imagem'
                  : 'Documento de texto'
                : 'Pasta do sistema virtual'}
            </p>
            {current && <small>Modificado: {current.modified.slice(0, 10)}</small>}
          </div>
        </section>
      </aside>
    );
  }

  // Windows 98 SE / Windows 2000 Professional WebView Sidebar
  const isWin2000 = theme === 'win2000';

  return (
    <aside
      className={
        'explorer-sidebar webview-sidebar ' +
        (isWin2000 ? 'nt-webview' : 'classic-webview')
      }
    >
      <div className="webview-heading">
        <Icon name={path ? 'folder' : 'computer'} size={isWin2000 ? 38 : 46} />
        <h2>{title}</h2>
      </div>
      <div className="webview-separator" />
      <div className="webview-info">
        <p className="webview-current-name">
          {current ? current.path.split('/').pop() : 'Selecione um item para ver sua descrição.'}
        </p>
        {current && (
          <p className="webview-kind-info">
            {current.kind === 'folder'
              ? 'Pasta de arquivos'
              : current.kind === 'image'
              ? 'Imagem do disco virtual'
              : 'Documento de texto'}
            <br />
            <small>Modificado: {current.modified.slice(0, 10)}</small>
          </p>
        )}
      </div>
      <div className="webview-links">
        <small>Veja também:</small>
        <button onClick={() => navigate('C:/Meus Documentos')}>Meus Documentos</button>
        <button onClick={() => launch('dialup')}>Conexões de rede e dial-up</button>
        <button onClick={() => launch('settings')}>Painel de Controle</button>
      </div>
    </aside>
  );
}
