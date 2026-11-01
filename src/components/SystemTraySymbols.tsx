import type {Language} from '../core/i18n';

export function SystemTraySymbols({muted,connected,language='pt-BR'}:{muted:boolean;connected:boolean;language?:Language}){
  const langLabel = language === 'en' ? 'EN' : language === 'es' ? 'ES' : 'PT';
  return (
    <>
      <span className="tray-lang-badge" title={language === 'en' ? 'English' : language === 'es' ? 'Español' : 'Português (Brasil)'} style={{
        fontSize: '10px',
        fontWeight: 'bold',
        padding: '0 2px',
        border: '1px solid rgba(0,0,0,0.3)',
        borderRadius: '2px',
        marginRight: '2px',
        letterSpacing: '0.5px'
      }}>
        {langLabel}
      </span>
      <svg className="tray-sound" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M2 6h3l4-4v12l-4-4H2z" fill="#ddd" stroke="#30343b"/>
        <path d="M3 7h2v2H3" fill="#fff"/>
        {muted?<path d="m11 5 4 6m0-6-4 6" stroke="#bd2520" strokeWidth="1.5"/>:<path d="M11 5q4 3 0 6m2-9q5 6 0 12" fill="none" stroke="#333"/>}
      </svg>
      <svg className="connection" width="17" height="16" viewBox="0 0 17 16" aria-hidden="true">
        <title>{connected?'56 Kbps':'Disconnected'}</title>
        <path d="M7 1h9v8H7zM1 6h9v8H1z" fill="#ccc" stroke="#414d62"/>
        <path d="M9 3h5v4H9zM3 8h5v4H3z" fill={connected?'#62b8da':'#6286a7'}/>
        <path d="M3 15h5m2-5h4" stroke="#333"/>
        {connected&&<rect x="11" y="11" width="4" height="3" fill="#3baf56"/>}
      </svg>
    </>
  );
}
