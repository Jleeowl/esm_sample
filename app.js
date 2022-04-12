import { createRequire } from 'module'
const require = createRequire(import.meta.url)

import express from 'express'
import cookieParser from 'cookie-parser'
import compression from 'compression'

import router from './routers/apis.js'

const app = express()

app.use(compression())
app.use(cookieParser())

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
