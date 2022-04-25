import { Sequelize } from 'sequelize'
import chalk  from 'chalk'

let db

export default (() => {
    console.log(chalk.yellow('Initializing db'))

    if (!db) {
        if (process.env.SEQ_DATABASE && 
            process.env.SEQ_DB_USER && 
            process.env.SEQ_DB_PASSWORD) {
                
            db = new Sequelize(
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

    return db
})()
