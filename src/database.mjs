import { Sequelize } from 'sequelize'
import chalk  from 'chalk'

let seqInstance

/**
 * This helper class is responsible for establishing database connections
 */
export class Database {
    /**
     * Create the Database
     * @constructor
     */
    constructor() {
        if (process.env.SEQ_DATABASE && 
            process.env.SEQ_DB_USER && 
            process.env.SEQ_DB_PASSWORD) {
                
                seqInstance = new Sequelize(
                `${process.env.SEQ_DATABASE}`, 
                `${process.env.SEQ_DB_USER}`, 
                `${process.env.SEQ_DB_PASSWORD}`, 
                {
                    dialect: 'postgres',
                    dialectOptions: {
                        
                    }
                })
        }
    }

    /**
     * Returns an instance of sequelize object
     * @returns {Sequelize}
     */
    sequelizeInstance() {
        return seqInstance
    }
}

/**
 * Returns an instance of Database
 */
export default new Database()
