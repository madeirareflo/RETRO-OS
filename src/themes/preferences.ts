import type {Preferences} from '../core/contracts';
/** Explicit wallpaper values (restoration/import) take precedence over theme defaults. */
export function mergePreferences(previous:Preferences,patch:Partial<Preferences>):Preferences{
 const next={...previous,...patch};
 if(patch.wallpaper===undefined&&patch.theme&&patch.theme!==previous.theme){
  if(patch.theme==='classic'||patch.theme==='win2000')next.wallpaper='teal';
  else if(previous.theme==='classic'||previous.theme==='win2000')next.wallpaper='hills';
 }
 return next;
}
