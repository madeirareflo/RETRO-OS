import {useState} from 'react';
import {Icon} from '../components/Icon';
import type {Theme} from '../core/contracts';
import type {Language} from '../core/i18n';
import {getTranslation} from '../core/i18n';

interface AppletDef {
  tab: string;
  icon: string;
  labelPt: string;
  labelEn: string;
  labelEs: string;
  descPt: string;
  descEn: string;
  descEs: string;
  category: 'appearance' | 'hardware' | 'system';
}

const applets: AppletDef[] = [
  {
    tab: 'Aparência',
    icon: 'paint',
    labelPt: 'Vídeo',
    labelEn: 'Display',
    labelEs: 'Pantalla',
    descPt: 'Altera o tema visual, resolução simulada e cores do desktop.',
    descEn: 'Changes visual theme, simulated resolution, and desktop colors.',
    descEs: 'Cambia el tema visual, resolución simulada y colores.',
    category: 'appearance'
  },
  {
    tab: 'Área de trabalho',
    icon: 'computer',
    labelPt: 'Área de Trabalho',
    labelEn: 'Desktop Background',
    labelEs: 'Fondo de Pantalla',
    descPt: 'Define os papéis de parede originais (Colinas, Verde-azulado, Noite).',
    descEn: 'Sets original wallpapers (Hills, Classic Teal, Lan Night).',
    descEs: 'Configura fondos originales (Colinas, Azulado, Noche).',
    category: 'appearance'
  },
  {
    tab: 'Proteção de tela',
    icon: 'settings',
    labelPt: 'Proteção de Tela',
    labelEn: 'Screensaver',
    labelEs: 'Protector de Pantalla',
    descPt: 'Configura os protetores de tela retrô (Canos 3D, Estrelas, Relógio).',
    descEn: 'Configures retro screensavers (3D Pipes, Stars, Digital Clock).',
    descEs: 'Configura protectores de pantalla retro (Tuberías 3D, Estrellas).',
    category: 'appearance'
  },
  {
    tab: 'Sons',
    icon: 'music',
    labelPt: 'Sons e Dispositivos',
    labelEn: 'Sounds & Audio Devices',
    labelEs: 'Sonidos y Audio',
    descPt: 'Ajusta volumes do sistema virtual, efeitos de boot e áudio dos jogos.',
    descEn: 'Adjusts system sounds, boot chimes, and application audio volumes.',
    descEs: 'Ajusta el volumen del sistema virtual y sonidos de juegos.',
    category: 'hardware'
  },
  {
    tab: 'Sistema',
    icon: 'computer',
    labelPt: 'Sistema',
    labelEn: 'System Properties',
    labelEs: 'Propiedades del Sistema',
    descPt: 'Exibe especificações do computador virtual, dispositivos e memória.',
    descEn: 'Displays virtual PC specs, simulated devices, and memory info.',
    descEs: 'Muestra especificaciones del PC virtual, dispositivos y memoria.',
    category: 'system'
  },
  {
    tab: 'Idioma',
    icon: 'globe',
    labelPt: 'Opções Regionais e Idioma',
    labelEn: 'Regional & Language Options',
    labelEs: 'Configuración Regional e Idioma',
    descPt: 'Alterna o idioma entre Português (Brasil), English e Español.',
    descEn: 'Switches display language between Portuguese, English, and Spanish.',
    descEs: 'Cambia el idioma entre Portugués, Inglés y Español.',
    category: 'system'
  }
];

export function ControlPanelCatalog({
  theme,
  open,
  language = 'pt-BR'
}: {
  theme: Theme;
  open: (tab: string) => void;
  language?: Language;
}) {
  const [selected, setSelected] = useState('');
  const [query, setQuery] = useState('');
  const [menu, setMenu] = useState('');
  const [details, setDetails] = useState(false);
  const [xpCategoryView, setXpCategoryView] = useState(theme === 'xp');

  const t = getTranslation(language);

  const getLabel = (a: AppletDef) =>
    language === 'en' ? a.labelEn : language === 'es' ? a.labelEs : a.labelPt;

  const getDesc = (a: AppletDef) =>
    language === 'en' ? a.descEn : language === 'es' ? a.descEs : a.descPt;

  const visible = applets.filter(a =>
    getLabel(a).toLowerCase().includes(query.toLowerCase()) ||
    getDesc(a).toLowerCase().includes(query.toLowerCase())
  );

  const isXpCategoryMode = theme === 'xp' && xpCategoryView;

  return (
    <div className={'period-control-panel panel-' + theme + (isXpCategoryMode ? ' xp-category-mode' : '')}>
      <nav
        className="menubar cp-menus"
        aria-label="Menu do Painel"
        onKeyDown={e => {
          if (e.key === 'Escape') {
            e.stopPropagation();
            setMenu('');
          }
        }}
      >
        <button
          aria-expanded={menu === 'Arquivo'}
          onClick={() => setMenu(menu === 'Arquivo' ? '' : 'Arquivo')}
        >
          {language === 'en' ? 'File' : language === 'es' ? 'Archivo' : 'Arquivo'}
        </button>
        <button disabled>{language === 'en' ? 'Edit' : language === 'es' ? 'Edición' : 'Editar'}</button>
        <button
          aria-expanded={menu === 'Exibir'}
          onClick={() => setMenu(menu === 'Exibir' ? '' : 'Exibir')}
        >
          {language === 'en' ? 'View' : language === 'es' ? 'Ver' : 'Exibir'}
        </button>
        <button disabled>{language === 'en' ? 'Favorites' : language === 'es' ? 'Favoritos' : 'Favoritos'}</button>
        <button onClick={() => setMenu(menu === 'Ajuda' ? '' : 'Ajuda')}>
          {language === 'en' ? 'Help' : language === 'es' ? 'Ayuda' : 'Ajuda'}
        </button>

        {menu && (
          <div className="cp-menu-popup" role="menu">
            {menu === 'Arquivo' ? (
              <>
                <button disabled={!selected} onClick={() => open(selected)}>
                  {language === 'en' ? 'Open Selected Item' : language === 'es' ? 'Abrir elemento seleccionado' : 'Abrir item'}
                </button>
                <button
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent('retro:terminate', {detail: 'settings'})
                    )
                  }
                >
                  {language === 'en' ? 'Close' : language === 'es' ? 'Cerrar' : 'Fechar'}
                </button>
              </>
            ) : menu === 'Exibir' ? (
              <>
                {theme === 'xp' && (
                  <button onClick={() => { setXpCategoryView(!xpCategoryView); setMenu(''); }}>
                    {xpCategoryView
                      ? (language === 'en' ? 'Switch to Classic View' : language === 'es' ? 'Cambiar a vista clásica' : 'Alternar para Exibição Clássica')
                      : (language === 'en' ? 'Switch to Category View' : language === 'es' ? 'Cambiar a vista por categorías' : 'Alternar para Exibição por Categorias')}
                  </button>
                )}
                <button onClick={() => { setDetails(false); setMenu(''); }}>
                  {language === 'en' ? 'Large Icons' : language === 'es' ? 'Iconos grandes' : 'Ícones grandes'}
                </button>
                <button onClick={() => { setDetails(true); setMenu(''); }}>
                  {language === 'en' ? 'Details' : language === 'es' ? 'Detalles' : 'Detalhes'}
                </button>
              </>
            ) : (
              <p>
                {language === 'en'
                  ? 'Genuine RETRO OS settings applets. Double click or press Enter to launch.'
                  : language === 'es'
                  ? 'Configuraciones reales de RETRO OS. Doble clic o Enter para abrir.'
                  : 'Configurações reais do RETRO OS. Selecione e pressione Enter ou dê duplo clique.'}
              </p>
            )}
          </div>
        )}
      </nav>

      <div className="toolbar cp-toolbar">
        <button onClick={() => open('Aparência')}>
          ← {language === 'en' ? 'Back to Display' : language === 'es' ? 'Volver a Pantalla' : 'Voltar às propriedades'}
        </button>
        {theme === 'xp' && (
          <button
            className="xp-view-toggle-btn"
            onClick={() => setXpCategoryView(!xpCategoryView)}
          >
            {xpCategoryView
              ? (language === 'en' ? 'Classic View' : language === 'es' ? 'Vista clásica' : 'Exibição clássica')
              : (language === 'en' ? 'Category View' : language === 'es' ? 'Vista por categorías' : 'Exibição por categorias')}
          </button>
        )}
        <label>
          {language === 'en' ? 'Search' : language === 'es' ? 'Buscar' : 'Pesquisar'}{' '}
          <input
            aria-label="Pesquisar no Painel"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </label>
      </div>

      <div className="cp-address">
        <label>
          {language === 'en' ? 'Address' : language === 'es' ? 'Dirección' : 'Endereço'}{' '}
          <input
            aria-label="Endereço do Painel"
            readOnly
            value={t.controlPanel}
          />
        </label>
      </div>

      <div className="cp-content">
        <aside className="cp-sidebar">
          <Icon name="settings" size={theme === 'xp' ? 48 : 40} />
          <h2>{t.controlPanel}</h2>
          <hr />
          {theme === 'xp' ? (
            <div className="xp-cp-sidebar-links">
              <button
                className="xp-sidebar-action-btn"
                onClick={() => setXpCategoryView(!xpCategoryView)}
              >
                {xpCategoryView
                  ? (language === 'en' ? 'Switch to Classic View' : language === 'es' ? 'Cambiar a vista clásica' : 'Alternar para Modo Clássico')
                  : (language === 'en' ? 'Switch to Category View' : language === 'es' ? 'Cambiar a vista por categorías' : 'Alternar para Modo Categorias')}
              </button>
              <button onClick={() => open('Aparência')}>{language === 'en' ? 'Appearance' : language === 'es' ? 'Apariencia' : 'Aparência'}</button>
              <button onClick={() => open('Sistema')}>{language === 'en' ? 'System' : language === 'es' ? 'Sistema' : 'Sistema'}</button>
            </div>
          ) : theme === 'win2000' ? (
            <div className="nt-cp-sidebar-info">
              <p><b>{language === 'en' ? 'Windows 2000 Professional' : 'Windows 2000 Professional'}</b></p>
              <p>{language === 'en' ? 'Use Control Panel to personalize your computer system and network.' : 'Use o Painel de Controle para configurar seu computador e serviços locais.'}</p>
              <button onClick={() => open('Sistema')}>{language === 'en' ? 'System Properties' : 'Propriedades do Sistema'}</button>
            </div>
          ) : (
            <div className="win98-cp-sidebar-info">
              <p>{language === 'en' ? 'Select an item to configure computer settings.' : 'Selecione um item para personalizar o computador.'}</p>
              <p>{language === 'en' ? 'Double-click to open.' : 'Duplo clique para abrir. Enter abre o item selecionado.'}</p>
              <button onClick={() => open('Aparência')}>{language === 'en' ? 'Display Properties' : 'Propriedades de Vídeo'}</button>
            </div>
          )}
        </aside>

        {isXpCategoryMode ? (
          <div className="xp-categories-grid">
            <header className="xp-cat-header">
              <h1>{language === 'en' ? 'Pick a category' : language === 'es' ? 'Elija una categoría' : 'Escolha uma categoria'}</h1>
            </header>
            <div className="xp-category-card" onClick={() => open('Aparência')}>
              <Icon name="paint" size={40} />
              <div>
                <b>{language === 'en' ? 'Appearance and Themes' : language === 'es' ? 'Apariencia y temas' : 'Aparência e Temas'}</b>
                <p>{language === 'en' ? 'Change the computer theme, wallpaper, or screensaver.' : 'Altere o tema do computador, papel de parede ou protetor de tela.'}</p>
              </div>
            </div>
            <div className="xp-category-card" onClick={() => open('Sons')}>
              <Icon name="music" size={40} />
              <div>
                <b>{language === 'en' ? 'Sounds, Speech, and Audio Devices' : language === 'es' ? 'Dispositivos de sonido y audio' : 'Sons, Fala e Dispositivos de Áudio'}</b>
                <p>{language === 'en' ? 'Adjust sound volume and configure simulated audio devices.' : 'Ajuste o volume do sistema virtual e reprodução de efeitos.'}</p>
              </div>
            </div>
            <div className="xp-category-card" onClick={() => open('Sistema')}>
              <Icon name="computer" size={40} />
              <div>
                <b>{language === 'en' ? 'Performance and Maintenance' : language === 'es' ? 'Rendimiento y mantenimiento' : 'Desempenho e Manutenção'}</b>
                <p>{language === 'en' ? 'Check system memory, simulated hardware, and specs.' : 'Consulte especificações de memória, disco e periféricos simulados.'}</p>
              </div>
            </div>
            <div className="xp-category-card" onClick={() => open('Idioma')}>
              <Icon name="globe" size={40} />
              <div>
                <b>{language === 'en' ? 'Date, Time, Language, and Regional Options' : language === 'es' ? 'Opciones regionales y de idioma' : 'Opções Regionais e de Idioma'}</b>
                <p>{language === 'en' ? 'Change display language between pt-BR, English, and Spanish.' : 'Troque o idioma de exibição e preferências regionais.'}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className={'cp-items ' + (details ? 'cp-details' : '')}>
            {visible.map(a => {
              const label = getLabel(a);
              const desc = getDesc(a);
              return (
                <button
                  key={a.tab}
                  className={selected === a.tab ? 'cp-selected' : ''}
                  aria-label={label}
                  aria-pressed={selected === a.tab}
                  onClick={() => setSelected(a.tab)}
                  onDoubleClick={() => open(a.tab)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      open(a.tab);
                    }
                  }}
                >
                  <Icon name={a.icon} size={32} />
                  <span className="cp-item-label">{label}</span>
                  {details && <small className="cp-item-desc">{desc}</small>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <footer className="statusbar">
        {isXpCategoryMode
          ? (language === 'en' ? 'Category View · Click to open' : 'Modo de Categorias XP · Clique para abrir')
          : `${visible.length} ${language === 'en' ? 'item(s)' : 'objeto(s)'} · ${selected || (language === 'en' ? 'Ready' : 'Pronto')}`}
      </footer>
    </div>
  );
}
