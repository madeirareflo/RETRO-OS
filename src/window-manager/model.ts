export type Rect={x:number;y:number;w:number;h:number};
/** Align classic window borders to whole CSS pixels while keeping the caption reachable. */
export function clampRect(r:Rect,width:number,height:number):Rect{const w=Math.min(Math.max(280,Math.round(r.w)),width),h=Math.min(Math.max(180,Math.round(r.h)),height);return {w,h,x:Math.round(Math.max(0,Math.min(r.x,width-w))),y:Math.round(Math.max(0,Math.min(r.y,height-h)))}}
