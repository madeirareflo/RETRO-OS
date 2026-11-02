import { useEffect, useRef, useState } from 'react';
import { people } from '../museum/social';
import { MuseumPortrait } from '../museum/Artwork';
import { sound } from '../services/audio';
import '../styles/museum.css';

interface OfflineMessengerProps {
  initialContact?: string;
  onNavigateWeb?: (url: string) => void;
}

const scripts: Record<string, { intro: string; replies: { text: string; linkText?: string; webUrl?: string }[] }> = {
  bia: {
    intro: 'Oi! Esta é uma conversa roteirizada do museu. O trabalho está no disquete azul.',
    replies: [
      { text: 'Salvei duas cópias no disquete azul! Não esquece a etiqueta!', linkText: 'Ver no meu caderno digital →', webUrl: 'retro://blog/bia' },
      { text: 'A Nina postou a foto da nossa turma depois da aula.', linkText: 'Ver foto no Fotolog →', webUrl: 'retro://fotolog' },
      { text: 'Você viu que no Fórum falaram do manifesto antigo do laboratório de 1999?', linkText: 'Investigar no Arquivo de 1999 →', webUrl: 'retro://secreto/lab1999' }
    ]
  },
  leo: {
    intro: 'E aí! A máquina 07 na CyberSpace LAN House já está reservada.',
    replies: [
      { text: 'O corujão começa às 23h! A tabela de preços e regras está no site da LAN.', linkText: 'Ver site da CyberSpace LAN House →', webUrl: 'retro://lanhouse' },
      { text: 'Postei uma dica de overclock e atalhos lá no Fórum de Jogos.', linkText: 'Ler no Fórum de Jogos →', webUrl: 'retro://forum/jogos' },
      { text: 'O Rafa me disse que o arquivo histórico tem snapshots antigos da LAN!', linkText: 'Ver no Arquivo Histórico →', webUrl: 'retro://arquivo' }
    ]
  },
  nina: {
    intro: 'Bem-vindo ao cantinho dos pixels! O site está sempre em construção.',
    replies: [
      { text: 'Atualizei o Fotolog com a foto da fila da LAN House!', linkText: 'Conferir o Fotolog da Turma →', webUrl: 'retro://fotolog' },
      { text: 'Meu perfil na Rede Recreio tem um recado novo da Bia.', linkText: 'Ver perfil na Recreio →', webUrl: 'retro://recreio/nina' },
      { text: 'No meu blog postei as pistas sobre os arquivos do servidor de 1999!', linkText: 'Ler Console da Nina →', webUrl: 'retro://blog/nina' }
    ]
  },
  rafa: {
    intro: 'Minha pasta de MP3 está nos trinques com as coletâneas gravadas.',
    replies: [
      { text: 'Escrevi um guia de gravação de CD-R sem erro de buffer no blog.', linkText: 'Ler o Blog do Rafa →', webUrl: 'retro://blog/rafa' },
      { text: 'A prateleira de MP3 tem novidades sobre o RETROAMP!', linkText: 'Abrir Prateleira de MP3 →', webUrl: 'retro://musica' },
      { text: 'Subi dicas de áudio e arquivos no centro de downloads!', linkText: 'Acessar Central de Downloads →', webUrl: 'retro://downloads' }
    ]
  }
};

export function OfflineMessenger({ initialContact = 'bia', onNavigateWeb }: OfflineMessengerProps) {
  const [contact, setContact] = useState(initialContact);
  const [lines, setLines] = useState<Record<string, { sender: string; text: string; linkText?: string; webUrl?: string }[]>>({});
  const [typing, setTyping] = useState(false);
  const [shake, setShake] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const step = useRef<Record<string, number>>({});

  useEffect(() => () => clearTimeout(timer.current), []);

  const p = people.find(person => person.id === contact) || people[0];

  function reply(choice: string) {
    clearTimeout(timer.current);
    const id = contact;
    const initialLine = { sender: p.name, text: scripts[id].intro };

    setLines(old => ({
      ...old,
      [id]: [...(old[id] || [initialLine]), { sender: 'Você (opção do roteiro)', text: choice }]
    }));
    setTyping(true);

    timer.current = setTimeout(() => {
      const n = (step.current[id] || 0) + 1;
      step.current[id] = n;
      const scriptReply = scripts[id].replies[(n - 1) % scripts[id].replies.length];

      setLines(old => ({
        ...old,
        [id]: [
          ...(old[id] || []),
          { sender: p.name, text: scriptReply.text, linkText: scriptReply.linkText, webUrl: scriptReply.webUrl }
        ]
      }));
      setTyping(false);
      sound('notify');
    }, 650);
  }

  return (
    <div className={'offline-messenger ' + (shake ? 'museum-nudge' : '')}>
      <header>
        <b>RETRO Messenger 2003</b>
        <small>Modo de demonstração offline · nenhuma pessoa real conectada</small>
      </header>
      <div className="messenger-layout">
        <aside>
          <h3>Amigos do acervo ({people.length})</h3>
          {people.map(person => (
            <button
              key={person.id}
              className={contact === person.id ? 'pressed' : ''}
              onClick={() => {
                setContact(person.id);
                setTyping(false);
                clearTimeout(timer.current);
              }}
            >
              <MuseumPortrait id={person.id} size={32} />
              <span>
                {person.nick}
                <small>{person.status}</small>
              </span>
            </button>
          ))}
        </aside>
        <section>
          <div className="contact-heading">
            <MuseumPortrait id={contact} size={44} />
            <span>
              <b>{p.name}</b>
              <small>{p.status} · personagem fictício</small>
            </span>
          </div>
          <div className="chat-messages" aria-live="polite">
            {(lines[contact] || [{ sender: p.name, text: scripts[contact].intro }]).map((msg, i) => (
              <div key={i} style={{ marginBottom: '8px' }}>
                <p style={{ margin: 0 }}><b>{msg.sender}:</b> {msg.text}</p>
                {msg.webUrl && (
                  <p style={{ margin: '3px 0 0 10px', fontSize: '12px' }}>
                    <a
                      href={'#' + msg.webUrl}
                      onClick={e => {
                        e.preventDefault();
                        if (onNavigateWeb) onNavigateWeb(msg.webUrl!);
                        else window.dispatchEvent(new CustomEvent('retro:navigate-web', { detail: { url: msg.webUrl } }));
                      }}
                      style={{ color: '#0066cc', textDecoration: 'underline' }}
                    >
                      {msg.linkText || 'Abrir página indicada →'}
                    </a>
                  </p>
                )}
              </div>
            ))}
            {typing && <p><i>Resposta do roteiro em preparação…</i></p>}
          </div>
          <div className="messenger-actions">
            <p style={{ margin: '4px 0', fontSize: '12px' }}>Escolha uma fala para explorar o diálogo:</p>
            <button onClick={() => reply('Onde está o disquete do trabalho?')}>Perguntar pelo disquete</button>
            <button onClick={() => reply('Como vai ser o corujão na LAN House?')}>Perguntar sobre a LAN House</button>
            <button
              onClick={() => {
                setShake(true);
                sound('notify');
                setLines(old => ({
                  ...old,
                  [contact]: [
                    ...(old[contact] || [{ sender: p.name, text: scripts[contact].intro }]),
                    { sender: 'Sistema', text: '[Chamada de atenção simulada — sem envio de rede]' }
                  ]
                }));
                setTimeout(() => setShake(false), 500);
              }}
            >
              Chamar atenção (simulado)
            </button>
            <span className="museum-emoticon" title="Emoticon original">☺</span>
          </div>
        </section>
      </div>
      <footer className="statusbar">
        Histórico fictício nesta sessão · Integrado com a Web Nostálgica do RETRO OS
      </footer>
    </div>
  );
}
