import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

export default (() => {
  const env = process.env.NODE_ENV || 'local'

  const envfile = path.join(process.cwd(), 'src', 'env', '.env.' + env)

  if (fs.existsSync(envfile)) {
    dotenv.config({
      path: envfile
    })
  }

  const defaultfile = path.join(process.cwd(), 'env', '.env')

  if (fs.existsSync(defaultfile)) {
    dotenv.config({
      path: defaultfile
    })
  }
})()
