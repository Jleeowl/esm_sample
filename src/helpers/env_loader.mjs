import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

/**
 * This helper class generates process environment variables from .env files from the pre-defined paths.
 */
export class EnvLoader {
  constructor() {
    const env = process.env.NODE_ENV || 'local'

    const envfile = path.join(process.cwd(), 'src', 'env', '.env.' + env)

    if (fs.existsSync(envfile)) {
      dotenv.config({
        path: envfile
      })
    }

    const defaultfile = path.join(process.cwd(), 'src', 'env', '.env')

    if (fs.existsSync(defaultfile)) {
      dotenv.config({
        path: defaultfile
      })
    }
  }
}

/**
 * This function returns an instance of the EnvLoader.
 */
export default new EnvLoader()