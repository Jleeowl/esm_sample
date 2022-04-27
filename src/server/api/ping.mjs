import express from 'express'
import db from '../../database.mjs'

/**
 * Express Router to mount ping related functions
 * @constant
 * @namespace pingRouter
 * @type {express.Router}
 */
const router = express.Router()

/**
 * Express router class providing ping related routes
 * @requires express
 */
class Ping {
  /**
   * Create the Ping
   * @constructor
   */
  constructor() {
    // Routes are defined in the constructor

    /** 
     * @api {get} /ping Ping the server
     * @apiName GetPing
     * @apiGroup Ping
     * 
     * @apiSuccess {String} data Ping message from endpoint
     * 
     * @apiSuccessExample Success-Response:
     *    HTTP/1.1 200 OK
     *    {
     *      "data": "pong"
     *    }
     */
    router.get('/', async (req, res, next) => {
      res.json({
        data: 'pong'
      })
    })

    return router
  }
}

/**
 * Returns the Ping router
 */
export default new Ping()
