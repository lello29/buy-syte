
/**
 * Genera la configurazione Docker
 * @returns Configurazione Docker
 */
export function generateDockerConfig(): string {
  return `# Dockerfile per l'applicazione
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`;
}
