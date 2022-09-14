FROM node:16-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN apk add --no-cache libc6-compat && \
    npm install -g pnpm && \
    pnpm install
COPY . .
RUN pnpm build
ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
CMD [ "sh", "-c", "pnpm start:prod"]
