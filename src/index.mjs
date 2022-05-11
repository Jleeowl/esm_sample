import { createRequire } from 'module'
const require = createRequire(import.meta.url)

import './helpers/env_loader.mjs'
import { connectAllDb } from './tenantConnManager.mjs'

import chalk  from 'chalk'
import { join }  from 'path'
import http  from 'http'
import getPort  from 'get-port'

import app from './app.mjs'
import db from './database.mjs'

const base = process.cwd()

const { log } = console
const { name, version } = require(join(base, 'package.json'))

log()
log(chalk.blue(name) + ' ' + chalk.yellow(`[v${version}]`))
log(chalk.blue(new Array(name.length + version.toString().length + 4).fill('-').join('')))
log()

export default (async () => {
  if (!process.env.PORT) {
    process.env.PORT = await getPort()
    log(chalk.red(`PORT not defined. Using port ${process.env.PORT}.`))
  }

  const server = http.createServer(app)

  await new Promise(resolve => server.listen(process.env.PORT, resolve))

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

  log()
  log(`App listening on port ${chalk.blue(process.env.PORT)}`)

  return server
})()
