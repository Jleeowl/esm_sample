/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('tenants', t => {
    t.increments()
    
    t.string('slug').defaultTo('').index()
    t.string('db_name').notNullable().defaultTo('')
    t.string('db_host').notNullable().defaultTo('')
    t.string('db_user').notNullable().defaultTo('')
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
