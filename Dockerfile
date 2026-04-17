# syntax=docker/dockerfile:1.7

# ---------- Build stage ----------
FROM node:22-alpine AS build

WORKDIR /app

# Install deps fresh (no lockfile committed — avoids native-binding mismatch)
COPY package.json ./
RUN npm install

# Build
COPY . .
RUN npm run build

# ---------- Runtime stage ----------
FROM nginx:alpine

# Custom nginx config (SPA fallback + port 4321)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Static files
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 4321

CMD ["nginx", "-g", "daemon off;"]
