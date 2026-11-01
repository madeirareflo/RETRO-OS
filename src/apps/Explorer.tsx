import {SystemThemeContext} from '../core/ThemeContext';
import {ExplorerSidebar} from './ExplorerSidebar';
import {ExplorerGlyph} from '../components/ExplorerGlyph';
import {useState,useEffect,useRef,useContext,type KeyboardEvent} from 'react';
import {Icon} from '../components/Icon';
import {Dialog} from '../components/Dialog';
import {read,write,type VFile} from '../storage/local';
import {useFiles,createFolder,renameFile,transferMany,deleteMany,getBlob} from '../storage/vfs';
import {sound} from '../services/audio';
import {getTranslation, type Language} from '../core/i18n';

function ImagePreview({file}:{file:VFile}){
  const [url,setUrl]=useState(''),[error,setError]=useState('');
  useEffect(()=>{
    let live=true,objectURL='';
    if(file.content==='school-postcard'){
      setUrl((import.meta.env.BASE_URL+'assets/cartao-da-turma.svg'));
      return;
    }
    getBlob(file.content.slice(8)).then(blob=>{
      if(!live)return;
      if(!blob){setError('Imagem indisponível neste navegador.');return}
      objectURL=URL.createObjectURL(blob);
      setUrl(objectURL);
    }).catch(e=>setError(String(e)));
    return ()=>{live=false;if(objectURL)URL.revokeObjectURL(objectURL)};
  },[file]);
  return url?<img src={url} alt={file.content==='school-postcard'?'Cartão da turma':file.path.split('/').pop()} style={{maxWidth:'100%'}}/>:<p>{error||'Lendo imagem…'}</p>;
}

export function Explorer({initial='',language='pt-BR'}:{initial?:string;language?:Language}){
  const theme=useContext(SystemThemeContext),legacy=theme==='mix';
  const t = getTranslation(language);
  const [tree,setTree]=useState(legacy),[searching,setSearching]=useState(legacy);
  useEffect(()=>{setTree(theme==='mix');setSearching(theme==='mix')},[theme]);

  const [selection,setSelection]=useState<string[]>([]);
  const anchor=useRef('');
  const history=useRef([initial]),cursor=useRef(0);
  const [query,setQuery]=useState(''),[sort,setSort]=useState('name');
  const [path,setPath]=useState(initial),[file,setFile]=useState<VFile|null>(null),[selected,setSelected]=useState(''),[dialog,setDialog]=useState(''),[name,setName]=useState(''),[error,setError]=useState(false),[status,setStatus]=useState(t.explorerReady),[reading,setReading]=useState(false),[view,setView]=useState('icons'),[menu,setMenu]=useState(''),[context,setContext]=useState<{x:number;y:number}|null>(null);

  const all=useFiles(),
        children=all.filter(f=>f.path.slice(0,f.path.lastIndexOf('/'))===path.replace(/\/$/,''))
                    .filter(f=>f.path.split('/').pop()!.toLowerCase().includes(query.toLowerCase()))
                    .sort((a,b)=>sort==='name'?a.path.localeCompare(b.path):b.modified.localeCompare(a.modified)),
        current=all.find(f=>f.path===selected)||file;

  function navigate(p:string,record=true){
    setMenu('');
    if(record&&p!==path){
      history.current=history.current.slice(0,cursor.current+1);
      history.current.push(p);
      cursor.current=history.current.length-1;
    }
    setPath(p);
    setSelection([]);
    setQuery('');
    setFile(null);
    setSelected('');
    setDialog('');
    setContext(null);
    if(p==='A:'){
      sound('floppy');
      setError(Math.random()<.08);
    } else setError(false);
  }

  useEffect(()=>{setPath(initial);setFile(null);setSelected('')},[initial]);
  useEffect(()=>{if(!path.startsWith('A:')){setReading(false);return}setReading(true);const timer=setTimeout(()=>setReading(false),450);return ()=>clearTimeout(timer)},[path]);

  function drop(data:DataTransfer,parent:string,copy:boolean){
    const paths:unknown=JSON.parse(data.getData('application/x-retro-files'));
    if(!Array.isArray(paths)||paths.some(p=>typeof p!=='string'))throw Error('Arraste somente arquivos virtuais');
    transferMany(paths,parent,!copy);
  }

  function action(fn:()=>void){
    try{
      fn();
      setStatus(t.explorerReady);
      setContext(null);
    }catch(e){
      setStatus(String(e));
      sound('error');
    }
  }

  function openFile(f:VFile){
    if(f.kind==='folder'){navigate(f.path);return}
    if(f.path.toLowerCase().endsWith('.lnk')){
      if(f.content.startsWith('retro-game:')){
        const id=f.content.slice(11);
        if(id.startsWith('imported-')){
          write('activeCustomGameId',id);
          window.dispatchEvent(new Event('retro:custom-game'));
          window.dispatchEvent(new CustomEvent('retro:open-app',{detail:'dos-imported'}));
        } else {
          write('catalogSelected',id);
          window.dispatchEvent(new CustomEvent('retro:open-app',{detail:'gamecenter'}));
          window.dispatchEvent(new Event('retro:catalog-select'));
        }
        return;
      }
      if(f.content.startsWith('retro-app:')){
        const id=f.content.slice(10);
        window.dispatchEvent(new CustomEvent('retro:open-app',{detail:id}));
        return;
      }
    }
    window.dispatchEvent(new CustomEvent('retro:open-file',{detail:f}));
  }

  function clipboard(cut=false){
    if(!selected)return;
    write('clipboard',{path:selected,paths:selection.length?selection:[selected],cut});
    setStatus(cut?t.explorerCut:t.explorerCopy);
    setContext(null);
  }

  function paste(){
    const clip=read<{path:string;paths?:string[];cut:boolean}|null>('clipboard',null);
    if(!clip)throw Error('A área de transferência está vazia.');
    if(!path)throw Error('Abra uma unidade ou pasta de destino.');
    transferMany(clip.paths||[clip.path],path,clip.cut);
    if(clip.cut)write('clipboard',null);
  }

  function menuKey(e:KeyboardEvent<HTMLElement>){
    const target=e.target as HTMLElement,owner=target.closest('.explorer-menu-anchor'),trigger=owner?.querySelector<HTMLButtonElement>('button'),popup=target.closest('.explorer-menu-popup');
    if(e.key==='Escape'){e.preventDefault();e.stopPropagation();setMenu('');trigger?.focus();return}
    if(popup&&['ArrowDown','ArrowUp','Home','End'].includes(e.key)){
      e.preventDefault();
      const buttons=Array.from(popup.querySelectorAll<HTMLButtonElement>('button:not(:disabled)')),at=buttons.indexOf(document.activeElement as HTMLButtonElement);
      buttons[e.key==='Home'?0:e.key==='End'?buttons.length-1:(at+(e.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length]?.focus();
      return;
    }
    if(e.key==='ArrowDown'&&!popup&&trigger){
      e.preventDefault();
      setMenu(trigger.textContent||'');
      requestAnimationFrame(()=>owner?.querySelector<HTMLButtonElement>('.explorer-menu-popup button:not(:disabled)')?.focus());
      return;
    }
    if(['ArrowLeft','ArrowRight'].includes(e.key)){
      e.preventDefault();
      const owners=Array.from(e.currentTarget.querySelectorAll('.explorer-menu-anchor')),at=owners.indexOf(owner!);
      const next=owners[(at+(e.key==='ArrowRight'?1:-1)+owners.length)%owners.length];
      const button=next?.querySelector<HTMLButtonElement>('button');
      setMenu(button?.textContent||'');
      button?.focus();
    }
  }

  function openSelected(){
    if(['A:','C:','D:'].includes(selected))navigate(selected);
    else if(current)openFile(current);
  }

  const commands=(
    <>
      <button disabled={!selected} onClick={openSelected}>{t.explorerOpenInApp}</button>
      <button disabled={!current||current.kind==='folder'} onClick={()=>current&&setFile(current)}>{t.explorerViewFile}</button>
      <button disabled={!path} onClick={()=>{setName(t.explorerNewFolder);setDialog('Nova pasta')}}>{t.explorerNewFolder}</button>
      <button disabled={!selected} onClick={()=>{setName(selected.split('/').pop()!);setDialog('Renomear')}}>{t.explorerRename}</button>
      <button disabled={!selected} onClick={()=>clipboard()}>{t.explorerCopy}</button>
      <button disabled={!selected} onClick={()=>clipboard(true)}>{t.explorerCut}</button>
      <button disabled={!path} onClick={()=>action(paste)}>{t.explorerPaste}</button>
      <button disabled={!selected} onClick={()=>setDialog('Excluir')}>{t.explorerDelete}</button>
    </>
  );

  const menuHeaders = [
    {id: 'file', label: t.explorerFile},
    {id: 'edit', label: t.explorerEdit},
    {id: 'view', label: t.explorerView},
    {id: 'favorites', label: t.explorerFavorites},
    {id: 'tools', label: t.explorerTools},
    {id: 'help', label: t.explorerHelp}
  ];

  return (
    <div data-searching={searching} className="app-fill explorer-app" onClick={e=>{setContext(null);if(!(e.target as HTMLElement).closest('.explorer-menus'))setMenu('')}} onKeyDown={e=>{if((e.target as HTMLElement).matches('input,textarea,select')||(e.target as HTMLElement).closest('.explorer-menus,.toolbar,.file-context,.system-dialog'))return;if(e.altKey&&e.key==='ArrowUp'){e.preventDefault();navigate(path.includes('/')?path.slice(0,path.lastIndexOf('/')):'')}if(e.key==='F5'){e.preventDefault();navigate(path)}if(e.key==='Enter'&&selected){e.preventDefault();openSelected()}if(e.key==='Delete'&&selected)setDialog('Excluir');if(e.key==='F2'&&selected){setName(selected.split('/').pop()!);setDialog('Renomear')}if(e.ctrlKey&&['c','x','v'].includes(e.key)){e.preventDefault();if(e.key==='v')action(paste);else clipboard(e.key==='x')}}}>
      <nav className="menubar explorer-menus" onKeyDown={menuKey}>
        {menuHeaders.map(item=>(
          <div key={item.id} className="explorer-menu-anchor">
            <button aria-expanded={menu===item.id} onClick={()=>setMenu(menu===item.id?'':item.id)}>{item.label}</button>
            {menu===item.id&&<div className="explorer-menu-popup" role="menu" onClick={()=>setMenu('')}>
              {item.id==='file'?commands:item.id==='edit'?<><button disabled={!selected} onClick={()=>clipboard()}>{t.explorerCopy}</button><button disabled={!selected} onClick={()=>clipboard(true)}>{t.explorerCut}</button><button disabled={!path} onClick={()=>action(paste)}>{t.explorerPaste}</button></>:item.id==='view'?<><button onClick={()=>setView('icons')}>{t.explorerLargeIcons}</button><button onClick={()=>setView('list')}>{t.explorerDetails}</button><button onClick={()=>navigate(path)}>{t.explorerRefresh}</button></>:item.id==='favorites'?<button onClick={()=>navigate('C:/Meus Documentos')}>{t.appDocuments}</button>:item.id==='tools'?<button onClick={()=>setDialog('Propriedades')}>{t.explorerProperties}</button>:<p>Ctrl / Shift para selecionar. F2 renomeia; Del apaga.</p>}
            </div>}
          </div>
        ))}
      </nav>
      <nav className="toolbar explorer-toolbar">
        <button aria-label={t.explorerBack} disabled={cursor.current===0} onClick={()=>{cursor.current--;navigate(history.current[cursor.current],false)}}><ExplorerGlyph name="back"/><span>{t.explorerBack}</span></button>
        <button aria-label={t.explorerForward} disabled={cursor.current>=history.current.length-1} onClick={()=>{cursor.current++;navigate(history.current[cursor.current],false)}}><ExplorerGlyph name="forward"/><span>{t.explorerForward}</span></button>
        <button aria-label={t.explorerUp} onClick={()=>navigate(path.includes('/')?path.slice(0,path.lastIndexOf('/')):'')}><ExplorerGlyph name="up"/><span>{t.explorerUp}</span></button>
        <i className="toolbar-divider"/>
        <button aria-label={t.explorerSearch} aria-pressed={searching} onClick={()=>setSearching(!searching)}><ExplorerGlyph name="search"/><span>{t.explorerSearch}</span></button>
        <button aria-label={t.explorerFolders} aria-pressed={tree} onClick={()=>setTree(!tree)}><ExplorerGlyph name="folders"/><span>{t.explorerFolders}</span></button>
        <button aria-label={t.explorerProperties} onClick={()=>setDialog('Propriedades')}><ExplorerGlyph name="properties"/><span>{t.explorerProperties}</span></button>
        <button aria-label={t.explorerRefresh} onClick={()=>navigate(path)}><ExplorerGlyph name="refresh"/><span>{t.explorerRefresh}</span></button>
        <label>{t.explorerView} <select aria-label={t.explorerView} value={view} onChange={e=>setView(e.target.value)}><option value="icons">{t.explorerLargeIcons}</option><option value="list">{t.explorerDetails}</option></select></label>
      </nav>
      <div className="address">
        {t.explorerAddress} <input aria-label="Endereço virtual" key={path} defaultValue={path||t.appComputer} onKeyDown={e=>{if(e.key==='Enter'){const next=e.currentTarget.value.replaceAll('\\','/').replace(/\/$/,'');if(next===t.appComputer||next==='')navigate('');else if(['A:','C:','D:'].includes(next)||all.some(f=>f.path===next&&f.kind==='folder'))navigate(next);else setStatus('Pasta não encontrada')}}}/>
        <input aria-label="Pesquisar arquivos" placeholder={t.explorerSearch} value={query} onChange={e=>setQuery(e.target.value)}/>
        <select aria-label="Ordenar arquivos" value={sort} onChange={e=>setSort(e.target.value)}><option value="name">Nome</option><option value="modified">Modificado</option></select>
      </div>
      <div className="file-actions">{commands}</div>
      <div className="explorer-layout">
        <ExplorerSidebar theme={theme} path={path} current={current} all={all} tree={tree} navigate={navigate}/>
        {error?<div className="dialog-message"><h3>O disquete pediu um café.</h3><p>Leitura interrompida de brincadeira. Seus dados continuam seguros.</p><button onClick={()=>setError(false)}>Tentar novamente</button></div>:reading?<div className="disk-reading"><Icon name="floppy" size={44}/><p>{t.explorerReadingFloppy}</p><div className="dial-progress"><i/></div><small>Ruídos mecânicos e boas memórias.</small></div>:path==='D:'&&!read('cdInserted',true)?<div className="dialog-message"><Icon name="disc" size={48}/><h3>{t.explorerInsertCd}</h3><button onClick={()=>window.dispatchEvent(new CustomEvent('retro:open-app',{detail:'media'}))}>Central de Discos</button></div>:file?<article className="text-view"><h3>{file.path.split('/').pop()}</h3>{file.kind==='image'?<ImagePreview file={file}/>:<pre>{file.content}</pre>}<div className="file-association"><button onClick={()=>openFile(file)}>Abrir</button><button onClick={()=>setFile(null)}>Voltar à pasta</button></div></article>:<div onDragOver={e=>{if(path&&e.dataTransfer.types.includes('application/x-retro-files'))e.preventDefault()}} onDrop={e=>{e.preventDefault();action(()=>drop(e.dataTransfer,path,e.ctrlKey))}} className={'file-grid '+(view==='list'?'file-list':'')} onContextMenu={e=>{e.preventDefault();setContext({x:Math.min(e.clientX,innerWidth-190),y:Math.min(e.clientY,innerHeight-280)})}}>{!path?(theme==='xp'?<><section className="drive-section"><h3>{t.explorerStoredFiles}</h3><button onClick={()=>navigate('C:/Meus Documentos')}><Icon name="folder" size={32}/><span>{t.appDocuments}</span></button></section><section className="drive-section"><h3>{t.explorerHardDrives}</h3><button aria-label={t.explorerDiskC} key="C:" className={selected==='C:'?'file-selected':''} onClick={()=>{setSelected('C:');setSelection(['C:']);if(legacy)navigate('C:')}} onDoubleClick={()=>navigate('C:')}><Icon name="drive" size={32}/><span>{t.explorerDiskC}</span></button></section><section className="drive-section"><h3>{t.explorerRemovableStorage}</h3><button aria-label={t.explorerFloppyA} key="A:" className={selected==='A:'?'file-selected':''} onClick={()=>{setSelected('A:');setSelection(['A:']);if(legacy)navigate('A:')}} onDoubleClick={()=>navigate('A:')}><Icon name="floppy" size={32}/><span>{t.explorerFloppyA}</span></button><button aria-label={t.explorerCdD} key="D:" className={selected==='D:'?'file-selected':''} onClick={()=>{setSelected('D:');setSelection(['D:']);if(legacy)navigate('D:')}} onDoubleClick={()=>navigate('D:')}><Icon name="disc" size={32}/><span>{t.explorerCdD}</span></button></section></>:<><button aria-label={t.explorerFloppyA} key="A:" className={selected==='A:'?'file-selected':''} onClick={()=>{setSelected('A:');setSelection(['A:']);if(legacy)navigate('A:')}} onDoubleClick={()=>navigate('A:')}><Icon name="floppy" size={32}/><span>{t.explorerFloppyA}</span></button><button aria-label={t.explorerDiskC} key="C:" className={selected==='C:'?'file-selected':''} onClick={()=>{setSelected('C:');setSelection(['C:']);if(legacy)navigate('C:')}} onDoubleClick={()=>navigate('C:')}><Icon name="drive" size={32}/><span>{t.explorerDiskC}</span></button><button aria-label={t.explorerCdD} key="D:" className={selected==='D:'?'file-selected':''} onClick={()=>{setSelected('D:');setSelection(['D:']);if(legacy)navigate('D:')}} onDoubleClick={()=>navigate('D:')}><Icon name="disc" size={32}/><span>{t.explorerCdD}</span></button><button onClick={()=>window.dispatchEvent(new CustomEvent('retro:open-app',{detail:'settings'}))}><Icon name="settings" size={32}/><span>{t.appSettings}</span></button>{theme==='classic'&&<button onClick={()=>window.dispatchEvent(new CustomEvent('retro:open-app',{detail:'dialup'}))}><Icon name="globe" size={32}/><span>{t.dialupConnections}</span></button>}</>):children.map(f=><button key={f.path} draggable className={selection.includes(f.path)?'file-selected':''} onDragStart={e=>{e.dataTransfer.setData('application/x-retro-files',JSON.stringify(selection.includes(f.path)?selection:[f.path]));e.dataTransfer.effectAllowed='copyMove'}} onDragOver={e=>{if(f.kind==='folder')e.preventDefault()}} onDrop={e=>{if(f.kind!=='folder')return;e.preventDefault();e.stopPropagation();action(()=>drop(e.dataTransfer,f.path,e.ctrlKey))}} onContextMenu={()=>{setSelected(f.path);setSelection(old=>old.includes(f.path)?old:[f.path]);setFile(null)}} onClick={e=>{setSelected(f.path);if(e.ctrlKey||e.metaKey){setFile(null);const next=selection.includes(f.path)?selection.filter(p=>p!==f.path):[...selection,f.path];setSelection(next);setSelected(next.at(-1)||'');anchor.current=f.path;return}if(e.shiftKey){setFile(null);const a=children.findIndex(i=>i.path===anchor.current),b=children.findIndex(i=>i.path===f.path);setSelection(children.slice(Math.max(0,Math.min(a,b)),Math.max(a,b)+1).map(i=>i.path));return}anchor.current=f.path;setSelection([f.path]);if(legacy){if(f.kind==='folder')navigate(f.path);else if(!f.path.toLowerCase().endsWith('.lnk'))setFile(f)}else setFile(null)}} onDoubleClick={()=>openFile(f)}><Icon name={f.kind==='folder'?'folder':f.kind==='image'?'paint':'note'} size={32}/><span>{f.path.split('/').pop()}</span>{view==='list'&&<small>{f.kind==='folder'?'Pasta':f.kind==='image'?'Imagem':'Documento de texto'} · {f.modified.slice(0,10)}</small>}</button>)}</div>}
      </div>
      <footer className="statusbar" role="status">
        {path?children.length:theme==='classic'?5:4} {t.explorerItems} · {status} · {selection.length} {t.explorerSelected}
      </footer>
      {context&&<div className="file-context" role="menu" style={{position:'fixed',left:context.x,top:context.y}} onClick={e=>e.stopPropagation()}>{commands}<hr/><button onClick={()=>{setDialog('Propriedades');setContext(null)}}>{t.explorerProperties}</button></div>}
      {dialog&&<Dialog title={dialog} onCancel={()=>setDialog('')} onConfirm={()=>{if(dialog==='Propriedades'){setDialog('');return}try{if(dialog==='Nova pasta')createFolder(path,name);if(dialog==='Renomear'){renameFile(selected,name);setFile(null);setSelected('')}if(dialog==='Excluir'){deleteMany(selection.length?selection:[selected]);setSelection([]);setFile(null);setSelected('');sound('trash')}setDialog('');setStatus('Operação concluída.')}catch(e){setStatus(String(e));sound('error')}}}>{dialog==='Propriedades'?<dl className="file-properties"><dt>Nome:</dt><dd>{current?.path||selected||path||t.appComputer}</dd><dt>Tipo:</dt><dd>{current?.kind||'Unidade virtual'}</dd><dt>Tamanho:</dt><dd>{current?.kind==='folder'?'Pasta':(current?.content.length||0)+' caracteres'}</dd><dt>Local:</dt><dd>Armazenamento virtual local</dd><dt>Modificado:</dt><dd>{current?.modified||'—'}</dd></dl>:dialog==='Excluir'?<p>Mover <b>{selection.length>1?selection.length+' itens selecionados':selected.split('/').pop()}</b> para a Lixeira?</p>:<label>Nome: <input aria-label="Nome do item" maxLength={100} value={name} onChange={e=>setName(e.target.value)}/></label>}</Dialog>}
    </div>
  );
}
