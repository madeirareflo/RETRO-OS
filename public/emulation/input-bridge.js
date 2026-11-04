/* Original RETRO OS input bridge. Scoped to this emulator iframe. */
(() => {
 window.RetroDosInput = function ({canvas,display,diagnostics,getCI,getPayload,focus,report}) {
  const keys=new Set(),buttons=new Set(),listeners=[];let pending=false;
  const listen=(target,type,fn,options)=>{const opts=typeof options==='boolean'?{capture:options}:options;target.addEventListener(type,fn,opts);listeners.push(()=>target.removeEventListener(type,fn,opts))};
  function release(exitLock=true){
   for(const code of keys)getCI()?.simulateKeyEvent?.(code,false);keys.clear();diagnostics.pressedKeys=[];
   for(const button of buttons)canvas.dispatchEvent(new MouseEvent('mouseup',{bubbles:true,button,buttons:0}));buttons.clear();diagnostics.mouseButtons=[];diagnostics.keyReleaseCount++;
   if(exitLock&&document.pointerLockElement===canvas)document.exitPointerLock?.();
  }
  listen(window,'pointerdown',event=>{if(event.target!==display&&event.target!==canvas)return;focus();report('focused');if(pending&&canvas.requestPointerLock){try{const promise=canvas.requestPointerLock();promise?.catch?.(()=>report('mouse-error',{message:'Captura não autorizada; tente um novo clique na tela.'}))}catch{report('mouse-error',{message:'Captura de mouse indisponível neste navegador.'})}}});
  listen(display,'focus',focus);listen(canvas,'blur',()=>release());listen(window,'blur',()=>release());
  listen(window,'keydown',event=>{
   if(event.key==='Escape'&&(event.shiftKey||getPayload()?.escapeToDesktop!==false)){event.preventDefault();event.stopImmediatePropagation();release();canvas.blur();report('released');return}
   if(!getCI()||document.activeElement!==canvas)return;
   keys.add(event.keyCode);diagnostics.pressedKeys=[...keys];diagnostics.keyDownCount++;
   if(!(event.altKey&&event.key==='Tab')&&(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' ','Tab'].includes(event.key)||/^F(?:[1-9]|10|12)$/.test(event.key)||event.ctrlKey&&['a','k'].includes(event.key.toLowerCase())))event.preventDefault();
  },true);
  listen(window,'keyup',event=>{keys.delete(event.keyCode);diagnostics.pressedKeys=[...keys];diagnostics.keyUpCount++},true);
  for(const type of ['mousemove','mousedown','mouseup'])listen(window,type,event=>{
   if(event.target!==display||!getCI()||document.activeElement!==canvas)return;
   event.preventDefault();event.stopImmediatePropagation();
   const rect=display.getBoundingClientRect(),engine=canvas.getBoundingClientRect(),w=Math.min(rect.width,rect.height*canvas.width/canvas.height),h=w*canvas.height/canvas.width;
   const x=Math.max(0,Math.min(1,(event.clientX-rect.left-(rect.width-w)/2)/w)),y=Math.max(0,Math.min(1,(event.clientY-rect.top-(rect.height-h)/2)/h));
   canvas.dispatchEvent(new MouseEvent(type,{bubbles:true,cancelable:true,clientX:engine.left+x*engine.width,clientY:engine.top+y*engine.height,button:event.button,buttons:event.buttons,shiftKey:event.shiftKey,ctrlKey:event.ctrlKey,altKey:event.altKey}));
  },true);
  listen(canvas,'mousedown',event=>{buttons.add(event.button);diagnostics.mouseButtons=[...buttons];diagnostics.mouseDownCount=(diagnostics.mouseDownCount||0)+1});
  listen(window,'mouseup',event=>{buttons.delete(event.button);diagnostics.mouseButtons=[...buttons]});
  listen(canvas,'mousemove',()=>{diagnostics.mouseMoveCount=(diagnostics.mouseMoveCount||0)+1});
  listen(document,'pointerlockchange',()=>{diagnostics.mouseLocked=document.pointerLockElement===canvas;if(diagnostics.mouseLocked){pending=false;diagnostics.mouseCapturePending=false;report('mouse-captured')}else{release(false);report('mouse-released')}});
  listen(document,'pointerlockerror',()=>report('mouse-error',{message:'O navegador recusou a captura de mouse.'}));
  return {release,arm(){pending=true;diagnostics.mouseCapturePending=true;report('mouse-pending')},dispose(){release();listeners.forEach(remove=>remove())}};
 };
})();
