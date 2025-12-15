# Configuração de Volume Persistente no Railway

## 🎯 Objetivo
Manter o banco de dados SQLite persistente entre deployments no Railway usando volumes.

## 📋 Passos de Configuração

### 1️⃣ Acessar o Projeto no Railway
1. Acesse [railway.app](https://railway.app)
2. Entre no projeto "vigilant-recreation"
3. Clique no serviço "havagas"

### 2️⃣ Criar Volume Persistente
1. Na aba do serviço, clique em **"Settings"** (⚙️)
2. Role até a seção **"Volumes"**
3. Clique em **"+ New Volume"**
4. Configure o volume:
   - **Mount Path**: `/data`
   - **Name**: `database-volume` (ou qualquer nome)
   - **Size**: 1GB (suficiente para SQLite)
5. Clique em **"Add"**

### 3️⃣ Atualizar Build Command
Na seção **"Deploy"** > **"Build Command"**, alterar de:
```bash
npm run build && npm run seed
```

Para (remover o seed do build):
```bash
npm run build
```

**IMPORTANTE**: O seed agora é executado automaticamente no startup da aplicação!

### 4️⃣ Deploy
1. Na aba **"Deployments"**, clique em **"Deploy"**
2. Aguarde o build e deploy completarem
3. Verifique os logs - deve aparecer:
   ```
   📁 Caminho do banco de dados: /data/database.sqlite
   🌱 Banco de dados vazio. Executando seed...
   ✨ Seed concluído com sucesso!
   ```

### 5️⃣ Verificar Persistência
1. Teste a API: `https://havagas-production.up.railway.app/api`
2. Faça um novo deploy (qualquer commit)
3. Verifique que os dados continuam lá!

## 🔧 Como Funciona

### Caminho do Banco
```typescript
// Em produção (Railway)
/data/database.sqlite  // Volume persistente

// Em desenvolvimento (local)
database.sqlite  // Arquivo local
```

### Seed Automático
O seed é executado **uma única vez** quando:
- O banco está vazio (primeira execução)
- O volume foi recriado

Em deploys subsequentes, o seed detecta que já existem dados e não executa novamente.

### Logs para Monitorar
```bash
✅ Banco de dados já possui dados  # Seed não executado
🌱 Banco de dados vazio. Executando seed...  # Seed executado
```

## ⚠️ Importante

1. **Não excluir o volume**: Se excluir, todos os dados serão perdidos
2. **Backup**: Railway faz backup automático, mas você pode fazer manual via dump
3. **Monitoramento**: Use a aba "Logs" para verificar o funcionamento
4. **Tamanho**: SQLite é eficiente, 1GB é mais que suficiente

## 🚀 Vantagens do Volume Persistente

✅ Dados persistem entre deployments  
✅ Não precisa executar seed no build  
✅ Performance melhor (sem recriar dados)  
✅ Simples de configurar  
✅ Sem custo adicional no Railway  

## 📊 Estrutura de Dados

Após o primeiro deploy, o volume terá:
- 3 usuários (senha: 123456)
- 5 coworkings de Aracaju
- 14 espaços (salas, auditórios, mesas)
- 3 reservas de exemplo

## 🔗 Recursos

- [Railway Volumes Documentation](https://docs.railway.app/deploy/volumes)
- [SQLite with Railway](https://docs.railway.app/databases/sqlite)
