FROM node:24-slim@sha256:3638d9a6fe4030bd716be989438248074489337ba3275657f93595428be4fc03 AS base

FROM base AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"
# mute update notifications
ENV CI="true"

WORKDIR /app

RUN corepack enable
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
