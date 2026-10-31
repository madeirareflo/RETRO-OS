import {DatabaseSync} from 'node:sqlite';
import {initGovernance} from './governance.mjs';
// Local operator only. No HTTP endpoint grants roles.
const [action,name]=process.argv.slice(2);if(!['grant','revoke'].includes(action)||!name)throw Error('Uso: node server/admin.mjs grant|revoke apelido');const db=new DatabaseSync(process.env.RETRO_DATABASE||'server/data/social.sqlite');initGovernance(db);const user=db.prepare('SELECT id FROM users WHERE name=?').get(name.toLowerCase());if(!user)throw Error('Conta inexistente');if(action==='grant')db.prepare("INSERT INTO roles VALUES(?,'admin') ON CONFLICT(user) DO UPDATE SET role='admin'").run(user.id);else db.prepare('DELETE FROM roles WHERE user=?').run(user.id);console.log('Papel administrativo atualizado localmente.');db.close();
