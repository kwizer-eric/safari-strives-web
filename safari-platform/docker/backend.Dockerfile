FROM node:20-alpine AS builder
WORKDIR /repo
COPY package.json package-lock.json* ./
COPY tsconfig.base.json ./
COPY packages ./packages
COPY backend ./backend
RUN npm install --workspaces --include-workspace-root --no-audit --no-fund
RUN npm run build -w backend

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /repo/node_modules ./node_modules
COPY --from=builder /repo/packages ./packages
COPY --from=builder /repo/backend/package.json ./package.json
COPY --from=builder /repo/backend/dist ./dist
EXPOSE 4000
CMD ["node", "dist/index.js"]
