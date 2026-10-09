## =========================== TEMPLATE PADRÃO - MV8 TECH =========================== ##
# Mesmo template do site antigo (SiteColegioCPPEM). Next 16 exige Node >= 20.9.
ARG NODE_VERSION=22.1.0

## =========================== ETAPA 01: DEPENDÊNCIAS =========================== ##
FROM node:${NODE_VERSION}-alpine AS dependencies
WORKDIR /app

# só os arquivos de pacote primeiro, para aproveitar o cache do Docker
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

## =========================== ETAPA 02: BUILD =========================== ##
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Endereço público do site (canônico, sitemap, JSON-LD). Fica embutido no build.
ARG NEXT_PUBLIC_SITE_URL=https://colegio.cppem.com.br
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}

# IDs dos bancos do Notion não são segredo; o token é, e entra como secret de build.
ARG NOTION_BANNERS_DATABASE_ID=10419726-1ecf-4802-93fd-a8a76bb4b77f
ENV NOTION_BANNERS_DATABASE_ID=${NOTION_BANNERS_DATABASE_ID}

# Com o token, as páginas já saem do build com banners, eventos e parceiros do Notion.
# Sem ele o build funciona, mas essas partes só aparecem na primeira revalidação (até 5 min).
RUN --mount=type=secret,id=NOTION_TOKEN \
    export NOTION_TOKEN=$(cat /run/secrets/NOTION_TOKEN 2>/dev/null || echo "") && \
    npm run build

## =========================== ETAPA 03: EXECUÇÃO =========================== ##
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder --chown=node:node /app/public ./public

# cache de pré-renderização (revalidação das páginas a cada 5 min) precisa ser gravável
RUN mkdir .next && chown node:node .next

# saída standalone: servidor mínimo + dependências rastreadas
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
    CMD wget -qO- http://127.0.0.1:3000/api/health >/dev/null || exit 1

CMD ["node", "server.js"]
