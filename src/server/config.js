export default {
  databaseUrl: process.env.DATABASE_URL || 'postgres://postgres@localhost/sitterswap',
  port: process.env.PORT || 9006,
  corsOptions: {
    allowedOrigins: ['localhost:*'],
    headers: ['Content-Type', 'X-Requested-With', 'Location', 'ETag']
  }
}
