const knex = require('knex')({
  dialect: 'pg',
  connection: process.env.DATABASE_URL
})

function knexSelectAll(table) {
  return knex.select().from(table)
}

function knexInsert(table, noteData) {
  return knex.insert(noteData).into(table).returning('*')
}

function knexDelete(table, attribute, value) {
  return knex(table).where(attribute, value).del()
}

module.exports = {
  knexDelete: knexDelete,
  knexInsert: knexInsert,
  knexSelectAll: knexSelectAll
}
