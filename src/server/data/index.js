import config from '../config'
import PgConnect from 'pg-connect'
import named from 'node-postgres-named'

const getDbConnection = PgConnect(config.databaseUrl)

getDbConnection.on('client', client => {
    named.patch(client)
  })

export default getDbConnection
