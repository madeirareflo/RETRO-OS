import {useState} from 'react';

export function calculate(a:number,b:number,op:string){
  return op==='+'?a+b:op==='−'?a-b:op==='×'?a*b:b===0?NaN:a/b;
}

export function Calculator(){
  const [display,setDisplay]=useState('0');
  const [left,setLeft]=useState<number|null>(null);
  const [op,setOp]=useState('');
  const [fresh,setFresh]=useState(false);
  const [memory,setMemory]=useState<number>(0);
  const [hasMemory,setHasMemory]=useState(false);

  function key(k:string){
    // Clear
    if(k==='C'||k==='Escape'){
      setDisplay('0');
      setLeft(null);
      setOp('');
      setFresh(false);
      return;
    }
    // Clear Entry
    if(k==='CE'){
      setDisplay('0');
      setFresh(false);
      return;
    }
    // Backspace
    if(k==='Backspace'){
      setDisplay(display.length>1?display.slice(0,-1):'0');
      return;
    }
    // Memory keys
    if(k==='MC'){
      setMemory(0);
      setHasMemory(false);
      return;
    }
    if(k==='MR'){
      setDisplay(String(memory));
      setFresh(true);
      return;
    }
    if(k==='MS'){
      const val=Number(display)||0;
      setMemory(val);
      setHasMemory(val!==0);
      setFresh(true);
      return;
    }
    if(k==='M+'){
      const val=memory+(Number(display)||0);
      setMemory(val);
      setHasMemory(val!==0);
      setFresh(true);
      return;
    }
    // Digits and comma/dot
    if(/^[0-9.]$/.test(k)){
      setDisplay(fresh||display==='0'?(k==='.'?'0.':k):display.includes('.')&&k==='.'?display:display+k);
      setFresh(false);
      return;
    }
    // Math operations
    if(['+','−','×','÷'].includes(k)){
      const n=left!==null&&op&&!fresh?calculate(left,Number(display),op):Number(display);
      setDisplay(String(n));
      setLeft(n);
      setOp(k);
      setFresh(true);
      return;
    }
    // Equals
    if(k==='='||k==='Enter'){
      if(left!==null&&op){
        const n=calculate(left,Number(display),op);
        setDisplay(Number.isFinite(n)?String(Number(n.toPrecision(12))):'Erro');
        setLeft(null);
        setOp('');
        setFresh(true);
      }
    }
  }

  return (
    <div className="calculator" tabIndex={0} onKeyDown={e=>{
      const k=({'-':'−','*':'×','/':'÷',',':'.'} as Record<string,string>)[e.key]||e.key;
      if(/^[0-9.]$/.test(k)||['C','CE','Escape','Backspace','Enter','+','−','×','÷','=','MC','MR','MS','M+'].includes(k)){
        e.preventDefault();
        key(k);
      }
    }}>
      <div className="calc-header-bar">
        <span className="calc-title-mode">Padrão</span>
        <span className="calc-memory-indicator" aria-label="Indicador de memória">{hasMemory?'M':''}</span>
      </div>
      <output aria-label="Resultado">{display}</output>
      <div className="calc-memory-row">
        {['MC','MR','MS','M+'].map(m=>
          <button key={m} className="calc-btn-mem" onClick={()=>key(m)}>{m}</button>
        )}
      </div>
      <div className="calc-keys">
        {['Backspace','CE','C','÷','7','8','9','×','4','5','6','−','1','2','3','+','0','±','.','='].map(k=>{
          if(k==='±'){
            return <button key={k} onClick={()=>{
              const val=Number(display);
              if(!isNaN(val))setDisplay(String(-val));
            }}>±</button>;
          }
          return <button key={k} onClick={()=>key(k)}>{k==='Backspace'?'←':k}</button>;
        })}
      </div>
    </div>
  );
}
