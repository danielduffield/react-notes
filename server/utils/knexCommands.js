const knex = require('knex')({
  dialect: 'pg',
  connection: 'postgress://localhost:5432/occs'
})

function knexSelectAll(database) {
  return knex.select().from(database)
}

function knexInsert(database, noteData) {
  return knex.insert(noteData).into(database)
}

module.exports = {
  knexInsert: knexInsert,
  knexSelectAll: knexSelectAll
}
