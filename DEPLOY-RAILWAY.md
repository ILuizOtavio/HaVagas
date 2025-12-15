# 🚂 Deploy no Railway - Passo a Passo

## Por que Railway?
✅ Melhor para NestJS (não é serverless)
✅ SQLite funciona perfeitamente
✅ Mais simples que Vercel para backend
✅ $5 de crédito grátis por mês

---

## 📋 PASSO 1: Criar conta no Railway

1. Acesse: **https://railway.app**
2. Clique em **"Login"** ou **"Start a New Project"**
3. Escolha **"Login with GitHub"**
4. Autorize o Railway

---

## 📋 PASSO 2: Fazer commit das alterações

```bash
cd C:\Projetos\HaVagas
git add .
git commit -m "Configurado para deploy no Railway"
git push origin correcoes
```

---

## 📋 PASSO 3: Deploy do BACKEND

### 3.1 - Criar projeto
1. No Railway, clique em **"New Project"**
2. Escolha **"Deploy from GitHub repo"**
3. Selecione o repositório **"HaVagas"**
4. Railway detectará automaticamente

### 3.2 - Configurar o serviço
1. Clique no serviço criado
2. Vá em **"Settings"**
3. Em **"Root Directory"**, digite: `backend`
4. Em **"Start Command"**, deixe: `npm run start:prod`
5. Em **"Build Command"**, deixe: `npm run build`

### 3.3 - Variáveis de Ambiente
1. Vá na aba **"Variables"**
2. Adicione:
   ```
   DB_DATABASE=database.sqlite
   PORT=3001
   ```

### 3.4 - Deploy
1. Clique em **"Deploy"**
2. Aguarde o build (2-3 minutos)
3. Após o deploy, vá em **"Settings"**
4. Em **"Networking"**, clique em **"Generate Domain"**
5. **Copie a URL gerada** (ex: `https://havagas-backend-production.up.railway.app`)

### 3.5 - Popular o banco (IMPORTANTE!)
1. No Railway, vá na aba **"Data"** ou clique no serviço
2. Abra o **"Terminal"** (ícone de terminal no canto superior)
3. Execute:
   ```bash
   npm run seed
   ```
4. Você verá: "✨ Seed concluído com sucesso!"

---

## 📋 PASSO 4: Deploy do FRONTEND (Vercel)

O frontend continua no Vercel (é perfeito para Next.js):

### 4.1 - Atualizar variável de ambiente
1. No Vercel, vá no projeto do **frontend**
2. Vá em **"Settings"** → **"Environment Variables"**
3. **Edite** `NEXT_PUBLIC_API_URL` com a URL do Railway:
   ```
   NEXT_PUBLIC_API_URL=https://havagas-backend-production.up.railway.app
   ```

### 4.2 - Redeploy
1. Vá em **"Deployments"**
2. Clique nos 3 pontinhos do último deploy
3. Clique em **"Redeploy"**
4. Aguarde 2-3 minutos

---

## 📋 PASSO 5: Testar

1. **Backend:** `https://sua-url.railway.app/api` → Swagger
2. **Frontend:** `https://seu-frontend.vercel.app` → Sistema funcionando
3. **Login:** `joao@email.com` / `123456`

---

## 🎉 Pronto!

Agora você tem:
- ✅ Backend no Railway (melhor para NestJS)
- ✅ Frontend no Vercel (melhor para Next.js)
- ✅ Banco SQLite funcionando perfeitamente
- ✅ Seed executado com dados reais

---

## 🔄 Atualizações futuras

Sempre que fizer alterações:
```bash
git push origin correcoes
```

Railway redeploy automaticamente! 🚀

---

## 💡 Dicas

- **Logs em tempo real:** Railway > Aba "Logs"
- **Terminal:** Railway > Ícone de terminal
- **Redeployar:** Railway > Settings > Redeploy
- **Créditos:** $5/mês grátis (suficiente para testes)
