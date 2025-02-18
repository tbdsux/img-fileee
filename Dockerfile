ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-slim AS slim

# Setup pnpm and turbo on the slim base
FROM slim AS base
RUN corepack enable
RUN npm install -g corepack@latest
RUN pnpm config set store-dir ~/.pnpm-store


# 3. Build the project
FROM base AS builder

ENV CI=true

WORKDIR /app

COPY ./ /app

# Install dependencies
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --frozen-lockfile

# Build the specified project
RUN pnpm build

# 4. Final image - runner stage to run the application
FROM base AS runner
ARG APP_DIRNAME

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 tanstack-start
USER tanstack-start

WORKDIR /app

# Copy built artifacts from builder stage
COPY --from=builder --chown=tanstack-start:nodejs /app/.output ./.output
COPY --from=builder --chown=tanstack-start:nodejs /app/legal ./legal
COPY --from=builder --chown=tanstack-start:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=tanstack-start:nodejs /app/package.json ./package.json

ARG PORT=4545
ENV PORT=${PORT}
EXPOSE ${PORT}

CMD ["node", ".output/server/index.mjs"]
# CMD ["ls", "-la", "-R"]