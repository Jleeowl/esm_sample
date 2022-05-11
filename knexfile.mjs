
import './src/helpers/env_loader.mjs'

export default {
  client: process.env.DB_TYPE,
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    schema: process.env.DB_SCHEMA || 'public',
    database: process.env.DB_NAME,
    charset: process.env.DB_CHARSET || 'utf8mb4'
  },
  pool: {
    min: parseInt(process.env.DB_POOL_MIN) || 2,
    max: parseInt(process.env.DB_POOL_MAX) || 10
  },
  migrations: {
    tableName: process.env.DB_MIGRATION_TABLENAME || '_migrations',
    directory: './migrations',
    extension: 'mjs',
    loadExtensions: ['.mjs']
  },
  seeds: {
    extension: 'mjs',
    loadExtensions: ['.mjs']
  },
  debug: process.env.NODE_ENV !== 'production'
}
