#!/bin/sh
set -e

npx prisma migrate deploy --schema=libs/prisma-service/prisma/schema.prisma

exec node dist/main.js
