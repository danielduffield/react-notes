const knex = require('knex')({
  dialect: 'pg',
  connection: 'postgress://localhost:5432/occs'
})

async function knexSelectAll(database) {
  const query = await knex.select().from(database)
  return query
}

module.exports = {
  knexSelect: knexSelectAll
}
