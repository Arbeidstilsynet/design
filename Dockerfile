FROM node:24-slim@sha256:964191e9c047c5ababb0ba8a6e613cc70714a1de1fbca57e717c516f689c8053 AS base

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


FROM nginx:alpine@sha256:1a8724a52d432501548a8d8681bb1554c2d09778f8b9ed0882fc3442549980b7 AS runner

COPY /apps/storybook/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/apps/storybook/storybook-static /usr/share/nginx/html

EXPOSE 6006

ENTRYPOINT []
CMD ["nginx", "-g", "daemon off;"]
