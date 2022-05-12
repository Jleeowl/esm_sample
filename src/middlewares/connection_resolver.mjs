import { createNamespace } from 'continuation-local-storage'

import { getConnectionBySlug } from '../tenant_connection_manager.mjs'

import { v4 as uuidv4 } from 'uuid'

// Create a namespace for the application.


/**
 * Get the connection instance for the given tenant's slug and set it to the current context.
**/
export function resolve(req, res, next) {
    const nsName = `${req.originalUrl}_${uuidv4()}`
    const ns = createNamespace(nsName)
    const slug = req.query.slug

    if (!slug) {
        res.json({ message: `Please provide tenant's slug to connect.` })
        return
    }

    // Run the application in the defined namespace. It will contextualize every underlying function calls.
    ns.run(() => {
        /**
         * Create the namespace and pass it through by storing it in
         * the request middleware
         */
        
        req.namespace = nsName

        ns.set('connection', getConnectionBySlug(slug)) // This will set the knex instance to the 'connection'
        next()
    })
}
