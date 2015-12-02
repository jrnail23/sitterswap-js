import express from 'express'
import Bromise from 'bluebird'
import getDbConnection from '../data'
import url from 'url'

const mapRowToMember = row => {
  // TODO: use camelize to do this
  return {
    key: row.key,
    firstName: row.first_name,
    lastName: row.last_name,
    emailAddress: row.email_address
  }
}

const mapRowToActivity = row => {
  return {
    href: '/members/' + row.client + '/activities/' + row.id,
    date: row.date,
    sitter: row.sitter,
    client: row.client,
    points: row.points
  }
}

// TODO: pull data access out into service/repository, etc.
export default () => {
  const membersRouter = express.Router()

  membersRouter.route('/')
    .get((req, res) => {
      Bromise.using(
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
      Bromise.using(getDbConnection(), query => query(sql, newMember))
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

        // TODO: catch unique key violation, return appropriate HTTP status
    })

  const activitiesRouter = express.Router({mergeParams: true})

  // nesting activities router under members
  membersRouter.use('/:memberKey/activities/', activitiesRouter)

  activitiesRouter.route('/')
    .get((req, res) => {
      let sql = `SELECT a.id, mc.key AS client, ms.key AS sitter, a.date, a.points
                 FROM activity a
                 INNER JOIN member mc ON a.client = mc.id
                 INNER JOIN member ms ON a.sitter = ms.id
                 WHERE mc.key = $memberKey`
      return Bromise.using(
        getDbConnection(),
        query => query(sql, {memberKey: req.params.memberKey})
      ).get('rows')
        .map(mapRowToActivity)
        .then(rows => res.json(rows))
    })
    .post((req, res) => {
      var newActivity = {
        client: req.params.memberKey,
        sitter: req.body.sitter,
        date: req.body.date,
        points: req.body.points
      }
      var sql = `SELECT insert_activity(client_key := $client, sitter_key := $sitter, date := $date, points := $points)`
      return Bromise.using(getDbConnection(), query => query(sql, newActivity))
        .get('rows')
        .tap(response => console.log(response))
        .map(row => row['insert_activity'])
        .spread(id => {
          var uri = {
            protocol: req.protocol,
            host: req.headers.host,
            pathname: '/members/' + req.params.memberKey + '/activities/' + id
          }
          res.status(201)
            .location(url.format(uri))
            .send({
              location: uri.pathname
            })
        })
    })

  activitiesRouter.route('/:id')
    .get((req, res) => {
      let sql = `SELECT a.id, mc.key AS client, ms.key AS sitter, a.date, a.points
                 FROM activity a
                 INNER JOIN member mc ON a.client = mc.id
                 INNER JOIN member ms ON a.sitter = ms.id
                 WHERE mc.key = $memberKey AND a.id = $id`
      return Bromise.using(
        getDbConnection(),
        query => query(sql, {memberKey: req.params.memberKey, id: req.params.id})
      ).get('rows')
        .map(mapRowToActivity)
        .then(([activity]) => {
          if (!activity) {
            res.status(404).send('no activity for ' + req.params.memberKey + ' found with id: ' + req.params.id)
            return
          }
          res.json(activity)
        })
    })

  membersRouter.use('/:memberKey', (req, res, next) => {
    return Bromise.using(
      getDbConnection(),
      query => query('SELECT key, last_name, first_name, email_address FROM member WHERE key = $key ',
          {key: req.params.memberKey})
    ).get('rows')
      .then(([member]) => {
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
