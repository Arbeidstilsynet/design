FROM ghcr.io/pnpm/pnpm:12@sha256:41c39d1c734b0a810669c07587888aa7dbe9ef9b4c8e98b346b3654f7b269b6d AS base

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


FROM nginx:alpine@sha256:b2f80f8f88146b0772fdcc7d92cea621aa8c2889fa8d07ed61d4884fcea53e09 AS runner

RUN apk upgrade --no-cache

COPY /apps/storybook/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/apps/storybook/storybook-static /usr/share/nginx/html

EXPOSE 6006

ENTRYPOINT []
CMD ["nginx", "-g", "daemon off;"]
