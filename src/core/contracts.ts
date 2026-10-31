// Async boundaries for a future authenticated adapter. No network requests in v001.
export interface Profile {id:string;displayName:string;avatar?:string}
export interface SocialAdapter {profile():Promise<Profile|null>;friends():Promise<Profile[]>;sendMessage(to:string,text:string):Promise<void>;leaderboard(game:string):Promise<{user:Profile;score:number}[]>;shareDrawing(blob:Blob):Promise<string>}
export type Theme='mix'|'xp'|'classic';
export type Preferences={theme:Theme;wallpaper:string;muted:boolean;volume:number;boot:boolean;xpColor:string;era?:number;saver?:string;idleMinutes?:number;saverText?:string;appMuted?:boolean;appVolume?:number};
