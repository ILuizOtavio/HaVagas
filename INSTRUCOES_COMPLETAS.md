# 📝 Instruções para Execução - Projeto Há Vagas

## 🎯 SOBRE O PROJETO

Sistema completo de gerenciamento de coworkings com:

### ✅ Backend (NestJS + PostgreSQL)
- API REST completa com 4 módulos principais
- Sistema de reservas com verificação de conflitos
- Seed com dados reais de coworkings de Aracaju
- Documentação automática com Swagger
- Validação de dados e tratamento de erros

### ✅ Frontend (Next.js + React + Tailwind)
- Interface moderna e responsiva
- 3 páginas principais (Home, Detalhes, Reservas)
- Sistema de busca e filtros
- Modais de reserva
- Notificações toast

### ✅ Banco de Dados
- 4 tabelas com relacionamentos
- Seed com 5 coworkings reais de Aracaju
- 17 espaços variados
- 3 usuários de teste

---

## 🚀 COMO EXECUTAR (PASSO A PASSO)

### PASSO 1: Preparar o Banco de Dados

1. Abra o seu banco de dados;
2. Execute este comando:

```sql
CREATE DATABASE havagas;
```

### PASSO 2: Instalar e Executar o Backend

Abra o PowerShell e execute:

```powershell
# Navegar até a pasta do backend
cd C:\Projetos\HaVagas\backend

# Instalar as dependências
npm install

# Popular o banco de dados com dados de exemplo
npm run seed

# Iniciar o servidor
npm run start:dev
```

**Aguarde** até ver a mensagem:
```
🚀 Servidor rodando em http://localhost:3001
📚 Documentação disponível em http://localhost:3001/api
```

### PASSO 3: Instalar e Executar o Frontend

Abra **OUTRO PowerShell** (deixe o primeiro rodando) e execute:

```powershell
# Navegar até a pasta do frontend
cd C:\Projetos\HaVagas\frontend

# Instalar as dependências
npm install

# Iniciar a aplicação
npm run dev
```

**Aguarde** até ver a mensagem:
```
✓ Ready in X.Xs
```

### PASSO 4: Acessar a Aplicação

Abra seu navegador e acesse:
- **Aplicação:** http://localhost:3000
- **API Documentation:** http://localhost:3001/api

---

## 🔍 PRINCIPAIS CONCEITOS IMPLEMENTADOS

### Backend
✅ **Arquitetura em Camadas** (Controller → Service → Repository)
✅ **Injeção de Dependências** (NestJS)
✅ **ORM e Relacionamentos** (TypeORM)
✅ **Validação de Dados** (class-validator)
✅ **Documentação Automática** (Swagger)
✅ **Regras de Negócio Complexas** (verificação de conflitos de reservas)

### Frontend
✅ **Server-Side Rendering** (Next.js)
✅ **Componentes Reutilizáveis** (React)
✅ **Tipagem Forte** (TypeScript)
✅ **Estilização Moderna** (Tailwind CSS)
✅ **Gerenciamento de Estado** (useState, useEffect)
✅ **Navegação Dinâmica** (Next.js App Router)

---

## 🎯 FUNCIONALIDADES IMPLEMENTADAS

### ✅ Requisitos Obrigatórios 
- [x] Cadastro e listagem de espaços (back-end)
- [x] Cadastro de usuários/clientes (back-end)
- [x] Registro de reservas com verificação de conflitos
- [x] Visualização da agenda de ocupação
- [x] Interface gráfica intuitiva (front-end)

### ✅ Funcionalidades Extras 
- [x] Sistema de busca e filtros
- [x] Design responsivo (mobile, tablet, desktop)
- [x] Notificações de feedback (toasts)
- [x] Cards informativos e visuais
- [x] Documentação completa com Swagger
- [x] Seed de dados realistas
- [x] Estatísticas na home
- [x] Loading states
- [x] Tratamento de erros

---

## 💾 DADOS DE TESTE

### Usuários de Teste
Após executar `npm run seed`, estarão disponíveis:

- **Email:** joao.silva@email.com | **Senha:** senha123
- **Email:** maria.santos@email.com | **Senha:** senha123  
- **Email:** pedro.oliveira@email.com | **Senha:** senha123

### Coworkings Incluídos
1. CAJUHUB
2. UNITWORK Coworking
3. Hub de Inovação Unit
4. Work Espaços Compartilhados
5. StartSE

### Tipos de Espaços
- Salas de Reunião (10-80 pessoas)
- Estações de Trabalho (1-4 pessoas)
- Auditórios (80-100 pessoas)
- Laboratórios de Tecnologia

---

## 🐛 RESOLUÇÃO DE PROBLEMAS

### Erro: "Cannot connect to database"
**Solução:** Verifique o arquivo `backend\.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres  ← Confirme sua senha
DB_DATABASE=havagas
```

### Erro: "Port 3001 already in use"
**Solução:**
```powershell
# Encontrar o processo
netstat -ano | findstr :3001

# Matar o processo (substitua [PID])
taskkill /PID [PID] /F
```

### Erro ao instalar dependências
**Solução:**
```powershell
npm cache clean --force
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json -Force
npm install
```

---

## 📊 TESTANDO A APLICAÇÃO

### 1. Teste o Backend via Swagger
- Acesse: http://localhost:3001/api
- Teste os endpoints diretamente na interface
- Veja exemplos de request/response

### 2. Teste o Frontend
- Home: Veja todos os coworkings
- Busca: Procure por "CAJUHUB" ou "Centro"
- Detalhes: Clique em um coworking
- Reserva: Tente criar uma reserva
- Minhas Reservas: Veja as reservas criadas

### 3. Teste no Banco de Dados
- Abra pgAdmin
- Conecte ao banco `havagas`
- Explore as tabelas criadas

---

## ✅ CHECKLIST PRÉ-EXECUÇÃO

- [ ] PostgreSQL instalado e rodando
- [ ] Node.js 18+ instalado
- [ ] Banco de dados `havagas` criado
- [ ] Arquivo `.env` configurado no backend
- [ ] Portas 3000 e 3001 disponíveis

---

### Documentação Oficial
- **NestJS:** https://docs.nestjs.com/
- **TypeORM:** https://typeorm.io/
- **Next.js:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
