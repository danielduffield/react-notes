const knex = require('knex')({
  dialect: 'pg',
  connection: 'postgress://localhost:5432/occs'
})

async function knexSelect(database) {
  const query = await knex.select().from(database)
  return query
}

module.exports = {
  knexSelect: knexSelect
}
