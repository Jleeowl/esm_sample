import { createRequire } from 'module'
const require = createRequire(import.meta.url)

import express from 'express'
import cookieParser from 'cookie-parser'
import compression from 'compression'

import chalk  from 'chalk'
import { log } from 'console'
import { connectAllDb } from './helpers/tenant_connection_manager.mjs'
import db from './database.mjs'
import * as connectionResolver from './middlewares/connection_resolver.mjs'

import router from './routers/apis.mjs'

const app = express()

log()
log(chalk.yellow(`Initializing common db`))
try {
  const seqInstance = db.sequelizeInstance()
  await seqInstance.authenticate()

  log(chalk.green(`- Sequelize ORM (${process.env.DB_NAME}) connection authenticated successfully.`))
} catch(err) {
  log(chalk.red(`- Sequelize ORM (${process.env.DB_NAME}) connection authentication failed.`))
}

log()
log(chalk.yellow(`Initializing tenant db(s)`))
try {
  await connectAllDb()

  log(chalk.green(`- Connection to tenant db(s): successful`))
} catch (err) {
  log(chalk.red(`= Connection to tenant db(s): failed`), err)
}

app.use(compression())
app.use(cookieParser())

// Implementing the connection resolver
app.use(connectionResolver.resolve)

// Implement your routers here
app.use('/', router)

// This middleware is for handling errors
app.use((err, req, res, next) => {
  // TODO: Error handler
  res.status(404)
  res.write(err.message)
  res.end()
})

export default app
