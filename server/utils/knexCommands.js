const knex = require('knex')({
  dialect: 'pg',
  connection: 'postgress://localhost:5432/occs'
})

function knexSelect(database) {
  return knex.select().from(database)
}

module.exports = {
  knexSelect: knexSelect
}
