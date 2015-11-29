import express from 'express'
import Bromise from 'bluebird'
import getDbConnection from '../data'
import url from 'url'

const mapRowToMember = row => {
  return {
    key: row.key,
    firstName: row.first_name,
    lastName: row.last_name,
    emailAddress: row.email_address
  }
}

// TODO: pull data access out into service/repository, etc.
export default () => {
  const membersRouter = express.Router()

  membersRouter.route('/')
    .get((req, res) => {
      return Bromise.using(
        getDbConnection(),
        query => query('SELECT key, first_name, last_name, email_address FROM member')
      ).get('rows')
        .map(mapRowToMember)
        .then(rows => res.json(rows))
    })
    .post((req, res) => {
      var newMember = {
        key: req.body.firstName.toLowerCase() + '-' + req.body.lastName.toLowerCase(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress
      }
      var sql = 'INSERT INTO member (key, last_name, first_name, email_address) VALUES ($key, $lastName, $firstName, $emailAddress)'
      return Bromise.using(getDbConnection(), query => query(sql, newMember))
        .then(result => {
          var uri = {
            protocol: req.protocol,
            host: req.headers.host,
            pathname: '/members/' + newMember.key
          }
          res.status(201)
            .location(url.format(uri))
            .send({
              location: uri.pathname
            })
        })
    })

  membersRouter.use('/:memberKey', (req, res, next) => {
    return Bromise.using(
      getDbConnection(),
      query => query('SELECT key, last_name, first_name, email_address FROM member WHERE key = $key ',
          {key: req.params.memberKey})
    ).get('rows')
      .then(rows => {
        const member = rows[0]
        if (!member) {
          res.status(404).send('no member found with key: ' + req.params.memberKey)
          return
        }
        req.member = mapRowToMember(member)
        next()
      })
  })

  membersRouter.route('/:memberKey')
    .get((req, res) => {
      res.json(req.member)
    })

  return membersRouter
}
