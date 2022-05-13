import { getNamespace } from 'continuation-local-storage'
import knex from 'knex'

import db from '../database.mjs'

export async function connectAllDb() {
    let tenants

    try {
        tenants = await db.knexInstance().select('*').from('tenants')
    } catch (err) {
        console.log('Error', err)

        return
    }
    
    return tenants
        .map(tenant => {
            return {
                [tenant.slug]: knex(createConnectionConfig(tenant))
            }
        })
        .reduce((prev, next) => {
            return Object.assign({}, prev, next);
        }, {})
}

export async function getConnectionBySlug(slug) {
    const connectionMap = await connectAllDb()

    if (connectionMap) {
        return connectionMap[slug]
    }
}

export async function getConnection(namespace) {
    const ns = getNamespace(namespace)
    let conn = ns.get('connection')

    if (!ns) {
        throw 'Namespace not found.'
    }

    if (!conn) {
        /** 
         * If there is no connection in the pool, 
         * attempt to refresh the db connection pool. 
         * A tenant could have been newly added/created
         * and the connection is not refreshed yet.
         */ 
        await connectAllDb()
        conn = ns.get('connection')
        

        /**
         * If the connection is still unvailable that means there is no
         * corresponding tenant within the common db.
         */
        if (!conn) {
            throw 'Connection is not set for any tenant database.'
        } else {
            return conn
        }
    } else {
        return conn
    }
}

const createConnectionConfig = (tenant) => {
    return {
        client: tenant.db_type,
        connection: {
            host: tenant.db_host,
            port: tenant.db_port,
            user: tenant.db_username,
            database: tenant.db_name,
            password: tenant.db_password,
            charset: process.env.DB_CHARSET || 'utf8mb4'
        },
        pool: {
            min: parseInt(process.env.DB_POOL_MIN) || 2,
            max: parseInt(process.env.DB_POOL_MAX) || 10
        },
        debug: process.env.NODE_ENV !== 'production'
    }
}
