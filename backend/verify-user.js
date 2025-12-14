const Database = require('better-sqlite3');
const db = new Database('database.sqlite');

// Pegar o ID do argumento da linha de comando
const usuarioId = process.argv[2];

if (!usuarioId) {
  console.log('❌ Uso: node verify-user.js <usuarioId>');
  console.log('\n📋 Usuários válidos no banco:');
  const usuarios = db.prepare('SELECT id, nome, email FROM usuarios').all();
  usuarios.forEach(u => console.log(`   - ${u.id} (${u.nome} - ${u.email})`));
  process.exit(1);
}

console.log(`🔍 Verificando usuário: ${usuarioId}`);

const usuario = db.prepare('SELECT id, nome, email FROM usuarios WHERE id = ?').get(usuarioId);

if (usuario) {
  console.log('✅ Usuário EXISTE no banco!');
  console.log(`   Nome: ${usuario.nome}`);
  console.log(`   Email: ${usuario.email}`);
} else {
  console.log('❌ Usuário NÃO EXISTE no banco!');
  console.log('\n📋 Usuários disponíveis:');
  const usuarios = db.prepare('SELECT id, nome, email FROM usuarios').all();
  usuarios.forEach(u => console.log(`   - ${u.id} (${u.nome} - ${u.email})`));
}

db.close();
