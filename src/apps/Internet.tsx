import {museumSites,siteYears} from '../museum/sites';
import {searchWebRegistry} from '../museum/webRegistry';
import musicCulture from '../data/music-culture.json';
import {useState,useEffect,useRef,lazy,Suspense} from 'react';
import {read,write,download,saveFile} from '../storage/local';
import {useConnection} from '../services/connection';
import type {AppId} from '../core/registry';
import {eras} from './TimeMachine';
import {HistoricalArchive} from './HistoricalArchive';

const HistoricalPage=lazy(()=>import('./HistoricalPage').then(m=>({default:m.HistoricalPage})));

const sites=[
  ...museumSites,
  ['portal','Portal','Portal de 1999: notícias e tecnologia'],
  ['pessoal','Minha homepage','O cantinho pessoal do Davi'],
  ['construcao','Em construção','Obras eternas da internet'],
  ['visitas','Livro de visitas','Deixe um recado local'],
  ['links','Links','Diretório da internet'],
  ['downloads','Downloads','Downloads originais'],
  ['gifs','GIFs','Animações originais'],
  ['jogos','Portal de jogos','Diversão sem fichas'],
  ['busca','Buscador','Busca nos sites internos'],
  ['escola','Escola 2000','Trabalhos de informática'],
  ['musica','Música e MP3','Memórias musicais e playlists originais'],
  ['arquivo','Arquivo histórico','Wayback em aba externa']
];

export function Internet({era=2001,open}:{era?:number;open:(id:AppId)=>void}){
  const [history,setHistory]=useState<string[]>(()=>read('webHistory',[eras[era]?.site||'portal']));
  const [idx,setIdx]=useState(()=>read('webHistoryIndex',0));
  const [address,setAddress]=useState('retro://'+(eras[era]?.site||'portal'));
  const [visits]=useState(()=>read<number>('visits',0)+1);
  const [query,setQuery]=useState('');
  const [searchCategory, setSearchCategory] = useState<string>('all');
  const [filterEra, setFilterEra] = useState<boolean>(false);
  const [quiz,setQuiz]=useState('');
  const [progress,setProgress]=useState(-1);
  const [slow,setSlow]=useState(false);
  const [paused,setPaused]=useState(false);
  const [simulateError,setSimulateError]=useState(false);
  const [downloadError,setDownloadError]=useState(false);
  const [vfsSaved,setVfsSaved]=useState(false);
  const [downloadTarget, setDownloadTarget] = useState<'memoria' | 'guia' | 'atalhos'>('memoria');
  const [favorites,setFavorites]=useState<string[]>(()=>read('webFavorites',[]));
  const [loading,setLoading]=useState(false);

  const previousEra=useRef(era);
  const connection=useConnection();
  const page=history[idx]||'portal';

  useEffect(()=>{write('visits',visits)},[visits]);

  useEffect(()=>{
    if(previousEra.current===era)return;
    previousEra.current=era;
    const p=eras[era]?.site||'portal';
    setHistory([p]);
    setIdx(0);
    setAddress('retro://'+p);
  },[era]);

  useEffect(()=>{
    if(progress<0||progress>=100||paused)return;
    if(simulateError&&progress>=50){
      setPaused(true);
      setDownloadError(true);
      return;
    }
    const t=setTimeout(()=>setProgress(p=>Math.min(100,p+(slow?2:10))),slow?500:180);
    return ()=>clearTimeout(t);
  },[progress,paused,slow,simulateError]);

  useEffect(()=>{
    if(progress===100){
      let fileName = 'boas-memorias.txt';
      let filePath = 'C:/Meus Documentos/Boas Memorias.txt';
      let content = 'Vale uma tarde inteira sem preocupações.\nRETRO OS — download original.\nEASTER EGG: o download de 1 KB terminou e foi salvo em C:\\Meus Documentos\\Boas Memorias.txt';

      if (downloadTarget === 'guia') {
        fileName = 'guia-da-lanhouse.txt';
        filePath = 'C:/Meus Documentos/Guia da LAN House.txt';
        content = '⚡ CYBERSPACE LAN HOUSE — GUIA OFICIAL DE SOBREVIVÊNCIA ⚡\n1. O corujão começa às 23h. Não esqueça seu refrigerante.\n2. Para alternar janelas rapidamente, pressione Alt+Tab.\n3. Salve sempre seus documentos antes de terminar a ficha de 1 hora.';
      } else if (downloadTarget === 'atalhos') {
        fileName = 'manual-de-atalhos.txt';
        filePath = 'C:/Meus Documentos/Manual de Atalhos.txt';
        content = '🪟 RETRO OS — MANUAL DE ATALHOS ESSENCIAIS DE TECLADO 🪟\n• Alt+Tab: Alterna ciclicamente entre janelas ativas.\n• Ctrl+A: Seleciona todos os ícones da área de trabalho ou arquivos no Explorer.\n• Duplo clique na barra de título: Maximiza ou restaura a janela.\n• Clique no item da barra de tarefas: Minimiza se ativa ou restaura se em segundo plano.';
      }

      download(fileName, new Blob([content], { type: 'text/plain' }));
      try {
        saveFile(filePath, content);
        setVfsSaved(true);
      } catch {
        // ignora se ja existir
      }
    }
  },[progress, downloadTarget]);

  useEffect(()=>{
    setAddress('retro://'+(history[idx]||'portal'));
    write('webHistory',history.slice(-100));
    write('webHistoryIndex',Math.min(idx,99));
  },[history,idx]);

  function go(p:string){
    setLoading(true);
    const id=(p.startsWith('retro://')?p.slice(8):p).toLowerCase();
    setHistory(h=>[...h.slice(0,idx+1),sites.some(s=>s[0]===id.split('/')[0])?id:'404']);
    setIdx(idx+1);
    setAddress('retro://'+id);
    setTimeout(()=>setLoading(false),120);
  }

  function refresh(){
    setLoading(true);
    setTimeout(()=>setLoading(false),180);
  }

  function stop(){
    setLoading(false);
  }

  const links=<nav className="web-links">{sites.filter(([id])=>(siteYears[id]||1998)<=era).map(([id,name])=><a key={id} href={'#'+id} onClick={e=>{e.preventDefault();go(id)}}>{name}</a>)}</nav>;

  return (
    <div className="app-fill">
      <nav className="toolbar">
        <button disabled={!idx} onClick={()=>{setIdx(idx-1);setAddress('retro://'+history[idx-1])}}>← Voltar</button>
        <button disabled={idx===history.length-1} onClick={()=>{setIdx(idx+1);setAddress('retro://'+history[idx+1])}}>Avançar →</button>
        <button onClick={stop} title="Interromper">✕ Parar</button>
        <button onClick={refresh} title="Atualizar">↻ Atualizar</button>
        <button onClick={()=>go('portal')}>⌂ Início</button>
        <span className="browser-title-badge">
          {loading?'🌐 Conectando…':'Retro Explorer 6'}
        </span>
        <button onClick={()=>{
          if(!sites.some(s=>s[0]===page))return;
          const next=[...new Set([...favorites,page])].slice(-30);
          setFavorites(next);
          write('webFavorites',next);
        }}>Favoritar página</button>
        <select aria-label="Favoritos da Internet" value="" onChange={e=>go(e.target.value)}>
          <option value="">Favoritos</option>
          {favorites.map(id=><option key={id} value={id}>{sites.find(s=>s[0]===id)?.[1]||id}</option>)}
        </select>
        <span className={'browser-throbber '+(loading?'spinning':'')} aria-hidden="true">☼</span>
      </nav>
      <form className="address" onSubmit={e=>{e.preventDefault();go(address)}}>
        <label htmlFor="url">Endereço</label>
        <input id="url" value={address} onChange={e=>setAddress(e.target.value)}/>
        <button>Ir</button>
      </form>
      {connection!=='connected'&&<div className="offline-banner">Modo offline: páginas internas em cache. <button onClick={()=>open('dialup')}>Conectar agora</button></div>}
      <div className={'web-page historical-web era-web-'+era}>
        {links}
        {page==='portal'?(
          <div className="living-portal">
            <header className="portal-banner">
              <span>PORTAL CONEXÃO 2000 · EDIÇÃO {era}</span>
              <h1>conexão<span>2000</span></h1>
              <p>O grande portal da internet discada brasileira. O futuro cabe em um disquete.</p>
            </header>

            {/* BARRA DE BUSCA EM DESTAQUE NO PORTAL */}
            <div style={{background:'#ebf3fd',border:'1px solid #7eaadb',padding:'10px',margin:'10px 0',borderRadius:'4px',display:'flex',gap:'8px',alignItems:'center'}}>
              <span style={{fontWeight:'bold',color:'#1c4273',fontSize:'13px'}}>🔍 Buscar na Web:</span>
              <input 
                aria-label="Buscar na web a partir do portal" 
                placeholder="Ex: lan house, jogos, windows, blog, recreio..." 
                value={query} 
                onChange={e=>setQuery(e.target.value)}
                onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();go('busca')}}}
                style={{flex:1,padding:'4px 8px',border:'1px solid #7eaadb'}}
              />
              <button onClick={()=>go('busca')}>Buscar</button>
            </div>

            {/* BANNER 468x60 NOSTÁLGICO */}
            <div style={{maxWidth:468,height:60,background:'linear-gradient(90deg, #103364, #1e5cb3)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'space-around',padding:'4px 10px',margin:'10px auto',border:'2px outset #5892e8',fontFamily:'sans-serif'}}>
              <div>
                <b style={{color:'#ffeb3b',fontSize:'13px'}}>⚡ CORUJÃO NA LAN HOUSE!</b><br/>
                <span style={{fontSize:'11px'}}>Sábado às 23h · 16 Máquinas com 3D · Reserve sua vaga</span>
              </div>
              <button onClick={()=>go('lanhouse')} style={{background:'#ffeb3b',color:'#000',border:'1px solid #b89f00',fontWeight:'bold',fontSize:'11px',padding:'4px 8px',cursor:'pointer'}}>
                Ver Tabela ↗
              </button>
            </div>

            <div className="portal-columns">
              <aside>
                <b>☞ CANAIS EM DESTAQUE</b>
                <p><a href="#lanhouse" onClick={e=>{e.preventDefault();go('lanhouse')}}>🎮 CyberSpace LAN House</a></p>
                <p><a href="#forum" onClick={e=>{e.preventDefault();go('forum')}}>💬 Fórum Gabinete Bege</a></p>
                <p><a href="#blog" onClick={e=>{e.preventDefault();go('blog')}}>📝 Blogs da Turma</a></p>
                <p><a href="#fotolog" onClick={e=>{e.preventDefault();go('fotolog')}}>📸 Fotolog da Galera</a></p>
                <p><a href="#recreio" onClick={e=>{e.preventDefault();go('recreio')}}>🤝 Rede Recreio</a></p>
                <p><a href="#downloads" onClick={e=>{e.preventDefault();go('downloads')}}>💾 Downloads &amp; VFS</a></p>
                <p><a href="#escola" onClick={e=>{e.preventDefault();go('escola')}}>🎒 Escola &amp; Informática</a></p>
                <p><a href="#musica" onClick={e=>{e.preventDefault();go('musica')}}>🎧 MP3 &amp; Coletâneas</a></p>
                <hr/>
                <small>{connection==='connected'?'Conexão 56 Kbps discada':'Cópia offline em cache'}<br/>Época {era} · pulso único após 0h</small>
              </aside>
              <article>
                <small>EDIÇÃO ESPECIAL · ARQUIVO NARRATIVO FICTÍCIO</small>
                <h2>Um computador inteiro dentro da internet?</h2>
                <p>Fontes da redação dizem que, no futuro, as pessoas vão abrir janelas do sistema operacional dentro de navegadores. Parece pura ficção científica!</p>
                <hr/>
                <h3>{eras[era]?.title}</h3>
                <p>{eras[era]?.text}</p>
                <div style={{background:'#fcf8e3',border:'1px solid #faebcc',padding:'8px',margin:'10px 0'}}>
                  <b style={{color:'#8a6d3b'}}>📰 Manchete da Turma:</b>
                  <p style={{margin:'4px 0 0 0',fontSize:'13px'}}>
                    Léo da máquina 07 anunciou que vai trazer seu novo mouse óptico para a LAN House neste fim de semana. Nina já publicou a foto oficial no Fotolog!
                  </p>
                  <div style={{marginTop:'6px',fontSize:'12px'}}>
                    <a href="#fotolog" onClick={e=>{e.preventDefault();go('fotolog')}}>Ver no Fotolog →</a> · 
                    <a href="#blog/leo" onClick={e=>{e.preventDefault();go('blog/leo')}} style={{marginLeft:'6px'}}>Ler no Blog do Léo →</a>
                  </div>
                </div>
                <div style={{marginTop:'12px',display:'flex',gap:'8px',flexWrap:'wrap'}}>
                  <button onClick={()=>go('pessoal')}>Minha Homepage →</button>
                  <button onClick={()=>go('lanhouse')}>Conhecer a LAN House →</button>
                  <button onClick={()=>go('forum')}>Acessar Fórum →</button>
                </div>
              </article>
            </div>
          </div>
        ):page==='pessoal'?(
          <div className="personal-page">
            <h1>★ Bem-vindo ao meu cantinho ★</h1>
            <div className="animated-star">✦ ✧ ✦ ✧ ✦</div>
            <p>Feito com carinho e muitas horas depois da meia-noite.</p>
            <h2>~ Sobre mim ~</h2>
            <p>Gosto de computadores, jogos e de salvar tudo antes de desligar.</p>
            <p className="blink">SITE MELHOR VISUALIZADO COM SAUDADE</p>
            <div className="visitor-counter">VOCÊ É O VISITANTE {String(visits).padStart(6,'0')}</div>
            <p>
              <button onClick={()=>go('visitas')}>Assine meu livro de visitas!</button> · 
              <button onClick={()=>go('blog')}>Ler o Diário do Monitor →</button> · 
              <button onClick={()=>go('fotolog')}>Ver o Fotolog da Turma →</button>
            </p>
            <p>EASTER EGG: a homepage foi atualizada ontem… em 2001.</p>
          </div>
        ):page==='construcao'?(
          <div className="construction">
            <h1>⚒ EM CONSTRUÇÃO ⚒</h1>
            <p>Desde 1999. Agora vai!</p>
            <div className="construction-stripe"/>
            <p>EASTER EGG: o pedreiro da web saiu para comprar um cabo de rede.</p>
          </div>
        ):page==='visitas'?(
          <article>
            <h1>Livro de visitas do acervo</h1>
            <p>Somente leitura · recados escritos para os personagens fictícios.</p>
            <blockquote>Nina: cheguei pelo disquete da escola! ★</blockquote>
            <blockquote>Léo: o link da página de jogos está funcionando.</blockquote>
            <blockquote>Bia: obrigada por visitar nosso cantinho imaginário.</blockquote>
          </article>
        ):page==='links'?(
          <article>
            <h1>Diretório da internet de mentirinha</h1>
            {sites.filter(s=>s[0]!=='links').map(([id,name,description])=>(
              <p key={id}>
                <a href={'#'+id} onClick={e=>{e.preventDefault();go(id)}}>☞ {name}</a> — {description}
              </p>
            ))}
            <span className="visitor-mini">VISITAS {String(visits).padStart(6,'0')}</span>
          </article>
        ):page==='downloads'?(
          <article>
            <h1>Downloads que cabem no seu disquete</h1>
            <p>Selecione um pacote utilitário original para transferir pela conexão simulada e salvar no VFS:</p>
            
            <div style={{display:'flex',gap:'8px',marginBottom:'12px'}}>
              <button 
                className={downloadTarget==='memoria'?'pressed':''} 
                onClick={()=>setDownloadTarget('memoria')}
                style={{fontWeight:downloadTarget==='memoria'?'bold':'normal'}}
              >
                📄 Boas Memórias (1 KB)
              </button>
              <button 
                className={downloadTarget==='guia'?'pressed':''} 
                onClick={()=>setDownloadTarget('guia')}
                style={{fontWeight:downloadTarget==='guia'?'bold':'normal'}}
              >
                🎮 Guia da LAN House (2 KB)
              </button>
              <button 
                className={downloadTarget==='atalhos'?'pressed':''} 
                onClick={()=>setDownloadTarget('atalhos')}
                style={{fontWeight:downloadTarget==='atalhos'?'bold':'normal'}}
              >
                🪟 Manual de Atalhos PC (2 KB)
              </button>
            </div>

            <div style={{background:'#f9f9f9',border:'1px solid #ddd',padding:'8px',marginBottom:'12px'}}>
              <label style={{display:'block',marginBottom:'4px'}}><input type="checkbox" checked={slow} onChange={e=>setSlow(e.target.checked)}/> Modo lento 56K autêntico (simulação)</label>
              <label style={{display:'block'}}><input type="checkbox" checked={simulateError} onChange={e=>setSimulateError(e.target.checked)}/> Simular interrupção de linha telefônica em 50%</label>
            </div>

            <button onClick={()=>{setProgress(0);setPaused(false);setDownloadError(false)}} disabled={progress>=0&&progress<100}>
              Baixar TXT original
            </button>
            {progress>=0&&(
              <>
                <p role="status">{progress}% · {progress===100?'Concluído!':'Transferindo pela conexão fictícia…'}</p>
                <progress value={progress} max="100"/>
                <p>{downloadError?'Erro de conexão simulado. Seus dados permanecem intactos.':paused?'Download pausado.':'Estimativa fictícia: '+Math.ceil((100-progress)/(slow?2:10)*(slow?.5:.18))+' s'}</p>
                {progress<100&&<button onClick={()=>{setPaused(!paused);if(paused){setDownloadError(false);setSimulateError(false)}}}>{paused?'Retomar download':'Pausar download'}</button>}
                {progress<100&&<button onClick={()=>setProgress(-1)}>Cancelar download</button>}
                {progress===100&&vfsSaved&&(
                  <p style={{background:'#e8f4fd',border:'1px solid #1a59c3',padding:'8px',marginTop:'8px',borderRadius:'4px'}}>
                    <b>✓ Arquivo salvo no sistema com sucesso:</b><br/>
                    C:\Meus Documentos\{downloadTarget==='guia'?'Guia da LAN House.txt':downloadTarget==='atalhos'?'Manual de Atalhos.txt':'Boas Memorias.txt'}<br/>
                    <button style={{marginTop:'6px'}} onClick={()=>open('documents')}>Abrir em Meus Documentos →</button>
                  </p>
                )}
              </>
            )}
            <p style={{fontSize:'12px',color:'#666',marginTop:'14px'}}>
              Os downloads geram arquivos de texto autênticos salvos no seu sistema virtual local (VFS), sem qualquer consumo da sua conexão real.
            </p>
          </article>
        ):page==='gifs'?(
          <article>
            <h1>Central de GIFs &amp; animações</h1>
            <p>Movimentos originais recriados em CSS, sem arquivos de terceiros.</p>
            <div className="gif-gallery">
              {['✉','✦','💾','⚙'].map((s,i)=>(
                <figure key={s}>
                  <span className={'retro-animation '+(i%2?'bounce':'')}>{s}</span>
                  <figcaption>{['Você tem correio!','Estrela da homepage','Salve sempre','Site em manutenção'][i]}</figcaption>
                </figure>
              ))}
            </div>
            <p>EASTER EGG: este envelope passou 25 anos esperando um clique.</p>
          </article>
        ):page==='jogos'?(
          <article>
            <h1>Jogatina da lan</h1>
            <p>Três jogos completos. Escolha sua máquina:</p>
            <div className="web-game-links">
              <button onClick={()=>open('retrolauncher')}>Abrir Retro Game Launcher (8 Jogos)</button>
              <button onClick={()=>open('gamecenter')}>Visitar Retro Game Center</button>
              <button onClick={()=>open('lan')}>Cenário LAN House</button>
              <button onClick={()=>open('mines')}>Campo Minado</button>
              <button onClick={()=>open('snake')}>Snake</button>
              <button onClick={()=>open('solitaire')}>Paciência</button>
            </div>
            <p>EASTER EGG: ficha de uma hora trocada por diversão infinita.</p>
          </article>
        ):page==='busca'?(
          <article className="search-engine-page">
            <h1 style={{textAlign:'center',fontSize:38,color:'#214e87',marginBottom:'4px'}}>Cadê a página?</h1>
            <p style={{textAlign:'center',color:'#555',margin:'0 0 16px 0'}}>O grande índice da web brasileira dos anos 2000</p>
            <form className="web-search" onSubmit={e=>{e.preventDefault();}}>
              <input aria-label="Buscar na internet retrô" placeholder="Ex: jogos, lan house, windows, blog, recreio, lab1999..." value={query} onChange={e=>{setQuery(e.target.value);}}/>
              <button type="button" onClick={()=>{}}>Buscar na Web</button>
            </form>

            <div style={{display:'flex',gap:'10px',justifyContent:'center',alignItems:'center',margin:'12px 0',flexWrap:'wrap',fontSize:'13px'}}>
              <label style={{display:'flex',alignItems:'center',gap:'4px'}}>
                <span>Categoria:</span>
                <select value={searchCategory} onChange={e=>setSearchCategory(e.target.value)} style={{padding:'3px 6px'}}>
                  <option value="all">Todas as Categorias</option>
                  <option value="portal">Portais</option>
                  <option value="forum">Fóruns</option>
                  <option value="blog">Blogs</option>
                  <option value="fotolog">Fotolog</option>
                  <option value="games">Jogos & LAN</option>
                  <option value="social">Rede Social</option>
                  <option value="tools">Ferramentas & Utilitários</option>
                  <option value="secret">Arquivos Secretos</option>
                </select>
              </label>

              <label style={{display:'flex',alignItems:'center',gap:'4px',cursor:'pointer'}}>
                <input type="checkbox" checked={filterEra} onChange={e=>setFilterEra(e.target.checked)}/>
                <span>Restringir à época atual ({era})</span>
              </label>
            </div>

            <div className="search-results-container" style={{marginTop:'16px'}}>
              <div style={{fontSize:'12px',color:'#666',marginBottom:'10px',borderBottom:'1px solid #ccc',paddingBottom:'4px'}}>
                {searchWebRegistry(query, filterEra ? era : undefined, searchCategory).length} resultado(s) encontrado(s){query ? ` para "${query}"` : ''}:
              </div>
              {searchWebRegistry(query, filterEra ? era : undefined, searchCategory).length===0?(
                <div style={{padding:'20px',textAlign:'center',background:'#f9f9f9',border:'1px dashed #ccc'}}>
                  <p><b>Nenhuma página encontrada com esses termos ou filtros.</b></p>
                  <p>Sugestões: tente termos como <i>jogos, lan house, windows, blog, recreio, musica, lab1999</i> ou desmarque o filtro de época.</p>
                </div>
              ):(
                searchWebRegistry(query, filterEra ? era : undefined, searchCategory).map(item=>(
                  <div key={item.id} className="search-result-item" style={{marginBottom:'14px',paddingBottom:'10px',borderBottom:'1px dotted #e0e0e0'}}>
                    <div style={{fontSize:'16px',fontWeight:'bold'}}>
                      <a href={'#'+item.id} onClick={e=>{e.preventDefault();go(item.id)}} style={{color:'#0000cc',textDecoration:'underline'}}>
                        {item.title}
                      </a>
                      <span style={{fontSize:'11px',marginLeft:'8px',padding:'1px 5px',background:'#e6f2ff',borderRadius:'3px',color:'#004080'}}>
                        Ano {item.year} · {item.category}
                      </span>
                    </div>
                    <div style={{color:'#008000',fontSize:'12px',marginTop:'2px'}}>{item.url}</div>
                    <div style={{color:'#333',fontSize:'13px',marginTop:'4px',lineHeight:'1.4'}}>{item.description}</div>
                  </div>
                ))
              )}
            </div>
            <small style={{display:'block',marginTop:'20px',textAlign:'center',color:'#888'}}>
              Busca com indexação local profunda, filtros temporais e relevância calculada em tempo real no RETRO OS.
            </small>
          </article>
        ):page==='escola'?(
          <article>
            <div className="web-school">
              <h1>Escola do Futuro — Laboratório 2000</h1>
              <h3>Atividade de informática</h3>
              <p>Qual objeto você usava para levar o trabalho para casa?</p>
              {['Disquete','Nuvem de algodão','Impressora de bolso'].map(a=>(
                <button key={a} onClick={()=>setQuiz(a==='Disquete'?'EASTER EGG: Nota 10! Só falta colocar uma etiqueta com seu nome.':'Tente outra vez, sem consultar a enciclopédia.')}>{a}</button>
              ))}
              <p role="status">{quiz}</p>
              <button onClick={()=>open('floppy')}>Abrir disquete da turma</button>
              <p>trabalho_final_agora_vai.doc — nosso famoso documento fictício.</p>
            </div>
          </article>
        ):page==='musica'?(
          <article>
            <h1>Minha pasta de MP3</h1>
            <div style={{maxWidth:468,height:60,background:'#142f53',color:'#f3df85',display:'grid',placeItems:'center',font:'bold 16px monospace'}}>CD COLETÂNEA 2004 · RETRO OS</div>
            <p>Uma prateleira editorial de referências culturais escolhidas pelo usuário. Não representa ranking de audiência nem inclui gravações desses artistas.</p>
            {musicCulture.map(([category,artists])=>(
              <section key={category as string}>
                <h3>{category}</h3>
                <p>{(artists as string[]).join(' · ')}</p>
              </section>
            ))}
            <p>Traga seus arquivos de áudio locais, ou ouça nossa pequena demo instrumental original no player. Nenhuma música comercial acompanha o RETRO OS.</p>
            <button onClick={()=>open('player')}>Abrir RETROAMP</button>
          </article>
        ):page==='arquivo'?(
          <HistoricalArchive currentEra={era} onNavigate={go} />
        ):museumSites.some(s=>s[0]===page.split('/')[0])?(
          <Suspense fallback={<p>Carregando página do acervo…</p>}>
            <HistoricalPage page={page} era={era} go={go} open={open}/>
          </Suspense>
        ):(
          <article>
            <h1>404 — O cabo caiu?</h1>
            <p>Esse endereço não existe. Use os links do nosso diretório.</p>
          </article>
        )}
      </div>
      <footer className="statusbar">
        {loading?'Carregando página… · ':'Concluído · '}
        {connection==='connected'?'Conectado a 56 Kbps':'Offline / cache local'} · Época {era}
      </footer>
    </div>
  );
}
