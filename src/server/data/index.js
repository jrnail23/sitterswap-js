import config from '../config'
import PgConnect from 'pg-connect'
import named from 'node-postgres-named'

export default PgConnect(config.databaseUrl)
  .on('client', client => {
    named.patch(client)
  })
