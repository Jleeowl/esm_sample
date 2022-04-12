import express from 'express'
import db from '../../db.mjs'

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({
    data: 'pong'
  })
})

export default router
