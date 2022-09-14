# Wayi Backend NestJS

## Get Started

Generate the .env file and add the database credentials.

```bash
$ cp .env.example .env
```

Install dependencies and enable [Husky](https://typicode.github.io/husky/).

```bash
$ pnpm install
$ pnpm husky install
```

## Running the app

```bash
# development
$ pnpm start

# watch mode
$ pnpm start:dev

# production mode
$ pnpm start:prod
```

## Test

```bash
# unit tests
$ pnpm test

# e2e tests
$ pnpm test:e2e

# test coverage
$ pnpm test:cov
```
