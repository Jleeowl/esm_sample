import knex from 'knex'

import db from './database.mjs'

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
        console.log(connectionMap)
}

export function getConnectionBySlug(slug) {
    if (connectionMap) {
        return connectionMap[slug]
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
