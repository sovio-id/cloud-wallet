# Stage 1: Build the application
FROM node:24-alpine3.24 AS build
RUN apk update && apk upgrade && apk add --no-cache openssl \
    && rm -rf /var/cache/apk/*
RUN npm install -g pnpm@9.15.9 --ignore-scripts
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
ENV PUPPETEER_SKIP_DOWNLOAD=true
RUN pnpm i --frozen-lockfile --ignore-scripts
COPY . .
RUN npx prisma generate --schema=libs/prisma-service/prisma/schema.prisma
RUN pnpm run build
RUN pnpm prune --prod

# Stage 2: Create the final image
FROM node:24-alpine3.24
RUN apk update && apk upgrade && apk add --no-cache openssl \
    && rm -rf /var/cache/apk/* \
    && addgroup -g 1001 -S nodejs \
    && adduser -S nextjs -u 1001
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/libs/prisma-service/prisma ./libs/prisma-service/prisma
COPY --from=build /app/docker-entrypoint.sh ./docker-entrypoint.sh
USER nextjs
# This service owns its DDL: migrations (prisma/migrations) deploy on start.
ENTRYPOINT ["sh", "docker-entrypoint.sh"]
