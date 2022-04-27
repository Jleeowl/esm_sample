import { Sequelize } from 'sequelize'
import chalk  from 'chalk'

let seqInstance

export class Database {
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

    sequelizeInstance() {
        return seqInstance
    }
}

export default new Database()
