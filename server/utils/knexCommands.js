const knex = require('knex')({
  dialect: 'pg',
  connection: 'postgress://localhost:5432/occs'
})

function knexSelectAll(database) {
  return knex.select().from(database)
}

function knexInsert(table, noteData) {
  return knex.insert(noteData).into(table).returning('*')
}

module.exports = {
  knexInsert: knexInsert,
  knexSelectAll: knexSelectAll
}
