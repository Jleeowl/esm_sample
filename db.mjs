import { join } from 'path'
import { Sequelize } from 'sequelize'
import chalk  from 'chalk'

let db

export default (() => {
    console.log(chalk.yellow('Initializing db'))

    if (!db) {
        db = new Sequelize(`${process.env.DATABASE}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
            dialect: 'postgres',
            dialectOptions: {
                
            }
        })
    }

    return db
})()