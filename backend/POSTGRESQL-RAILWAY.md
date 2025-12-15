# 🐘 PostgreSQL no Railway - Guia Rápido

## 🎯 Configuração (5 minutos)

### 1️⃣ Adicionar PostgreSQL no Railway

1. Acesse seu projeto no [Railway](https://railway.app)
2. Clique em **"+ New"** (no projeto)
3. Selecione **"Database"** → **"Add PostgreSQL"**
4. Aguarde a criação (30 segundos)

### 2️⃣ Conectar ao Backend

1. Clique no serviço do **backend** (havagas)
2. Vá em **"Variables"**
3. Clique em **"+ New Variable"** → **"Add Reference"**
4. Selecione **"DATABASE_URL"** do PostgreSQL
5. Clique em **"Add"**

✅ Pronto! O Railway automaticamente conecta os serviços.

### 3️⃣ Remover Build Command Antiga

1. No serviço do backend, vá em **"Settings"**
2. Na seção **"Build"**, encontre **"Custom Build Command"**
3. **DELETE** o comando `npm run build && npm run seed`
4. Deixe em branco (ou apenas `npm run build`)
5. Clique em **"Deploy"** ou faça push no GitHub

### 4️⃣ Verificar Logs

Após o deploy, nos logs você verá:

```
🐘 Conectando ao PostgreSQL (Railway)
🌱 Banco de dados vazio. Executando seed...
✨ Seed concluído com sucesso!
📊 Resumo:
   - 3 usuários
   - 5 coworkings
   - 14 espaços
   - 3 reservas
```

## 🔧 Como Funciona

### Detecção Automática
```typescript
// Produção com DATABASE_URL → PostgreSQL
if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
  // Usa PostgreSQL
}

// Desenvolvimento local → SQLite
else {
  // Usa database.sqlite
}
```

### Seed Automático
- Executa **uma vez** quando banco está vazio
- Em novos deploys, detecta dados existentes e não executa novamente
- Seguro para redeploys

## ✅ Vantagens do PostgreSQL

✅ Dados persistem automaticamente  
✅ Sem configuração de volumes  
✅ Backups automáticos no Railway  
✅ Melhor performance para produção  
✅ Suporta conexões simultâneas  
✅ Grátis no Railway  

## 🔍 Verificar Funcionamento

1. **API Swagger**: `https://seu-app.railway.app/api`
2. **Teste de usuários**: GET `/usuarios`
3. **Teste de coworkings**: GET `/coworkings`

Deve retornar os 3 usuários e 5 coworkings do seed!

## 🗄️ Acessar o Banco (Opcional)

Para conectar diretamente ao PostgreSQL:

1. No serviço PostgreSQL, vá em **"Variables"**
2. Copie as credenciais:
   - `PGHOST`
   - `PGPORT`
   - `PGUSER`
   - `PGPASSWORD`
   - `PGDATABASE`

3. Use um cliente como **DBeaver**, **pgAdmin**, ou **TablePlus**

## 📝 Dados do Seed

**Usuários** (senha: 123456):
- joao@email.com
- maria@email.com
- pedro@email.com

**Coworkings de Aracaju**:
- CAJUHUB
- Hub Unit
- StartSE Coworking
- Espaço Colabore
- WorkHub Sergipe

## 🚨 Troubleshooting

### Banco ainda vazio após deploy?
- Verifique se a variável `DATABASE_URL` está configurada
- Olhe os logs: deve aparecer "🐘 Conectando ao PostgreSQL"
- Se aparecer "📁 SQLite local", a variável não foi detectada

### Erro de conexão SSL?
- Já configurado no código: `ssl: { rejectUnauthorized: false }`
- Railway usa SSL por padrão

### Quer resetar os dados?
1. No serviço PostgreSQL: **"Data"** → **"Query"**
2. Execute: `DROP SCHEMA public CASCADE; CREATE SCHEMA public;`
3. Faça redeploy do backend

## 🔗 Próximo Passo

Após configurar, deploy seu frontend no Vercel com:
```env
NEXT_PUBLIC_API_URL=https://seu-backend.railway.app
```

---

✨ **Configurou? Faça um teste!** Acesse `/api` e teste os endpoints!
