import uuid from 'uuid'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('tenants', t => {
    t.increments()
    
    t.string('uuid').notNullable().defaultTo(uuid.v4()).unique().index()
    t.string('slug').defaultTo('').unique().index()
    t.string('db_type').notNullable().defaultTo('pg')
    t.string('db_name').notNullable().defaultTo('testdb')
    t.string('db_host').notNullable().defaultTo('127.0.0.1')
    t.string('db_user').notNullable().defaultTo('postgres')
    t.string('db_password').notNullable().defaultTo('')
    t.integer('db_port').notNullable().defaultTo(5432)

    t.dateTime('created').notNullable().defaultTo(knex.fn.now())
    t.dateTime('updated').notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('tenants')
}
