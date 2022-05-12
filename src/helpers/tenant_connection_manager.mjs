import knex from 'knex'

import db from '../database.mjs'

let connectionMap

export async function connectAllDb() {
    let tenants

    try {
        tenants = await db.knexInstance().select('*').from('tenants')
    } catch (err) {
        console.log('Error', err)

        return
    }
    
    connectionMap = tenants
        .map(tenant => {
            return {
                [tenant.slug]: knex(createConnectionConfig(tenant))
            }
        })
        .reduce((prev, next) => {
            return Object.assign({}, prev, next);
        }, {})
}

export function getConnectionBySlug(slug) {
    if (connectionMap) {
        return connectionMap[slug]
    }
}

export async function getConnection() {
    const conn = ns.get('connection')

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

        /**
         * If the connection is still unvailable that means there is no
         * corresponding tenant within the common db.
         */
        if (!ns.get('connection')) {
            throw 'Connection is not set for any tenant database.'
        }   
    }

    return conn
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
