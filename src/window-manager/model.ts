export type Rect={x:number;y:number;w:number;h:number};
export function clampRect(r:Rect,width:number,height:number):Rect{const w=Math.min(Math.max(280,r.w),width),h=Math.min(Math.max(180,r.h),height);return {w,h,x:Math.max(0,Math.min(r.x,width-w)),y:Math.max(0,Math.min(r.y,height-h))}}
