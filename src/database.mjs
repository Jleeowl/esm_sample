import { Sequelize } from 'sequelize'
import knex from  'knex'
import chalk  from 'chalk'

let seqInstance
let knexInstance

/**
 * This helper class is responsible for establishing database connections
 */
export class Database {
    /**
     * Create the Database
     * @constructor
     */
    constructor() {
        if (process.env.DB_NAME && 
            process.env.DB_USER) {
                
                seqInstance = new Sequelize(
                `${process.env.DB_NAME}`, 
                `${process.env.DB_USER}`, 
                `${process.env.DB_PASSWORD}`, 
                {
                    dialect: 'postgres',
                    dialectOptions: {
                        
                    }
                })

                knexInstance = knex({
                    client: process.env.DB_TYPE,
                    connection: {
                      user: process.env.DB_USER,
                      password: process.env.DB_PASSWORD,
                      host: process.env.DB_HOST,
                      database: process.env.DB_NAME,
                      charset: process.env.DB_CHARSET || 'utf8mb4'
                    },
                    pool: {
                      min: parseInt(process.env.DB_POOL_MIN) || 2,
                      max: parseInt(process.env.DB_POOL_MAX) || 10
                    },
                    migrations: {
                      tableName: process.env.DB_MIGRATION_TABLENAME || '_migrations'
                    },
                    debug: process.env.NODE_ENV !== 'production'
                  })
        }
    }

    /**
     * Returns an instance of sequelize object
     * @returns {Object}
     */
    sequelizeInstance() {
        return seqInstance
    }

    /**
     * Returns an instance of knex object
     * @returns {Object}
     */
    knexInstance() {
        return knexInstance
    }
}

/**
 * Returns an instance of Database
 */
export default new Database()
