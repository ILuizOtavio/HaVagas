const Database = require('better-sqlite3');
const db = new Database('database.sqlite');

console.log('=== USUÁRIOS ===');
const usuarios = db.prepare('SELECT id, nome, email FROM usuarios').all();
usuarios.forEach(u => console.log(`${u.id} - ${u.nome} (${u.email})`));

console.log('\n=== ESPAÇOS ===');
const espacos = db.prepare('SELECT id, nome, tipo, coworking_id FROM espacos LIMIT 5').all();
espacos.forEach(e => console.log(`${e.id} - ${e.nome} (${e.tipo}) - Coworking: ${e.coworking_id}`));

console.log('\n=== RESERVAS ===');
const reservas = db.prepare('SELECT id, usuario_id, espaco_id, status FROM reservas').all();
reservas.forEach(r => console.log(`${r.id} - User: ${r.usuario_id}, Espaço: ${r.espaco_id}, Status: ${r.status}`));

db.close();
