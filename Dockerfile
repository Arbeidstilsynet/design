FROM ghcr.io/pnpm/pnpm:12@sha256:a7181e1d2a2e3ac5dad5a776a7e27360b0e24b59db4de8949569197e4d4036d1 AS base

FROM base AS builder

# mute update notifications
ENV CI="true"

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/storybook/package.json ./apps/storybook/package.json
COPY packages/css/package.json ./packages/css/package.json
COPY packages/react/package.json ./packages/react/package.json
COPY packages/theme/package.json ./packages/theme/package.json
COPY tools/eslint-stub/package.json ./tools/eslint-stub/package.json
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts --filter=storybook...

COPY . /app
RUN pnpm run build:storybook


FROM nginx:alpine@sha256:4a73073bd557c65b759505da037898b61f1be6cbcc3c2c3aeac22d2a470c1752 AS runner

COPY /apps/storybook/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/apps/storybook/storybook-static /usr/share/nginx/html

EXPOSE 6006

ENTRYPOINT []
CMD ["nginx", "-g", "daemon off;"]
