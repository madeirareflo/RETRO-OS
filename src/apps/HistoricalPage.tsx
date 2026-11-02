import { useState } from 'react';
import type { AppId } from '../core/registry';
import { MuseumSocial } from './MuseumSocial';
import { MuseumPhoto } from '../museum/Artwork';

export function HistoricalPage({ page, era, go, open }: { page: string; era: number; go: (page: string) => void; open: (id: AppId) => void }) {
  const [photo, setPhoto] = useState(0);
  const [thread, setThread] = useState('');
  const [activeForumTab, setActiveForumTab] = useState<'geral' | 'hardware' | 'windows' | 'internet' | 'jogos' | 'offtopic'>('geral');
  const [blogAuthor, setBlogAuthor] = useState<'monitor' | 'leo' | 'bia' | 'rafa'>('monitor');

  const parts = page.split('/');
  const base = parts[0];
  const sub = parts[1] || '';

  const link = (id: string, text: string) => (
    <a href={'#' + id} onClick={e => { e.preventDefault(); go(id); }}>{text}</a>
  );

  // 1. REDE RECREIO
  if (base === 'recreio') {
    return <MuseumSocial initial={sub || 'bia'} onVisit={id => go('recreio/' + id)} open={open} />;
  }

  // 2. FOTOLOG DA TURMA
  if (base === 'fotolog') {
    return (
      <article className="fotolog-museum">
        <header style={{ borderBottom: '2px solid #555', paddingBottom: '6px', marginBottom: '12px' }}>
          <h1 style={{ margin: 0, color: '#333' }}>fotodiário da turma de informática</h1>
          <p style={{ margin: '4px 0 0 0', color: '#666' }}>uma foto original por dia · memórias do laboratório e da LAN House (2002–2005)</p>
        </header>
        <div className="foto-layout">
          <aside>
            {[0, 1, 2].map(i => (
              <button key={i} onClick={() => setPhoto(i)} style={{ display: 'block', margin: '4px 0', cursor: 'pointer' }}>
                <MuseumPhoto scene={i} />
              </button>
            ))}
          </aside>
          <section>
            <MuseumPhoto scene={photo} large />
            <h3>{['Tarde no Laboratório de Informática', 'Fila da CyberSpace LAN House', 'A Gaveta Cheia de CD-Rs'][photo]}</h3>
            <p style={{ fontSize: '13px', color: '#444' }}>
              {[
                'Bia concentrada salvando em dois disquetes enquanto o monitor confere os cabos de rede.',
                'Léo e a turma esperando abrir as portas do corujão de sábado na LAN House.',
                'A coleção de coletâneas que o Rafa gravou e catalogou com caneta de CD.'
              ][photo]}
            </p>
            <div style={{ background: '#f5f5f5', border: '1px solid #ddd', padding: '10px', marginTop: '12px' }}>
              <h4 style={{ margin: '0 0 8px 0' }}>comentários dos amigos:</h4>
              <p style={{ margin: '4px 0' }}>{link('recreio/bia', 'Bia')}: Salvei essa foto num disquete azul! Ficou linda!</p>
              <p style={{ margin: '4px 0' }}>{link('recreio/leo', 'Léo')}: Na máquina 07 a partida de corujão vai ser épica!</p>
              <p style={{ margin: '4px 0' }}>{link('recreio/rafa', 'Rafa')}: O encarte do CD da foto 3 foi feito no Paint :)</p>
            </div>
            <p style={{ marginTop: '16px', fontSize: '13px' }}>
              {link('blog/bia', 'Caderno da Bia')} · {link('blog/leo', 'Blog do Léo')} · {link('lanhouse', 'Ver a LAN House')} · {link('recreio', 'Rede Recreio')}
            </p>
          </section>
        </div>
      </article>
    );
  }

  // 3. CYBERSPACE LAN HOUSE & GAMES
  if (base === 'lanhouse') {
    return (
      <article className="lanhouse-page" style={{ fontFamily: 'Tahoma, sans-serif' }}>
        <header style={{ background: '#0a1d37', color: '#00ffcc', padding: '14px', border: '2px solid #00ffcc' }}>
          <h1 style={{ margin: 0, fontSize: '26px' }}>⚡ CYBERSPACE LAN HOUSE &amp; GAMES ⚡</h1>
          <p style={{ margin: '4px 0 0 0', color: '#fff', fontSize: '13px' }}>16 Computadores em Rede · Conexão Rápida · Placas 3D · Salgadinho e Refrigerante</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px', marginTop: '12px' }}>
          <div>
            <h3>Tabela de Preços &amp; Pacotes</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }} border={1}>
              <thead>
                <tr style={{ background: '#e0f2fe' }}>
                  <th style={{ padding: '6px' }}>Tempo</th>
                  <th style={{ padding: '6px' }}>Valor</th>
                  <th style={{ padding: '6px' }}>Observação</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '6px' }}>1 Hora Avulsa</td>
                  <td style={{ padding: '6px' }}>R$ 2,50</td>
                  <td style={{ padding: '6px' }}>Acesso livre a internet e jogos locais</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px' }}>Pacote 3 Horas</td>
                  <td style={{ padding: '6px' }}>R$ 6,00</td>
                  <td style={{ padding: '6px' }}>Mais pedido nas tardes de quinta</td>
                </tr>
                <tr style={{ background: '#fef3c7', fontWeight: 'bold' }}>
                  <td style={{ padding: '6px' }}>Corujão (23h às 06h)</td>
                  <td style={{ padding: '6px' }}>R$ 12,00</td>
                  <td style={{ padding: '6px' }}>Vagas limitadas! Inclui 1 refrigerante</td>
                </tr>
              </tbody>
            </table>

            <h3 style={{ marginTop: '16px' }}>Campeonato de Sábado: Jogos Clássicos</h3>
            <p style={{ fontSize: '13px', lineHeight: '1.4' }}>
              Inscrições abertas na bancada com o Léo. Traga seu mousepad se preferir. 
              Os jogos homologados estão integrados diretamente no sistema!
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '8px 0' }}>
              <button onClick={() => open('retrolauncher')}>🎮 Abrir Retro Game Launcher (8 Jogos)</button>
              <button onClick={() => open('gamecenter')}>🏆 Acessar Retro Game Center</button>
            </div>

            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '10px', marginTop: '12px' }}>
              <b style={{ color: '#166534' }}>💡 Dica do Léo da Máquina 07:</b>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>
                "Para melhorar o reflexo nas partidas de corujão, ajuste a sensibilidade do mouse no Painel de Controle e treine no Campo Minado antes da rodada!"
              </p>
              <p style={{ margin: '6px 0 0 0', fontSize: '12px' }}>
                {link('blog/leo', 'Leia mais relatos na Bancada do Léo →')}
              </p>
            </div>
          </div>

          <aside style={{ background: '#f8fafc', padding: '10px', border: '1px solid #cbd5e1' }}>
            <h4 style={{ margin: '0 0 6px 0' }}>Frequentadores:</h4>
            <p style={{ fontSize: '12px', margin: '4px 0' }}>{link('recreio/leo', 'Léo (Máquina 07)')} — Fixo no corujão</p>
            <p style={{ fontSize: '12px', margin: '4px 0' }}>{link('recreio/rafa', 'Rafa (CD-R)')} — Traz a playlist</p>
            <p style={{ fontSize: '12px', margin: '4px 0' }}>{link('recreio/bia', 'Bia')} — Faz as capas de equipe</p>
            <p style={{ fontSize: '12px', margin: '4px 0' }}>{link('recreio/nina', 'Nina')} — Arte dos cartazes</p>
            <hr />
            <h4 style={{ margin: '8px 0 6px 0' }}>Links da LAN:</h4>
            <p style={{ fontSize: '12px', margin: '4px 0' }}>{link('forum/jogos', 'Fórum de Jogos da LAN')}</p>
            <p style={{ fontSize: '12px', margin: '4px 0' }}>{link('fotolog', 'Ver fotos da Fila da LAN')}</p>
            <p style={{ fontSize: '12px', margin: '4px 0' }}>{link('portal', 'Voltar ao Portal 2000')}</p>
          </aside>
        </div>
      </article>
    );
  }

  // 4. FÓRUM DO GABINETE BEGE
  if (base === 'forum') {
    const currentCategory = (sub || activeForumTab) as 'geral' | 'hardware' | 'windows' | 'internet' | 'jogos' | 'offtopic';

    const threadsByCategory = {
      geral: [
        { id: 't1', title: 'Como organizar os trabalhos sem perder a versão final?', author: 'Bia do laboratório', date: '18/08/2003', replies: 4 },
        { id: 't2', title: 'Quem vai no corujão da CyberSpace LAN House?', author: 'Léo da máquina 07', date: '22/08/2003', replies: 8 },
        { id: 't3', title: 'O mistério dos disquetes sem etiqueta no armário 3', author: 'Monitor do laboratório', date: '10/09/2003', replies: 5 }
      ],
      hardware: [
        { id: 'h1', title: 'Coloquei um cooler de cobre no processador: valeu a pena!', author: 'Léo da máquina 07', date: '15/09/2003', replies: 6 },
        { id: 'h2', title: 'Memória DIMM de 128 MB ou 256 MB para multitarefa?', author: 'HardwareGuy', date: '04/09/2003', replies: 3 },
        { id: 'h3', title: 'Fonte bege aguentando placa 3D aceleradora', author: 'BancadaTech', date: '28/08/2003', replies: 5 }
      ],
      windows: [
        { id: 'w1', title: 'Atalhos de teclado essenciais no Windows: Alt+Tab e Ctrl+A!', author: 'Monitor do laboratório', date: '02/10/2003', replies: 7 },
        { id: 'w2', title: 'Diferenças de estabilidade entre Win98 SE e Win2000 Pro', author: 'AdminSys', date: '25/09/2003', replies: 9 },
        { id: 'w3', title: 'Como personalizar a barra de tarefas e os sons de inicialização', author: 'Nina dos pixels', date: '12/09/2003', replies: 4 }
      ],
      internet: [
        { id: 'i1', title: 'Dicas de discagem: conectar pontualmente à meia-noite para 1 pulso', author: 'ProvedorSaudade', date: '11/08/2002', replies: 12 },
        { id: 'i2', title: 'Modem 56K V.90 fazendo barulho estranho ao negociar portadora', author: 'DisqueJa', date: '19/07/2002', replies: 4 },
        { id: 'i3', title: 'Páginas que pesam menos de 50 KB carregam instantaneamente!', author: 'Webmaster1999', date: '01/06/2001', replies: 6 }
      ],
      jogos: [
        { id: 'j1', title: 'Estratégias de defesa e ataque no campeonato de sábado da LAN', author: 'Léo da máquina 07', date: '21/09/2003', replies: 11 },
        { id: 'j2', title: 'Onde encontrar os itens secretos no jogo DOS do laboratório?', author: 'FanzineClub', date: '18/09/2003', replies: 8 },
        { id: 'j3', title: 'Mouse de bolinha vs mouse óptico na jogatina', author: 'Rafa do CD-R', date: '05/09/2003', replies: 5 }
      ],
      offtopic: [
        { id: 'o1', title: 'Histórias assustadoras do laboratório às 18h no escuro', author: 'Bia do laboratório', date: '29/08/2003', replies: 14 },
        { id: 'o2', title: 'Alguém lembra do site pioneiro do clube de 1999?', author: 'Monitor do laboratório', date: '14/08/2003', replies: 6 },
        { id: 'o3', title: 'Qual refrigerante dá mais energia no corujão?', author: 'GamerMadruga', date: '08/08/2003', replies: 9 }
      ]
    };

    return (
      <article className="forum-museum">
        <header style={{ borderBottom: '2px solid #204a87', paddingBottom: '6px', marginBottom: '10px' }}>
          <h1 style={{ margin: 0, color: '#204a87' }}>Fórum do Gabinete Bege</h1>
          <p style={{ margin: '4px 0 0 0', color: '#555' }}>Comunidade técnica de informática dos anos 2000 · Discussões autênticas arquivadas</p>
        </header>

        {/* NAVEGAÇÃO DE SUBFÓRUNS */}
        <nav style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {[
            ['geral', '📋 Geral'],
            ['hardware', '🔧 Hardware & Overclock'],
            ['windows', '🪟 Dicas Windows'],
            ['internet', '🌐 Internet Discada'],
            ['jogos', '🎮 Jogos & LAN'],
            ['offtopic', '☕ Off-Topic']
          ].map(([cat, label]) => (
            <button
              key={cat}
              className={currentCategory === cat ? 'pressed' : ''}
              onClick={() => { setThread(''); setActiveForumTab(cat as 'geral' | 'hardware' | 'windows' | 'internet' | 'jogos' | 'offtopic'); go('forum/' + cat); }}
              style={{ fontSize: '12px', padding: '4px 8px', fontWeight: currentCategory === cat ? 'bold' : 'normal' }}
            >
              {label}
            </button>
          ))}
        </nav>

        {thread ? (
          <div>
            <button onClick={() => setThread('')} style={{ marginBottom: '10px' }}>← Voltar para a lista de tópicos</button>
            <h2 style={{ fontSize: '18px', color: '#204a87', borderBottom: '1px solid #ccc', paddingBottom: '4px' }}>{thread}</h2>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '8px' }} border={1}>
              <tbody>
                <tr>
                  <th style={{ width: '180px', verticalAlign: 'top', background: '#f0f4f8', padding: '8px' }}>
                    <b>Monitor do laboratório</b><br />
                    <small>Moderador do Acervo</small><br />
                    <small>Mensagens: 242</small>
                  </th>
                  <td style={{ padding: '8px', verticalAlign: 'top' }}>
                    <p>
                      Sempre recomendamos fazer backup antes de qualquer teste! 
                      No Bloco de Notas e no Explorer do RETRO OS, o atalho <b>Ctrl+A</b> seleciona tudo de forma rápida. 
                      E quem estiver procurando a página esquecida de 1999 pode encontrar pistas no tópico do clube antigo!
                    </p>
                    <hr style={{ margin: '8px 0', border: 0, borderTop: '1px dashed #ccc' }} />
                    <small style={{ color: '#666' }}>Assinatura: "Na dúvida, salve no disquete antes que o colega puxe o cabo."</small>
                  </td>
                </tr>
                <tr>
                  <th style={{ verticalAlign: 'top', background: '#f0f4f8', padding: '8px' }}>
                    <b>Léo da máquina 07</b><br />
                    <small>Frequentador da LAN</small><br />
                    <small>Mensagens: 189</small>
                  </th>
                  <td style={{ padding: '8px', verticalAlign: 'top' }}>
                    <p>
                      Testei no corujão da CyberSpace e confirmo: com as resoluções PC adequadas e alternando janelas com <b>Alt+Tab</b>, a navegação fica muito mais ágil.
                      Vejam a tabela de horários e os jogos disponíveis lá: {link('lanhouse', 'Página da CyberSpace LAN House')}.
                    </p>
                    <hr style={{ margin: '8px 0', border: 0, borderTop: '1px dashed #ccc' }} />
                    <small style={{ color: '#666' }}>Assinatura: "Mais 15 minutos de corujão e eu fecho essa fase."</small>
                  </td>
                </tr>
                <tr>
                  <th style={{ verticalAlign: 'top', background: '#f0f4f8', padding: '8px' }}>
                    <b>Bia do laboratório</b><br />
                    <small>Aluna de Informática</small><br />
                    <small>Mensagens: 135</small>
                  </th>
                  <td style={{ padding: '8px', verticalAlign: 'top' }}>
                    <p>
                      Quem precisar das notas de aula pode conferir o meu caderno digital. Deixei o link no meu perfil da Rede Recreio!
                      Link: {link('recreio/bia', 'Perfil da Bia na Recreio')} ou no {link('blog/bia', 'Caderno da Bia')}.
                    </p>
                    <hr style={{ margin: '8px 0', border: 0, borderTop: '1px dashed #ccc' }} />
                    <small style={{ color: '#666' }}>Assinatura: "Disquete formatado é folha em branco."</small>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <h3 style={{ textTransform: 'uppercase', fontSize: '14px', color: '#333' }}>
              Tópicos Recentes em {currentCategory.toUpperCase()}
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }} border={1}>
              <thead>
                <tr style={{ background: '#e2e8f0' }}>
                  <th style={{ padding: '6px' }}>Título do Tópico</th>
                  <th style={{ padding: '6px', width: '150px' }}>Autor</th>
                  <th style={{ padding: '6px', width: '90px' }}>Data</th>
                  <th style={{ padding: '6px', width: '70px' }}>Respostas</th>
                </tr>
              </thead>
              <tbody>
                {(threadsByCategory[currentCategory] || threadsByCategory.geral).map(t => (
                  <tr key={t.id}>
                    <td style={{ padding: '6px' }}>
                      <button 
                        className="museum-link" 
                        onClick={() => setThread(t.title)} 
                        style={{ textAlign: 'left', fontWeight: 'bold', color: '#1d4ed8' }}
                      >
                        {t.title}
                      </button>
                    </td>
                    <td style={{ padding: '6px' }}>{t.author}</td>
                    <td style={{ padding: '6px' }}>{t.date}</td>
                    <td style={{ padding: '6px', textAlign: 'center' }}>{t.replies}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ marginTop: '16px', borderTop: '1px solid #ccc', paddingTop: '8px', fontSize: '12px' }}>
          <b>Navegação Rápida:</b> {link('portal', 'Portal Central')} · {link('lanhouse', 'CyberSpace LAN House')} · {link('blog', 'Rede de Blogs')} · {link('recreio', 'Rede Recreio')} · {link('secreto/lab1999', 'Página Oculta de 1999')}
        </div>
      </article>
    );
  }

  // 5. REDE DE BLOGS (MONITOR, LÉO, BIA, RAFA)
  if (base === 'blog') {
    const authorParam = (sub || blogAuthor) as 'monitor' | 'leo' | 'bia' | 'rafa';

    return (
      <article className="blog-museum">
        <header style={{ borderBottom: '2px solid #854d0e', paddingBottom: '6px', marginBottom: '12px' }}>
          <h1 style={{ margin: 0, color: '#854d0e' }}>Rede de Blogs da Turma de Informática</h1>
          <p style={{ margin: '4px 0 0 0', color: '#713f12' }}>Diários pessoais, anotações de laboratório e histórias da vida conectada nos anos 2000</p>
        </header>

        {/* SELETOR DE AUTOR DE BLOG */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
          {[
            ['monitor', '📝 Diário do Monitor'],
            ['leo', '⚡ Bancada do Léo (LAN & Hardware)'],
            ['bia', '🌸 Caderno da Bia (Estudos & Amigos)'],
            ['rafa', '💿 CD-R Express (Rafa & MP3)']
          ].map(([author, title]) => (
            <button
              key={author}
              className={authorParam === author ? 'pressed' : ''}
              onClick={() => { setBlogAuthor(author as 'monitor' | 'leo' | 'bia' | 'rafa'); go('blog/' + author); }}
              style={{ fontSize: '12px', padding: '5px 8px', fontWeight: authorParam === author ? 'bold' : 'normal' }}
            >
              {title}
            </button>
          ))}
        </div>

        {authorParam === 'monitor' && (
          <div className="blog-entry">
            <h2>Diário do Monitor: O Arquivo Secreto do Laboratório</h2>
            <small>Postado em 14 de Outubro de 2003 por Monitor do Laboratório</small>
            <p>
              Hoje encontrei na gaveta do fundo um envelope pardo com a anotação "Fundadores de 1999". 
              Nele havia um disquete de 3.5 polegadas contendo a primeira página secreta que os alunos pioneiros colocaram no ar.
            </p>
            <p>
              Aquela página ainda funciona perfeitamente no nosso acervo! Para os curiosos que querem investigar a história do clube de computação, 
              o endereço gravado no papel era: {link('secreto/lab1999', 'retro://secreto/lab1999')}.
            </p>
            <blockquote style={{ background: '#fefce8', borderLeft: '4px solid #ca8a04', padding: '6px 12px', margin: '10px 0' }}>
              "Quem não guarda o passado com etiquetas coloridas, perde o futuro na próxima formatação."
            </blockquote>
            <p style={{ fontSize: '13px' }}>
              {link('forum/offtopic', 'Comentar no Fórum Off-Topic →')} · {link('recreio/bia', 'Ver perfil da Bia na Recreio →')}
            </p>
          </div>
        )}

        {authorParam === 'leo' && (
          <div className="blog-entry">
            <h2>Bancada do Léo: Preparando a Máquina 07 para o Corujão</h2>
            <small>Postado em 22 de Outubro de 2003 por Léo da máquina 07</small>
            <p>
              Hoje passei a tarde toda na CyberSpace LAN House limpando as ventoinhas dos gabinetes e organizando os atalhos dos jogos. 
              A máquina 07 está voando com a placa aceleradora de 64 MB!
            </p>
            <p>
              Se você vai participar do campeonato deste sábado, não esqueça de conferir a tabela de horários e praticar as manobras:
            </p>
            <p>
              {link('lanhouse', 'Ver página da LAN House')} · {link('forum/jogos', 'Discussão no Fórum de Jogos')} · {link('recreio/leo', 'Meu Perfil na Recreio')}
            </p>
          </div>
        )}

        {authorParam === 'bia' && (
          <div className="blog-entry">
            <h2>Caderno da Bia: Dois Disquetes e uma Tarde de Sol</h2>
            <small>Postado em 18 de Outubro de 2003 por Bia do laboratório</small>
            <p>
              Terminei a capa do trabalho de história usando o Paint e colei uma etiqueta azul com estrelinhas. 
              O monitor elogiou que eu sempre faço backup antes de tirar o disquete.
            </p>
            <p>
              Depois da aula fomos com a Nina e o Rafa tomar sorvete e tiramos uma foto que já está no Fotolog:
            </p>
            <p>
              {link('fotolog', 'Conferir foto no Fotolog da Turma')} · {link('recreio/bia', 'Deixar um scrap no meu perfil')}
            </p>
          </div>
        )}

        {authorParam === 'rafa' && (
          <div className="blog-entry">
            <h2>CD-R Express: Gravando a Coletânea Perfeita</h2>
            <small>Postado em 25 de Outubro de 2003 por Rafa do CD-R</small>
            <p>
              A velocidade 8x é a mais segura para não queimar mídia de CD virgem. Hoje gravei 18 faixas instrumentais originais 
              para tocar de fundo nas sessões da LAN House.
            </p>
            <p>
              Você pode conferir a seleção de MP3 e abrir o player musical aqui mesmo:
            </p>
            <p>
              {link('musica', 'Prateleira de MP3')} · {link('recreio/rafa', 'Ver meu perfil na Recreio')}
            </p>
          </div>
        )}

        <div style={{ marginTop: '20px', borderTop: '1px solid #ddd', paddingTop: '8px', fontSize: '13px' }}>
          {link('portal', 'Portal 2000')} · {link('forum', 'Fórum do Gabinete')} · {link('recreio', 'Rede Recreio')} · {link('fotolog', 'Fotolog')}
        </div>
      </article>
    );
  }

  // 6. SITE SECRETO: ARQUIVO DO LABORATÓRIO 1999
  if (base === 'secreto') {
    return (
      <article className="secret-page" style={{ background: '#000', color: '#00ff00', fontFamily: 'Courier New, monospace', padding: '16px', border: '3px double #00ff00' }}>
        <h1 style={{ textAlign: 'center', color: '#ffff00', fontSize: '24px' }}>★ ARQUIVO OCULTO · LABORATÓRIO 1999 ★</h1>
        <p style={{ textAlign: 'center', color: '#00ffcc' }}>[ VOCÊ ENCONTROU A HOMEPAGE SECRETA DOS FUNDADORES ]</p>
        <hr style={{ borderColor: '#00ff00' }} />
        <p>Parabéns, visitante! Você seguiu as pistas do Fórum e do Diário do Monitor até o arquivo esquecido de 1999.</p>
        <p>Esta página foi o ponto de partida de todo o universo do RETRO OS. Aqui ficam registradas as regras de ouro do clube:</p>
        <ol style={{ lineHeight: '1.6' }}>
          <li>Nunca puxe um disquete enquanto a luz da unidade A: estiver acesa.</li>
          <li>Use <b>Alt+Tab</b> para alternar tarefas como um verdadeiro usuário avançado.</li>
          <li>O corujão da CyberSpace começa às 23h: chegue cedo para garantir a máquina 07.</li>
          <li>A versão final de um documento nunca é a última; sempre haverá um 'final_agora_vai.doc'.</li>
        </ol>
        <div style={{ background: '#003300', padding: '10px', border: '1px dashed #00ff00', marginTop: '12px' }}>
          <b style={{ color: '#ffff00' }}>EASTER EGG HOMOLOGADO:</b>
          <p style={{ margin: '4px 0 0 0' }}>
            O segredo da internet retrô é que cada link leva a uma nova história. 
            Você completou a <b>Jornada F (Investigação)</b> com sucesso!
          </p>
        </div>
        <p style={{ marginTop: '16px' }}>
          <button onClick={() => go('portal')} style={{ background: '#00ff00', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}>
            ← Voltar ao Portal Central
          </button> · 
          <button onClick={() => go('lanhouse')} style={{ background: '#00ffcc', color: '#000', fontWeight: 'bold', marginLeft: '8px', cursor: 'pointer' }}>
            Ir para a LAN House →
          </button>
        </p>
      </article>
    );
  }

  // 7. PORTAIS CLÁSSICOS (PORTAL DA PRAÇA E PONTOBR)
  if (base === 'portal-praca' || base === 'portal-ponto') {
    return (
      <article className={'museum-portal ' + base}>
        <header>
          <b>{base === 'portal-praca' ? 'Portal da Praça 1998' : 'PontoBR Tecnologia 2000'}</b>
          <small>EDIÇÃO HISTÓRICA FICTÍCIA · {era}</small>
        </header>
        <div className="museum-banner">SUA HOMEPAGE CABE NUM DISQUETE! · BANNER ORIGINAL 468×60</div>
        <nav>
          {link('busca', 'buscar')} | {link('downloads', 'downloads')} | {link('forum', 'fórum')} | {link('lanhouse', 'lan house')} | {link('pessoal', 'homepage')}
        </nav>
        <div className="old-portal-columns">
          <aside>
            <h3>Canais</h3>
            <p>{link('lanhouse', '🎮 CyberSpace LAN House')}</p>
            <p>{link('forum', '💬 Fórum Técnico')}</p>
            <p>{link('blog', '📝 Rede de Blogs')}</p>
            <p>{link('fotolog', '📸 Fotolog da Galera')}</p>
            <p>{link('recreio', '🤝 Rede Recreio')}</p>
            <p>{link('programas', '💾 Museu dos Programas')}</p>
            <p>{link('escola', '🎒 Escola & Laboratório')}</p>
            <p>{link('discador', '📞 Provedor Saudade')}</p>
          </aside>
          <section>
            <h1>{era < 2001 ? 'A internet cabe no laboratório' : era < 2004 ? 'A vez das LAN houses e dos gabinetes beges' : 'Seu mundo ganha novos links e blogs'}</h1>
            <p>Redação nostálgica do RETRO OS: novidades de hardware, campeonatos de jogos e dicas de discagem segura.</p>
            <h3>Hoje na informática</h3>
            <p>{link('lanhouse', 'Corujão deste sábado na CyberSpace LAN House: confira os horários')}</p>
            <p>{link('forum/windows', 'Dicas essenciais de atalhos e duplo clique na barra de título')}</p>
            <p>{link('blog/monitor', 'Diário do Monitor: relatos do arquivo esquecido de 1999')}</p>
            <p>{link('escola', 'Trabalho escolar: lembre-se de salvar antes de puxar o disquete!')}</p>
            <small>Conteúdo original de ficção histórica do RETRO OS. Nenhum script de terceiros.</small>
          </section>
        </div>
      </article>
    );
  }

  // 8. DEMAIS SITES HISTÓRICOS ORIGINAIS (HUMOR, FANZINE, PROGRAMAS, DISCADOR)
  if (base === 'humor') {
    return (
      <article>
        <h1>Humor em pixels</h1>
        <div className="ascii-comic">
          <pre>{'  [ PC ]  — Você salvou?\n    :)    — Salvei.\n  [ PC ]  — Com qual nome?\n    :|    — final_agora_vai_7.txt'}</pre>
        </div>
        <div className="ascii-comic" style={{ marginTop: '12px' }}>
          <pre>{'  [ LAN ] — Faltam 2 minutos de ficha!\n    :O    — Calma, só mais um round!\n  [ PC ]  — Ficha encerrada. Insira nova moeda.'}</pre>
        </div>
        <p>Tirinhas textuais originais do RETRO OS.</p>
        {link('blog', 'Mais causos nos Blogs da Turma')} · {link('lanhouse', 'Visitar a LAN House')}
      </article>
    );
  }

  if (base === 'fanzine') {
    return (
      <article className="fan-museum">
        <h1>★ Clube do Disquete Perdido ★</h1>
        <p>Página de fã fictícia do jogo original do RETRO OS.</p>
        <div className="animated-star">✦ ✧ ✦</div>
        <p>Dica: recolha as cinco estrelas do laboratório e descubra o arquivo secreto de 1999!</p>
        <button onClick={() => open('dosgame')}>Abrir jogo DOS original</button>
        <p style={{ marginTop: '12px' }}>
          {link('forum/jogos', 'Discutir no Fórum de Jogos')} · {link('secreto/lab1999', 'Ver página secreta de 1999')}
        </p>
      </article>
    );
  }

  if (base === 'programas') {
    return (
      <article>
        <h1>Museu dos Programas e Utilitários</h1>
        <p>Ferramentas autênticas recriadas no RETRO OS prontas para execução imediata:</p>
        <table className="software-table" border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#eee' }}>
              <th style={{ padding: '6px' }}>Experiência Histórica</th>
              <th style={{ padding: '6px' }}>Programa no RETRO OS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '6px' }}>Processamento de texto e notas rápidas</td>
              <td style={{ padding: '6px' }}><button onClick={() => open('notepad')}>Abrir Bloco de Notas (TXT)</button></td>
            </tr>
            <tr>
              <td style={{ padding: '6px' }}>Músicas em MP3 e coletâneas</td>
              <td style={{ padding: '6px' }}><button onClick={() => open('player')}>Abrir RETROAMP Player</button></td>
            </tr>
            <tr>
              <td style={{ padding: '6px' }}>Criação de desenhos e capas de disquete</td>
              <td style={{ padding: '6px' }}><button onClick={() => open('paint')}>Abrir Paint</button></td>
            </tr>
            <tr>
              <td style={{ padding: '6px' }}>Linha de comando e comandos DOS</td>
              <td style={{ padding: '6px' }}><button onClick={() => open('terminal')}>Prompt de Comando</button></td>
            </tr>
            <tr>
              <td style={{ padding: '6px' }}>Mensageiro instantâneo com conversas locais</td>
              <td style={{ padding: '6px' }}><button onClick={() => open('messenger')}>RETRO Messenger</button></td>
            </tr>
            <tr>
              <td style={{ padding: '6px' }}>Gerenciador de arquivos e pastas</td>
              <td style={{ padding: '6px' }}><button onClick={() => open('computer')}>Meu Computador (Explorer)</button></td>
            </tr>
          </tbody>
        </table>
        <p style={{ marginTop: '12px' }}>{link('portal', 'Voltar ao Portal')} · {link('downloads', 'Área de Downloads')}</p>
      </article>
    );
  }

  if (base === 'discador') {
    return (
      <article>
        <h1>Provedor Saudade: Central de Conexão Discada</h1>
        <p>Instruções para acesso à internet discada de 56 Kbps sem custos adicionais:</p>
        <div style={{ background: '#e0f2fe', padding: '10px', border: '1px solid #7eaadb', margin: '10px 0' }}>
          <b>Regra do Pulso Único:</b>
          <p style={{ margin: '4px 0 0 0' }}>
            Disque de segunda a sexta após a meia-noite, ou sábados a partir das 14h e domingos o dia todo, 
            para navegar pagando apenas 1 pulso telefônico!
          </p>
        </div>
        <button onClick={() => open('dialup')}>Abrir Discador Simulado</button>
        <p style={{ marginTop: '12px' }}>
          {link('portal-praca', 'Portal da Praça')} · {link('busca', 'Buscador')} · {link('forum/internet', 'Dicas no Fórum de Internet')}
        </p>
      </article>
    );
  }

  return (
    <article>
      <h1>Página Não Encontrada (404)</h1>
      <p>O endereço solicitado não foi localizado no diretório interno do acervo.</p>
      <p>{link('portal', 'Ir para o Portal Conexão 2000')} · {link('busca', 'Pesquisar no Buscador Retrô')}</p>
    </article>
  );
}
