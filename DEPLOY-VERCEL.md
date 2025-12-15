# 🚀 GUIA COMPLETO DE DEPLOY NO VERCEL

## 📋 PASSO 1: Fazer commit e push das alterações

Primeiro, vamos subir as alterações para o GitHub:

```bash
# Na pasta raiz do projeto (C:\Projetos\HaVagas)
git add .
git commit -m "Preparado para deploy no Vercel"
git push origin correcoes
```

## 📋 PASSO 2: Criar conta no Vercel

1. Acesse: https://vercel.com
2. Clique em **"Sign Up"**
3. Escolha **"Continue with GitHub"**
4. Autorize o Vercel a acessar seus repositórios

## 📋 PASSO 3: Deploy do BACKEND

### 3.1 - Importar projeto
1. No dashboard do Vercel, clique em **"Add New..."** → **"Project"**
2. Encontre o repositório **"HaVagas"** e clique em **"Import"**

### 3.2 - Configurar o Backend
1. **Project Name:** `havagas-backend` (ou qualquer nome)
2. **Framework Preset:** Other
3. **Root Directory:** Clique em **"Edit"** e selecione **"backend"**
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist`
6. **Install Command:** `npm install`

### 3.3 - Variáveis de Ambiente (Environment Variables)
Clique em **"Environment Variables"** e adicione:

```
DB_DATABASE = database.sqlite
PORT = 3001
```

### 3.4 - Deploy
1. Clique em **"Deploy"**
2. Aguarde o build terminar (2-5 minutos)
3. **Copie a URL gerada** (ex: `https://havagas-backend.vercel.app`)

### ⚠️ IMPORTANTE após o primeiro deploy do backend:
O banco SQLite precisa ser populado. Você tem 2 opções:

**Opção A - Executar seed manualmente (recomendado):**
1. Na página do projeto no Vercel, vá em **Settings** → **Functions**
2. Ou use a Vercel CLI: `vercel --prod` e depois execute o seed

**Opção B - Usar banco persistente (PostgreSQL na Vercel):**
- Melhor para produção, mas requer configuração adicional

## 📋 PASSO 4: Deploy do FRONTEND

### 4.1 - Importar projeto novamente
1. Volte ao dashboard do Vercel
2. Clique em **"Add New..."** → **"Project"**
3. Selecione o repositório **"HaVagas"** novamente

### 4.2 - Configurar o Frontend
1. **Project Name:** `havagas-frontend` (ou qualquer nome)
2. **Framework Preset:** Next.js (detecta automaticamente)
3. **Root Directory:** Clique em **"Edit"** e selecione **"frontend"**
4. **Build Command:** `npm run build`
5. **Output Directory:** Deixe em branco (Next.js gerencia)
6. **Install Command:** `npm install`

### 4.3 - Variáveis de Ambiente
Clique em **"Environment Variables"** e adicione:

```
NEXT_PUBLIC_API_URL = https://havagas-backend.vercel.app
```

**⚠️ IMPORTANTE:** Substitua pela URL real que você copiou no passo 3.4

### 4.4 - Deploy
1. Clique em **"Deploy"**
2. Aguarde o build terminar (2-5 minutos)
3. **Copie a URL do frontend** (ex: `https://havagas-frontend.vercel.app`)

## 📋 PASSO 5: Testar a aplicação

1. Acesse a URL do frontend
2. Faça login com: `joao@email.com` / `123456`
3. Teste criar uma reserva

## 🔄 PASSO 6: Atualizações futuras

Sempre que você fizer alterações:

```bash
git add .
git commit -m "Descrição da alteração"
git push origin correcoes
```

O Vercel detecta automaticamente e faz o redeploy! 🎉

## 🐛 Solução de Problemas

### Erro de CORS no backend:
Já está configurado com `app.enableCors()` no `main.ts`

### Banco de dados vazio:
Execute o seed manualmente ou use PostgreSQL do Vercel

### Frontend não conecta no backend:
Verifique se a variável `NEXT_PUBLIC_API_URL` está correta nas configurações do Vercel

### 404 no backend:
Verifique se o `vercel.json` está na pasta `backend`

## 📝 URLs finais

Após o deploy, você terá:
- **Frontend:** https://havagas-frontend.vercel.app
- **Backend API:** https://havagas-backend.vercel.app
- **Swagger:** https://havagas-backend.vercel.app/api

## ✅ Pronto!

Seu sistema Há Vagas está no ar e acessível de qualquer lugar! 🚀
