FROM node:24-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_API_BASE_URL
ARG VITE_TOSS_CLIENT_KEY
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL} \
    VITE_TOSS_CLIENT_KEY=${VITE_TOSS_CLIENT_KEY}

RUN test -n "${VITE_API_BASE_URL}" && npm run build

FROM nginx:1.27-alpine

COPY deploy/gcp/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
