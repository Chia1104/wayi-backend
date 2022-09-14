import 'dotenv/config';

// DB connection
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = parseInt(process.env.DB_PORT) || 5432;
export const DB_USER = process.env.DB_USER || 'postgres';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'postgres';
export const DB_NAME = process.env.DB_NAME || 'postgres';
export const DB_TYPE = process.env.DB_TYPE || 'postgres';
export const DB_URL =
  process.env.DB_URL ||
  `${DB_TYPE}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
export const DB_ENTITIES = [
  __dirname + '/../shared/entities/**/*.entity{.ts,.js}',
];
export const DB_MIGRATIONS = [
  __dirname + '/../db/migrations/public/**/*{.ts,.js}',
];
export const DB_MIGRATIONS_TABLE_NAME = 'migrations';
export const DB_MIGRATIONS_RUN =
  Boolean(process.env.DB_MIGRATIONS_RUN) || false;
export const DB_SYNCHRONIZE = Boolean(process.env.DB_SYNCHRONIZE) || false;

// Hasura settings
export const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET || 'secret';
export const HASURA_API = process.env.HASURA_API || 'http://localhost';
export const HASURA_WS = process.env.HASURA_WS || 'ws://localhost';
export const HASURA_PORT = parseInt(process.env.HASURA_PORT) || 8080;

// Throttle settings
export const THROTTLE_TTL = parseInt(process.env.THROTTLE_TTL) || 60;
export const THROTTLE_LIMIT = parseInt(process.env.THROTTLE_LIMIT) || 10;

// Firebase settings
export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
export const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY;
export const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;
export const TIMEOUT_EXCEPTION_TIME =
  parseInt(process.env.TIMEOUT_EXCEPTION_TIME) || 5000;

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Helmet settings
export const X_FRAME_OPTIONS =
  (process.env.X_FRAME_OPTIONS as 'deny' | 'sameorigin') || 'deny';
export const X_PERMITTED_CROSS_DOMAIN_POLICIES =
  (process.env.X_PERMITTED_CROSS_DOMAIN_POLICIES as
    | 'none'
    | 'master-only'
    | 'by-content-type'
    | 'all') || 'by-content-type';
export const REFERRER_POLICY =
  (process.env.REFERRER_POLICY as
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'same-origin'
    | 'origin'
    | 'strict-origin'
    | 'origin-when-cross-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url'
    | '') || 'strict-origin-when-cross-origin';
export const CROSS_ORIGIN_OPENER_POLICY =
  (process.env.CROSS_ORIGIN_OPENER_POLICY as
    | 'same-origin'
    | 'same-origin-allow-popups'
    | 'unsafe-none'
    | '') || 'same-origin';
export const CROSS_ORIGIN_RESOURCE_POLICY =
  (process.env.CROSS_ORIGIN_RESOURCE_POLICY as
    | 'same-origin'
    | 'same-site'
    | 'cross-origin'
    | '') || 'same-origin';
export const CROSS_ORIGIN_EMBEDDER_POLICY =
  (process.env.CROSS_ORIGIN_EMBEDDER_POLICY as
    | 'require-corp'
    | 'credentialless'
    | '') || 'require-corp';

// Health check settings
export const HEALTH_CHECK_DISK_PATH =
  process.env.HEALTH_CHECK_DISK_PATH || 'C:\\';
export const HEALTH_CHECK_DISK_THRESHOLD =
  parseFloat(process.env.HEALTH_CHECK_DISK_THRESHOLD) || 0.6;
export const HEALTH_CHECK_MEMORY_HEAP =
  parseInt(process.env.HEALTH_CHECK_MEMORY_HEAP) || 100000000;
export const HEALTH_CHECK_MEMORY_RSS =
  parseInt(process.env.HEALTH_CHECK_MEMORY_RSS) || 100000000;
