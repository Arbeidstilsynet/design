FROM ghcr.io/pnpm/pnpm:12@sha256:168feba88e6a1684c99a62cbf4fe361d4e683e2a6c920d3b0acde7e15a28b62d AS base

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


FROM nginx:alpine@sha256:fed7e14be83cbd2661a75cdc5b872d936cf155d46c327084d30b8df19ae88d72 AS runner

RUN apk upgrade --no-cache

COPY /apps/storybook/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/apps/storybook/storybook-static /usr/share/nginx/html

EXPOSE 6006

ENTRYPOINT []
CMD ["nginx", "-g", "daemon off;"]
