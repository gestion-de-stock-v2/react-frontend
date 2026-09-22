# ============================================================
# ÉTAPE 1 : BUILD — compilation Vite
# ============================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copie des manifests en premier (cache Docker)
COPY package.json package-lock.json ./
RUN npm ci

# Copie du code
COPY . .

# Variable passée au build (Vite l'inline dans le bundle)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build de production → génère /app/dist
RUN npm run build

# ============================================================
# ÉTAPE 2 : RUNTIME — Nginx sert les fichiers statiques
# ============================================================
FROM nginx:alpine

# Config nginx custom (fallback SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie du build depuis l'étape 1
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]