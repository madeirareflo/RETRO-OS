import { useState, useMemo } from 'react';
import { LIVING_WEB_REGISTRY, searchWebRegistry } from '../museum/webRegistry';

interface HistoricalArchiveProps {
  currentEra: number;
  onNavigate: (url: string) => void;
}

export function HistoricalArchive({ currentEra, onNavigate }: HistoricalArchiveProps) {
  const [selectedYear, setSelectedYear] = useState<number>(2000);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [archiveSearch, setArchiveSearch] = useState<string>('');

  const availableYears = [1998, 2000, 2002, 2004, 2006, 2008];

  const archivedPages = useMemo(() => {
    let pages = Object.values(LIVING_WEB_REGISTRY);

    if (archiveSearch.trim()) {
      pages = searchWebRegistry(archiveSearch.trim());
    }

    if (selectedCategory !== 'all') {
      pages = pages.filter(p => p.category === selectedCategory);
    }

    return pages;
  }, [archiveSearch, selectedCategory]);

  return (
    <article className="archive-museum" style={{ fontFamily: 'Tahoma, Arial, sans-serif', padding: '10px' }}>
      <header style={{ background: '#1c3d5a', color: '#fff', padding: '14px', borderRadius: '4px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', letterSpacing: '1px' }}>🏛️ ARQUIVO HISTÓRICO DA WEB RETRÔ</h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#cbd5e0' }}>
              Preservação arqueológica da internet brasileira de 1998 a 2008 · Snapshots catalogados e verificados
            </p>
          </div>
          <div style={{ textAlign: 'right', fontSize: '12px', background: '#2b6cb0', padding: '6px 12px', borderRadius: '3px' }}>
            <span>Época ativa no navegador: <b>{currentEra}</b></span>
          </div>
        </div>
      </header>

      {/* LINHA DO TEMPO DA MÁQUINA DO TEMPO / SNAPSHOTS */}
      <section style={{ background: '#edf2f7', border: '1px solid #cbd5e0', padding: '12px', borderRadius: '4px', marginBottom: '16px' }}>
        <b style={{ color: '#2d3748', display: 'block', marginBottom: '8px' }}>📅 Selecione o Ano do Snapshot para Explorar:</b>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {availableYears.map(year => (
            <button
              key={year}
              className={selectedYear === year ? 'pressed' : ''}
              onClick={() => setSelectedYear(year)}
              style={{
                padding: '6px 14px',
                fontWeight: selectedYear === year ? 'bold' : 'normal',
                background: selectedYear === year ? '#2b6cb0' : '#fff',
                color: selectedYear === year ? '#fff' : '#2d3748',
                border: '1px solid #a0aec0',
                cursor: 'pointer',
                borderRadius: '3px'
              }}
            >
              Snapshot {year}
            </button>
          ))}
        </div>
        <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#4a5568' }}>
          {selectedYear === 1998 && '1998: O despontar das primeiras homepages, conexões discadas pioneiras e portais comunitários.'}
          {selectedYear === 2000 && '2000: A virada do milênio, surgimento de portais de conteúdo, modems 56K e início dos fanzines digitais.'}
          {selectedYear === 2002 && '2002: A era de ouro do Fotolog, câmeras digitais de 320x240 e fóruns técnicos fervilhando.'}
          {selectedYear === 2004 && '2004: O auge das LAN Houses, torneios de jogos em rede local, Corujões e redes sociais de recreio.'}
          {selectedYear === 2006 && '2006: Playlists de MP3 personalizadas, gravadores de CD-R a todo vapor e blogs consolidados.'}
          {selectedYear === 2008 && '2008: Transição para a banda larga residencial, despedida nostálgica das LAN houses e web moderna.'}
        </p>
      </section>

      {/* FILTROS E BUSCA NO ARQUIVO */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap' }}>
        <input
          aria-label="Buscar nas páginas arquivadas"
          placeholder="Filtrar páginas arquivadas por nome ou tema..."
          value={archiveSearch}
          onChange={e => setArchiveSearch(e.target.value)}
          style={{ flex: 1, minWidth: '220px', padding: '6px 8px', border: '1px solid #a0aec0', borderRadius: '3px' }}
        />
        <select
          aria-label="Filtrar por categoria"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          style={{ padding: '6px 8px', border: '1px solid #a0aec0', borderRadius: '3px' }}
        >
          <option value="all">Todas as Categorias</option>
          <option value="portal">Portais de Notícias</option>
          <option value="forum">Fóruns & Discussões</option>
          <option value="blog">Blogs & Diários</option>
          <option value="fotolog">Fotolog & Imagens</option>
          <option value="games">Jogos & LAN Houses</option>
          <option value="social">Redes Sociais & Perfis</option>
          <option value="tools">Ferramentas & Utilitários</option>
          <option value="secret">Arquivos Confidenciais</option>
        </select>
      </div>

      {/* TABELA DE SNAPSHOTS E PÁGINAS DISPONÍVEIS */}
      <div style={{ border: '1px solid #cbd5e0', borderRadius: '4px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#e2e8f0', color: '#2d3748' }}>
              <th style={{ padding: '8px' }}>Página Histórica</th>
              <th style={{ padding: '8px', width: '130px' }}>Categoria</th>
              <th style={{ padding: '8px', width: '100px' }}>Criação</th>
              <th style={{ padding: '8px', width: '120px' }}>Status em {selectedYear}</th>
              <th style={{ padding: '8px', width: '110px' }}>Ação</th>
            </tr>
          </thead>
          <tbody>
            {archivedPages.map(page => {
              const wasCreated = page.year <= selectedYear;
              const hasSnapshot = page.snapshots?.find(s => s.year <= selectedYear);

              return (
                <tr key={page.id} style={{ borderBottom: '1px solid #e2e8f0', background: wasCreated ? '#fff' : '#f7fafc' }}>
                  <td style={{ padding: '8px' }}>
                    <div style={{ fontWeight: 'bold', color: wasCreated ? '#2b6cb0' : '#718096' }}>
                      {page.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#4a5568', marginTop: '2px' }}>
                      {page.description}
                    </div>
                    {hasSnapshot && (
                      <div style={{ fontSize: '11px', color: '#2c5282', marginTop: '4px', background: '#ebf8ff', padding: '4px', borderLeft: '3px solid #3182ce' }}>
                        <b>Snapshot arquivado:</b> {hasSnapshot.title} — <i>"{hasSnapshot.contentExcerpt}"</i>
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '8px', color: '#4a5568', textTransform: 'capitalize' }}>
                    {page.category}
                  </td>
                  <td style={{ padding: '8px', color: '#4a5568' }}>
                    Ano {page.year}
                  </td>
                  <td style={{ padding: '8px' }}>
                    {wasCreated ? (
                      <span style={{ color: '#22543d', background: '#c6f6d5', padding: '2px 6px', borderRadius: '3px', fontSize: '11px', fontWeight: 'bold' }}>
                        ✓ Ativo em {selectedYear}
                      </span>
                    ) : (
                      <span style={{ color: '#742a2a', background: '#fed7d7', padding: '2px 6px', borderRadius: '3px', fontSize: '11px' }}>
                        ⏳ Ainda em obras
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '8px' }}>
                    <button
                      onClick={() => onNavigate(page.url)}
                      style={{
                        padding: '4px 8px',
                        background: '#3182ce',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Acessar →
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <footer style={{ marginTop: '16px', borderTop: '1px solid #e2e8f0', paddingTop: '10px', fontSize: '12px', color: '#718096', display: 'flex', justifyContent: 'space-between' }}>
        <span>Museu Digital do RETRO OS · Acervo Histórico e Arqueologia Web</span>
        <span>
          <button onClick={() => onNavigate('retro://portal')} style={{ cursor: 'pointer', textDecoration: 'underline', border: 'none', background: 'transparent', color: '#2b6cb0' }}>
            Ir ao Portal Conexão 2000
          </button> · 
          <button onClick={() => onNavigate('retro://busca')} style={{ cursor: 'pointer', textDecoration: 'underline', border: 'none', background: 'transparent', color: '#2b6cb0', marginLeft: '6px' }}>
            Buscador Retrô
          </button>
        </span>
      </footer>
    </article>
  );
}
