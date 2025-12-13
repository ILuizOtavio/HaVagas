# 🏢 Há Vagas - Sistema de Gerenciamento de Coworkings

Sistema completo para gerenciar reservas de espaços de coworking em Aracaju, desenvolvido com React/Next.js, NestJS e PostgreSQL.

## 📋 Sobre o Projeto

O **Há Vagas** é uma plataforma que unifica os principais coworkings de Aracaju em um único aplicativo, permitindo que usuários:
- Explorem diferentes espaços de coworking
- Visualizem detalhes e recursos de cada espaço
- Façam reservas de salas de reunião, estações de trabalho, auditórios e laboratórios
- Gerenciem suas reservas

## 🚀 Tecnologias Utilizadas

### Backend
- **NestJS** - Framework Node.js para APIs
- **TypeORM** - ORM para TypeScript
- **PostgreSQL** - Banco de dados relacional
- **Swagger** - Documentação automática da API
- **bcrypt** - Criptografia de senhas
- **class-validator** - Validação de dados

### Frontend
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Axios** - Cliente HTTP
- **React Icons** - Biblioteca de ícones
- **date-fns** - Manipulação de datas
- **react-toastify** - Notificações

## 📁 Estrutura do Projeto

```
HaVagas/
├── backend/
│   ├── src/
│   │   ├── config/         # Configurações (database)
│   │   ├── controllers/    # Controladores REST
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── entities/       # Entidades do TypeORM
│   │   ├── modules/        # Módulos do NestJS
│   │   ├── services/       # Lógica de negócio
│   │   ├── database/
│   │   │   └── seeds/      # Seed de dados
│   │   ├── app.module.ts   # Módulo principal
│   │   └── main.ts         # Entry point
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── app/            # Páginas Next.js (App Router)
    │   ├── components/     # Componentes React
    │   ├── services/       # Serviços de API
    │   └── types/          # Tipos TypeScript
    ├── package.json
    └── .env.local
```

## 🗄️ Modelo de Dados

### Entidades Principais

1. **Usuario** - Usuários do sistema
2. **Coworking** - Espaços de coworking cadastrados
3. **Espaco** - Ambientes dentro dos coworkings (salas, estações, etc)
4. **Reserva** - Reservas de espaços pelos usuários

### Tipos de Espaço
- `SALA_REUNIAO` - Salas de reunião
- `ESTACAO_TRABALHO` - Estações de trabalho
- `AUDITORIO` - Auditórios para eventos
- `LABORATORIO` - Laboratórios de tecnologia

### Status de Reserva
- `PENDENTE` - Aguardando confirmação
- `CONFIRMADA` - Reserva confirmada
- `CANCELADA` - Cancelada pelo usuário
- `CONCLUIDA` - Finalizada

## 🔧 Instalação e Configuração

### Pré-requisitos

- Node.js 18+ instalado
- PostgreSQL 14+ instalado e rodando
- npm ou yarn

### 1. Configurar Banco de Dados

```sql
-- No PostgreSQL, criar o banco de dados
CREATE DATABASE havagas;
```

### 2. Configurar Backend

```bash
# Navegar para a pasta backend
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente (já existe .env)
# Verifique se as credenciais do PostgreSQL estão corretas no arquivo .env

# Executar o seed (popular banco com dados)
npm run seed

# Iniciar servidor em modo desenvolvimento
npm run start:dev
```

O backend estará rodando em `http://localhost:3001`
Documentação Swagger em `http://localhost:3001/api`

### 3. Configurar Frontend

```bash
# Em outro terminal, navegar para a pasta frontend
cd frontend

# Instalar dependências
npm install

# Iniciar aplicação em modo desenvolvimento
npm run dev
```

O frontend estará rodando em `http://localhost:3000`

## 🎯 Funcionalidades Implementadas

### Backend (API REST)

#### ✅ Usuários
- `POST /usuarios` - Criar usuário
- `GET /usuarios` - Listar usuários
- `GET /usuarios/:id` - Buscar usuário por ID
- `PUT /usuarios/:id` - Atualizar usuário
- `DELETE /usuarios/:id` - Remover usuário

#### ✅ Coworkings
- `POST /coworkings` - Criar coworking
- `GET /coworkings` - Listar coworkings ativos
- `GET /coworkings/:id` - Buscar coworking por ID
- `PUT /coworkings/:id` - Atualizar coworking
- `DELETE /coworkings/:id` - Remover coworking

#### ✅ Espaços
- `POST /espacos` - Criar espaço
- `GET /espacos` - Listar espaços (filtro por coworking)
- `GET /espacos/:id` - Buscar espaço por ID
- `PUT /espacos/:id` - Atualizar espaço
- `DELETE /espacos/:id` - Remover espaço

#### ✅ Reservas
- `POST /reservas` - Criar reserva
- `GET /reservas` - Listar reservas (filtros por usuário e espaço)
- `GET /reservas/:id` - Buscar reserva por ID
- `GET /reservas/agenda/:espacoId` - Visualizar agenda de um espaço
- `PUT /reservas/:id` - Atualizar status da reserva
- `DELETE /reservas/:id` - Cancelar reserva

**Regras de Negócio:**
- ✅ Verificação de conflitos de horário nas reservas
- ✅ Cálculo automático do valor total baseado em horas
- ✅ Validação de datas (início antes do fim)
- ✅ Controle de status de reservas

### Frontend (Interface Web)

#### ✅ Página Inicial
- Listagem de todos os coworkings
- Busca por nome, bairro ou descrição
- Cards com informações resumidas
- Estatísticas do sistema

#### ✅ Página de Detalhes do Coworking
- Informações completas do coworking
- Listagem de espaços disponíveis
- Modal de reserva integrado
- Imagens e recursos

#### ✅ Página de Reservas
- Seletor de usuário (demo)
- Listagem de reservas do usuário
- Cancelamento de reservas
- Informações detalhadas de cada reserva

#### ✅ Componentes Reutilizáveis
- Header com navegação
- Cards de coworkings
- Cards de espaços
- Cards de reservas
- Modal de criação de reserva

## 📊 Dados de Demonstração

O seed popula o banco com:

### 5 Coworkings Reais de Aracaju:
1. **CAJUHUB** - Hub de inovação de Sergipe
2. **UNITWORK Coworking** - Espaço colaborativo
3. **Hub de Inovação Unit** - Centro da universidade
4. **Work Espaços Compartilhados** - Centro de Aracaju
5. **StartSE** - Comunidade de startups

### 3 Usuários de Teste:
- Email: `joao@email.com` | Senha: `123456`
- Email: `maria@email.com` | Senha: `123456`
- Email: `pedro@email.com` | Senha: `123456`

### 17 Espaços Variados:
- Salas de reunião
- Estações de trabalho
- Auditórios
- Laboratórios de inovação

### 3 Reservas de Exemplo

## 🎨 Design e UX

- Design responsivo (mobile, tablet, desktop)
- Cores principais: Laranja (#f58800) como cor primária
- Interface intuitiva e moderna
- Feedback visual com toasts
- Loading states
- Estados vazios informativos

## 📝 Scripts Disponíveis

### Backend
```bash
npm run start:dev    # Desenvolvimento com hot-reload
npm run build        # Build para produção
npm run start:prod   # Executar versão de produção
npm run seed         # Popular banco de dados
```

### Frontend
```bash
npm run dev         # Desenvolvimento
npm run build       # Build para produção
npm run start       # Executar versão de produção
npm run lint        # Verificar código
```

## 🔒 Considerações de Segurança

- ✅ Senhas criptografadas com bcrypt
- ✅ Validação de dados com class-validator
- ✅ CORS habilitado para comunicação frontend/backend
- ⚠️ **Nota:** Sistema de autenticação JWT não implementado (fora do escopo)

## 🚀 Deploy

### Backend
1. Configurar variáveis de ambiente em produção
2. Alterar `synchronize: false` no TypeORM
3. Executar migrations
4. Deploy em serviços como Heroku, Railway, ou AWS

### Frontend
1. Build da aplicação: `npm run build`
2. Deploy em Vercel (recomendado para Next.js)
3. Configurar variável `NEXT_PUBLIC_API_URL` com URL do backend

## 🎓 Conceitos Aplicados

- ✅ Arquitetura em camadas (Controller > Service > Repository)
- ✅ Injeção de dependências
- ✅ ORM e relacionamentos de banco de dados
- ✅ RESTful API design
- ✅ TypeScript e tipagem forte
- ✅ Componentes React reutilizáveis
- ✅ Server-side rendering (Next.js)
- ✅ Gerenciamento de estado local
- ✅ Validação de formulários
- ✅ Tratamento de erros

## 📚 Documentação da API

Acesse `http://localhost:3001/api` quando o backend estiver rodando para ver a documentação interativa completa do Swagger.

## 🐛 Troubleshooting

### Erro de conexão com banco de dados
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no arquivo `.env`
- Certifique-se de que o banco `havagas` foi criado

### Porta já em uso
- Backend: Altere `PORT` no `.env`
- Frontend: Use `npm run dev -- -p 3001` para mudar a porta

### Erros ao instalar dependências
- Limpe o cache: `npm cache clean --force`
- Delete `node_modules` e `package-lock.json`
- Instale novamente: `npm install`

## 🤝 Contribuindo

Este é um projeto educacional. Sugestões de melhorias:
- Implementar autenticação JWT
- Adicionar sistema de pagamentos
- Criar dashboard administrativo
- Implementar chat entre usuários e coworkings
- Adicionar sistema de avaliações
- Criar notificações por email

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

---

**Há Vagas** - Conectando pessoas aos melhores espaços de coworking de Aracaju! 🚀
