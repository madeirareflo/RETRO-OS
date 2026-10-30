export const registry=[
{id:'computer',name:'Meu Computador',icon:'computer',group:'Acessórios'},
{id:'documents',name:'Meus Documentos',icon:'folder',group:'Documentos'},
{id:'floppy',name:'Disquete A:',icon:'floppy',group:'Acessórios'},
{id:'internet',name:'Internet',icon:'globe',group:'Programas'},
{id:'games',name:'Jogos',icon:'games',group:'Jogos'},
{id:'paint',name:'Paint',icon:'paint',group:'Acessórios'},
{id:'notepad',name:'Bloco de Notas',icon:'note',group:'Acessórios'},
{id:'player',name:'Toca-MP3',icon:'music',group:'Programas'},
{id:'chat',name:'Bate-Papo',icon:'chat',group:'Programas'},
{id:'trash',name:'Lixeira',icon:'trash',group:'Acessórios'},
{id:'settings',name:'Painel de Controle',icon:'settings',group:'Configurações'},
{id:'about',name:'Sobre o RETRO OS',icon:'disc',group:'Ajuda'},
{id:'calculator',name:'Calculadora',icon:'calculator',group:'Acessórios'},
{id:'terminal',name:'Terminal',icon:'terminal',group:'Acessórios'},
{id:'mines',name:'Campo Minado',icon:'mine',group:'Jogos'},
{id:'snake',name:'Snake',icon:'snake',group:'Jogos'},
{id:'solitaire',name:'Paciência',icon:'cards',group:'Jogos'},
{id:'run',name:'Executar',icon:'terminal',group:'Programas'}
] as const;
export type AppId=typeof registry[number]['id'];
export const appInfo=(id:AppId)=>registry.find(a=>a.id===id)!;
