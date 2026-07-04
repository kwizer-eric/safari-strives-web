# Generic Dockerfile for any Next.js app under frontend/. Pass APP_NAME and APP_PORT at build time.
FROM node:20-alpine AS builder
ARG APP_NAME
WORKDIR /repo
COPY package.json package-lock.json* ./
COPY tsconfig.base.json ./
COPY packages ./packages
COPY frontend ./frontend
RUN npm install --workspaces --include-workspace-root --no-audit --no-fund
RUN npm run build -w ${APP_NAME}

FROM node:20-alpine AS runner
ARG APP_NAME
ARG APP_PORT=3000
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=${APP_PORT}
COPY --from=builder /repo/node_modules ./node_modules
COPY --from=builder /repo/packages ./packages
COPY --from=builder /repo/frontend/${APP_NAME} ./
EXPOSE ${APP_PORT}
CMD ["npm", "run", "start"]
