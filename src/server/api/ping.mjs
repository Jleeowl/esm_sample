import express from 'express'
import db from '../../database.mjs'

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({
    data: 'pong'
  })
})

export default router
