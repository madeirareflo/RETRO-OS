import {ManualTestPanel} from './ManualTestPanel';
import {useEffect, useState, useMemo} from 'react';
import type {GameEntry, GameStatus} from './types';
import {loadBaseCatalog, generateSyntheticBenchmarkCatalog} from './catalogStore';
import {AddGameWizard} from './AddGameWizard';
import {BatchImportModal} from './BatchImportModal';
import {SaveManagerModal} from './SaveManagerModal';
import {StorageModal} from './StorageModal';
import {ExoConverterModal} from './ExoConverterModal';
import {removeGameCompletely} from './storageManager';
import {Icon} from '../components/Icon';
import {read, write} from '../storage/local';
import {registry, type AppId} from '../core/registry';
import {addDesktopGameLink} from './shortcuts';
import '../styles/retroGameLauncher.css';

interface RetroGameLauncherProps {
  open: (id: AppId) => void;
}

const PREDEFINED_COLLECTIONS = [
  'Todas',
  'Favoritos',
  'Instalados',
  'Jogáveis',
  'Importados',
  'MS-DOS',
  'Windows 95/98',
  'Windows XP',
  'Estratégia',
  'Aventura',
  'RPG',
  'Corrida',
  'Tiro',
  'Plataforma',
  'Clássicos de LAN House'
];

export function RetroGameLauncher({open}: RetroGameLauncherProps) {
  const [manualOpen,setManualOpen]=useState(false);
  const [catalog, setCatalog] = useState<GameEntry[]>(() => loadBaseCatalog());
  const [query, setQuery] = useState('');
  const [activeCollection, setActiveCollection] = useState<string>('Todas');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedId, setSelectedId] = useState<string>(() => catalog[0]?.id || 'dos-disquete');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isBatchOpen, setIsBatchOpen] = useState(false);
  const [isSaveManagerOpen, setIsSaveManagerOpen] = useState(false);
  const [isStorageOpen, setIsStorageOpen] = useState(false);
  const [isExoConverterOpen, setIsExoConverterOpen] = useState(false);
  const [benchmarkActive, setBenchmarkActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Pronto para navegar pela biblioteca.');

  useEffect(()=>{const update=()=>setCatalog(loadBaseCatalog());window.addEventListener('retro:library-change',update);return ()=>window.removeEventListener('retro:library-change',update)},[]);
  // Selected game
  const selectedGame = useMemo(() => {
    return catalog.find(g => g.id === selectedId) || catalog[0];
  }, [catalog, selectedId]);

  // Filtering
  const filteredGames = useMemo(() => {
    return catalog.filter(game => {
      // Query search in title, developer, genre, mechanics
      if (query) {
        const q = query.toLowerCase();
        const matchesQuery =
          game.title.toLowerCase().includes(q) ||
          game.genre.toLowerCase().includes(q) ||
          game.developer.toLowerCase().includes(q) ||
          (game.mechanics && game.mechanics.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // Predefined Collections
      if (activeCollection === 'Favoritos') return game.isFavorite;
      if (activeCollection === 'Instalados') return game.isInstalled;
      if (activeCollection === 'Jogáveis') return game.isPlayable;
      if (activeCollection === 'Importados') return game.metadataOrigin === 'user-imported' || game.customCollections?.includes('Importados pelo Usuário');
      if (activeCollection === 'MS-DOS') return game.platform === 'dos';
      if (activeCollection === 'Windows 95/98') return game.platform === 'win95_98';
      if (activeCollection === 'Windows XP') return game.platform === 'winxp';
      if (activeCollection === 'Estratégia') return game.genre.toLowerCase().includes('estratégia');
      if (activeCollection === 'Aventura') return game.genre.toLowerCase().includes('aventura');
      if (activeCollection === 'RPG') return game.genre.toLowerCase().includes('rpg');
      if (activeCollection === 'Corrida') return game.genre.toLowerCase().includes('corrida');
      if (activeCollection === 'Tiro') return game.genre.toLowerCase().includes('tiro') || game.genre.toLowerCase().includes('fps');
      if (activeCollection === 'Plataforma') return game.genre.toLowerCase().includes('plataforma');
      if (activeCollection === 'Clássicos de LAN House') {
        return (
          game.customCollections?.includes('Clássicos de LAN House') ||
          ['Counter-Strike', 'Half-Life', 'Age of Empires II', 'Warcraft III', 'Need for Speed'].some(c =>
            game.title.includes(c)
          )
        );
      }

      return true;
    });
  }, [catalog, query, activeCollection]);

  function toggleFavorite(game: GameEntry) {
    const nextFavorites = game.isFavorite
      ? read<string[]>('gameFavorites', []).filter(id => id !== game.id)
      : [...read<string[]>('gameFavorites', []), game.id];
    write('gameFavorites', nextFavorites);window.dispatchEvent(new Event('retro:library-change'));

    setCatalog(prev =>
      prev.map(g => (g.id === game.id ? {...g, isFavorite: !g.isFavorite} : g))
    );
    setStatusMessage(game.isFavorite ? 'Removido dos favoritos.' : 'Adicionado aos favoritos.');
  }

  function toggleInstall(game: GameEntry) {
    if(game.metadataOrigin==='licensed-builtin'){setStatusMessage('Pacote oficial incluído nesta edição, disponível em modo somente leitura.');return}if(game.metadataOrigin==='user-imported'){setStatusMessage('Pacote instalado: use Remover Jogo para liberar os bytes, preservando saves.');return}

    const nextInstalled = game.isInstalled
      ? read<string[]>('gameInstalled', []).filter(id => id !== game.id)
      : [...read<string[]>('gameInstalled', []), game.id];
    write('gameInstalled', nextInstalled);window.dispatchEvent(new Event('retro:library-change'));

    setCatalog(prev =>
      prev.map(g => (g.id === game.id ? {...g, isInstalled: !g.isInstalled} : g))
    );
    setStatusMessage(game.isInstalled ? 'Removido dos instalados.' : 'Marcado como instalado no catálogo.');
  }

  async function handleRemoveGame(game: GameEntry) {
    if (!confirm(`Deseja realmente remover "${game.title}" da sua biblioteca virtual? Os arquivos associados no navegador serão liberados.`)) return;

    try{await removeGameCompletely(game.id, true)}catch(e){setStatusMessage(String(e));return}

    const custom = read<GameEntry[]>('launcherCustomGames', []);
    const updatedCustom = custom.filter(g => g.id !== game.id);
    write('launcherCustomGames', updatedCustom);window.dispatchEvent(new Event('retro:library-change'));

    setCatalog(prev => prev.filter(g => g.id !== game.id));
    if (selectedId === game.id) {
      setSelectedId(catalog[0]?.id || 'dos-disquete');
    }
    setStatusMessage(`Jogo "${game.title}" removido com sucesso.`);
  }

  function handlePlay(game: GameEntry) {
    if (!game.isPlayable || !game.appId || !registry.some(a=>a.id===game.appId)) {
      setStatusMessage('Jogo em modo de acervo/museu. Apenas títulos compatíveis possuem execução web.');
      return;
    }
    // Record history
    const history = read<{id: string; at: string}[]>('gameHistory', []);
    write('gameHistory', [{id: game.id, at: new Date().toISOString()}, ...history.slice(0, 49)]);

    // Update play count
    setCatalog(prev =>
      prev.map(g => (g.id === game.id ? {...g, playCount: g.playCount + 1, lastPlayed: new Date().toISOString()} : g))
    );

    // Se for jogo customizado/importado, salva contexto para o AppHost instanciar
    if (game.metadataOrigin === 'user-imported') {
      write('activeCustomGameId', game.id);window.dispatchEvent(new Event('retro:custom-game')); 
    }

    open(game.appId as AppId);
  }

  function handleCreateShortcut(game: GameEntry) {
    addDesktopGameLink(game);setStatusMessage(`Atalho de "${game.title}" criado em Meus Documentos.`);
  }

  function handleToggleBenchmark() {
    if (benchmarkActive) {
      setCatalog(loadBaseCatalog());
      setBenchmarkActive(false);
      setStatusMessage('Catálogo real restaurado (3.000 itens de benchmark removidos).');
    } else {
      const synthetic = generateSyntheticBenchmarkCatalog(3000);
      setCatalog(prev => [...prev, ...synthetic]);
      setBenchmarkActive(true);
      setStatusMessage('Benchmark ativado: 3.000 entradas sintéticas carregadas.');
    }
  }

  function getStatusBadge(status: GameStatus) {
    switch (status) {
      case 'playable':
        return <span className="badge badge-playable">✓ Jogável no Navegador</span>;
      case 'installed':
        return <span className="badge badge-installed">✓ Instalado</span>;
      case 'ready_to_configure':
        return <span className="badge badge-config">Pronto p/ Configurar</span>;
      case 'requires_files':
        return <span className="badge badge-missing">Requer Arquivos</span>;
      case 'incompatible':
        return <span className="badge badge-incompatible">Incompatível</span>;
      case 'museum':
        return <span className="badge badge-museum">Ficha de Museu</span>;
      default:
        return <span className="badge badge-eval">Em Avaliação</span>;
    }
  }

  return (
    <div className="retro-game-launcher" role="region" aria-label="Retro Game Launcher">
      {/* Top Application Bar */}
      <header className="rgl-top-bar">
        <div className="rgl-branding">
          <Icon name="games" size={24} />
          <h1 style={{fontSize: '14px', margin: 0, fontWeight: 'bold', display: 'inline'}}>Retro Game Launcher</h1>
          <span> — Biblioteca Pessoal DOS</span>
        </div>
        <div className="rgl-actions"><button onClick={()=>setManualOpen(v=>!v)}>Teste manual / perfis 003N</button>
          <button className="add-game-btn" onClick={() => setIsWizardOpen(true)}>
            + Adicionar Jogo
          </button>
          <button className="batch-import-btn" onClick={() => setIsBatchOpen(true)}>
            Importar pacote
          </button>
          <button onClick={() => setIsSaveManagerOpen(true)}>
            💾 Meus Salvamentos
          </button>
          <button onClick={() => setIsStorageOpen(true)}>
            📊 Espaço / Storage
          </button>
          <button onClick={() => setIsExoConverterOpen(true)}>
            ⚙ Conversor eXoDOS
          </button>
          <button
            className={benchmarkActive ? 'btn-benchmark bench-btn active' : 'btn-benchmark bench-btn'}
            onClick={handleToggleBenchmark}
            title="Carrega 3.000 registros sintéticos para teste de escala"
          >
            {benchmarkActive ? 'Desativar Benchmark' : 'Benchmark (3k)'}
          </button>
        </div>
      </header>

      {manualOpen?<ManualTestPanel catalog={catalog} play={handlePlay} close={()=>setManualOpen(false)}/>:<>
      {/* Main Workspace Layout */}
      <div className="rgl-workspace">
        {/* Left Sidebar: Collections & Categorization */}
        <aside className="rgl-sidebar">
          <h3>Coleções & Filtros</h3>
          <ul className="collection-list">
            {PREDEFINED_COLLECTIONS.map(col => (
              <li
                key={col}
                className={activeCollection === col ? 'active' : ''}
              >
                <button
                  type="button"
                  style={{
                    all: 'unset',
                    cursor: 'pointer',
                    width: '100%',
                    display: 'block',
                    padding: '4px 6px',
                    boxSizing: 'border-box'
                  }}
                  onClick={() => setActiveCollection(col)}
                >
                  {col}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Center: Search, View Mode & Games Library */}
        <main className="rgl-main-view">
          <div className="rgl-toolbar">
            <div className="search-box">
              <label htmlFor="rgl-search-input" className="sr-only" style={{display: 'none'}}>Buscar:</label>
              <input
                id="rgl-search-input"
                type="search"
                placeholder="Buscar por título, gênero, desenvolvedor..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                aria-label="Buscar:"
              />
            </div>
            <div className="view-toggle">
              <button
                className={viewMode === 'grid' ? 'active' : ''}
                onClick={() => setViewMode('grid')}
                title="Visualização em Grade"
              >
                Grade
              </button>
              <button
                className={viewMode === 'list' ? 'active' : ''}
                onClick={() => setViewMode('list')}
                title="Visualização em Lista"
              >
                Lista
              </button>
            </div>
          </div>

          <div className="view-header">
            <span>Exibindo <b>{filteredGames.length}</b> de <b>{catalog.length}</b> títulos cadastrados</span>
          </div>

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="rgl-grid">
              {filteredGames.slice(0, 100).map(game => (
                <div
                  key={game.id}
                  className={`grid-card ${selectedId === game.id ? 'selected' : ''}`}
                  tabIndex={0} role="button" aria-label={game.title} onKeyDown={e=>{if(e.key==='Enter'){setSelectedId(game.id);handlePlay(game)}if(e.key===' '){e.preventDefault();setSelectedId(game.id)}}} onClick={() => setSelectedId(game.id)}
                  onDoubleClick={() => handlePlay(game)}
                >
                  <div className="card-cover">
                    <div className="placeholder-box-art">
                      <span className="era-badge">{game.year}</span>
                      <Icon name={game.platform === 'dos' ? 'floppy' : 'games'} size={32} />
                      <span className="platform-tag">{game.platform.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="card-info">
                    <b title={game.title}>{game.title}</b>
                    <small>{game.genre}</small>
                    <div className="card-sub">
                      <span>{game.developer}</span>
                      {game.isFavorite && <span className="fav-star">★</span>}
                    </div>
                  </div>
                </div>
              ))}
              {filteredGames.length > 100 && (
                <div className="grid-more-indicator">
                  +{filteredGames.length - 100} títulos adicionais na biblioteca
                </div>
              )}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="rgl-list">
              <table>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Ano</th>
                    <th>Plataforma</th>
                    <th>Gênero</th>
                    <th>Desenvolvedora</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGames.slice(0, 100).map(game => (
                    <tr
                      key={game.id}
                      className={selectedId === game.id ? 'selected' : ''}
                      onClick={() => setSelectedId(game.id)}
                      onDoubleClick={() => handlePlay(game)}
                    >
                      <td>
                        <b>{game.title}</b> {game.isFavorite && '★'}
                      </td>
                      <td>{game.year}</td>
                      <td>{game.platformDisplay}</td>
                      <td>{game.genre}</td>
                      <td>{game.developer}</td>
                      <td>{getStatusBadge(game.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>

        {/* Right Sidebar: Details Inspector */}
        <aside className="rgl-details-panel">
          {selectedGame ? (
            <div className="details-scroll">
              <div className="details-header-art">
                <div className="box-preview-frame">
                  <Icon name={selectedGame.platform === 'dos' ? 'floppy' : 'games'} size={48} />
                  <b>{selectedGame.year}</b>
                </div>
              </div>

              <h2>{selectedGame.title}</h2>
              <div className="details-status-row">
                {getStatusBadge(selectedGame.status)}
                <span className="platform-pill">{selectedGame.platformDisplay}</span>
              </div>

              <div className="details-actions">
                {selectedGame.isPlayable ? (
                  <button className="play-button" onClick={() => handlePlay(selectedGame)}>
                    ▶ Iniciar Jogo
                  </button>
                ) : (
                  <button className="play-button disabled" disabled>
                    (Sem Execução Web)
                  </button>
                )}
                <button
                  className={selectedGame.isFavorite ? 'fav-button active' : 'fav-button'}
                  onClick={() => toggleFavorite(selectedGame)}
                >
                  {selectedGame.isFavorite ? '★ Favorito' : '☆ Favoritar'}
                </button>
                <button
                  className={selectedGame.isInstalled ? 'inst-button active' : 'inst-button'}
                  onClick={() => toggleInstall(selectedGame)}
                >
                  {selectedGame.isInstalled ? '✓ Instalado' : '+ Adicionar'}
                </button>
                {selectedGame.metadataOrigin === 'user-imported' && (
                  <button className="btn-danger" onClick={() => handleRemoveGame(selectedGame)}>
                    🗑 Remover Jogo
                  </button>
                )}
                <button onClick={() => handleCreateShortcut(selectedGame)}>
                  Criar Atalho no Desktop
                </button>
              </div>

              <div className="details-metadata-table">
                <dl>
                  <dt>Ano de Lançamento:</dt>
                  <dd>{selectedGame.year}</dd>
                  <dt>Gênero:</dt>
                  <dd>{selectedGame.genre}</dd>
                  <dt>Desenvolvedora:</dt>
                  <dd>{selectedGame.developer}</dd>
                  <dt>Editora:</dt>
                  <dd>{selectedGame.publisher}</dd>
                  <dt>Engine / Emulador:</dt>
                  <dd><code>{selectedGame.engineId}</code></dd>
                  {selectedGame.entryExecutable && (
                    <>
                      <dt>Executável:</dt>
                      <dd><code>{selectedGame.entryExecutable}</code></dd>
                    </>
                  )}
                  {selectedGame.virtualPath && (
                    <>
                      <dt>Caminho Virtual:</dt>
                      <dd><code>{selectedGame.virtualPath}</code></dd>
                    </>
                  )}
                  {selectedGame.emulationProfile && (
                    <>
                      <dt>Perfil de Emulação:</dt>
                      <dd>
                        Ciclos: {selectedGame.emulationProfile.cycles || '2000'} | Mem: {selectedGame.emulationProfile.memoryMb}MB
                      </dd>
                    </>
                  )}
                  {selectedGame.mechanics && (
                    <>
                      <dt>Mecânicas:</dt>
                      <dd>{selectedGame.mechanics}</dd>
                    </>
                  )}
                  {selectedGame.requirements && (
                    <>
                      <dt>Requisitos:</dt>
                      <dd>{selectedGame.requirements}</dd>
                    </>
                  )}
                </dl>
              </div>

              <div className="details-description">
                <h4>Descrição & Contexto</h4>
                <p>{selectedGame.description}</p>
              </div>

              {selectedGame.externalUrl && (
                <div className="details-link">
                  <a href={selectedGame.externalUrl} target="_blank" rel="noreferrer">
                    Distribuição Legal / Página Externa ↗
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="empty-selection">
              <p>Selecione um jogo para ver informações detalhadas.</p>
            </div>
          )}
        </aside>
      </div>

      </>}
      {/* Status Bar */}
      <footer className="rgl-statusbar" role="status">
        <span>{statusMessage}</span>
        <span>Total no Catálogo: {catalog.length}</span>
      </footer>

      {/* 10-step Add Game Wizard */}
      <AddGameWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onGameAdded={newGame => {
          setCatalog(prev => [newGame, ...prev.filter(g=>g.id!==newGame.id)]);
          setSelectedId(newGame.id);
          setStatusMessage(`Jogo "${newGame.title}" adicionado à biblioteca com sucesso!`);
        }}
      />

      {/* Batch Import Modal (003J) */}
      <BatchImportModal
        isOpen={isBatchOpen}
        onClose={() => setIsBatchOpen(false)}
        onImportComplete={newGames => {
          setCatalog(prev => [...newGames, ...prev.filter(g=>!newGames.some(n=>n.id===g.id))]);
          setSelectedId(newGames[0]?.id || selectedId);
          setStatusMessage(`Importação em lote concluída: ${newGames.length} novo(s) título(s) cadastrado(s)!`);
        }}
      />

      {/* Save Manager Modal (003J) */}
      <SaveManagerModal
        isOpen={isSaveManagerOpen}
        onClose={() => setIsSaveManagerOpen(false)}
      />

      {/* Storage & Quota Report Modal (003J) */}
      <StorageModal
        isOpen={isStorageOpen}
        onClose={() => setIsStorageOpen(false)}
        installedCount={catalog.filter(g => g.isInstalled).length}
      />

      {/* eXoDOS Profile Converter Modal (003J) */}
      <ExoConverterModal
        isOpen={isExoConverterOpen}
        onClose={() => setIsExoConverterOpen(false)}
        onProfileGenerated={res => {
          setStatusMessage(`Perfil eXoDOS "${res.profile.name}" gerado com sucesso!`);
        }}
      />
    </div>
  );
}
