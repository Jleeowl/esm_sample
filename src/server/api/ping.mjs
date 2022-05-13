import express from 'express'
import db from '../../database.mjs'
import { getNamespace } from 'continuation-local-storage'

import { getConnection } from '../../helpers/tenant_connection_manager.mjs'

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
     * @name get/ping
     * @function
     * @inner
     * @param {string} path - Express path
     * @param {callback} middleware - Express middleware.
     */
    router.get('/', async (req, res, next) => {
      const conn = await getConnection(req.namespace)
      const tenants = await conn.select('*').from('tenants')
      console.log(tenants)
      
      res.json({
        namespace: req.namespace,
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
