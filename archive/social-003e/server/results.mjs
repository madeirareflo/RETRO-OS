export function initResults(db){db.exec(`CREATE TABLE IF NOT EXISTS results(kind TEXT,game INTEGER,a TEXT,b TEXT,winner TEXT,ended INTEGER,abandoned INTEGER,eligible INTEGER,PRIMARY KEY(kind,game));`)}
export function recordResult(db,kind,g,winner,abandoned=false){const ended=Date.now();const moves=kind==='velha'?g.board.replaceAll(' ','').length:db.prepare('SELECT COUNT(*) n FROM shots WHERE game=?').get(g.id).n;const eligible=!abandoned&&moves>=5&&!db.prepare('SELECT 1 FROM results WHERE kind=? AND ((a=? AND b=?) OR (a=? AND b=?)) AND ended>? AND eligible=1').get(kind,g.a,g.b,g.b,g.a,ended-86400000);db.prepare('INSERT OR IGNORE INTO results VALUES(?,?,?,?,?,?,?,?)').run(kind,g.id,g.a,g.b,winner,ended,abandoned?1:0,eligible?1:0)}
export function rankings(db,uid,query){
  const kind=query.get('game')||'velha',week=query.get('period')==='week';
  if(!['velha','naval'].includes(kind))return {status:400,body:{error:'Jogo inválido'}};
  const now=new Date(),day=(now.getUTCDay()+6)%7;
  now.setUTCDate(now.getUTCDate()-day);now.setUTCHours(0,0,0,0);
  const since=week?now.getTime():0;
  // Aggregate the complete eligible ledger; only the displayed leaderboard is capped.
  const ranking=db.prepare(`SELECT u.id,u.name,
    SUM(CASE WHEN r.winner=u.id THEN 1 ELSE 0 END) wins,
    SUM(CASE WHEN r.winner<>u.id AND r.winner<>'draw' THEN 1 ELSE 0 END) losses,
    SUM(CASE WHEN r.winner='draw' THEN 1 ELSE 0 END) draws,
    SUM(CASE WHEN r.winner=u.id THEN 3 WHEN r.winner='draw' THEN 1 ELSE 0 END) points
    FROM (SELECT a user,winner FROM results WHERE kind=? AND ended>=? AND eligible=1
      UNION ALL SELECT b user,winner FROM results WHERE kind=? AND ended>=? AND eligible=1) r
    JOIN users u ON u.id=r.user GROUP BY u.id ORDER BY points DESC,u.name COLLATE NOCASE LIMIT 100`).all(kind,since,kind,since);
  const history=db.prepare('SELECT * FROM results WHERE kind=? AND ended>=? AND (a=? OR b=?) ORDER BY ended DESC,game DESC LIMIT 100').all(kind,since,uid,uid);
  return {status:200,body:{game:kind,period:week?'week':'all',since,ranking,history,policy:'Resultado do servidor; uma partida pontuável por dupla/jogo a cada 24h. Abandonos não pontuam. Sem proteção contra múltiplas contas.'}};
}
