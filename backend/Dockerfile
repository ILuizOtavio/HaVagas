# Build stage
FROM node:20-alpine AS builder

# Instalar dependências necessárias para compilar better-sqlite3
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

# Instalar dependências necessárias para rodar better-sqlite3
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Criar diretório para dados persistentes
RUN mkdir -p /data && chmod 777 /data

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src

# Definir variável de ambiente para produção
ENV NODE_ENV=production

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
