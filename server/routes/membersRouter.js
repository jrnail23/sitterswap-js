import express from 'express'
import members from '../data/members'
import url from 'url'
import _ from 'lodash'

export default () => {
  const membersRouter = express.Router()

  membersRouter.route('/')
    .get((req, res) => {
      res.json(members)
    })
    .post((req, res) => {
      var newMember = {
        key: req.body.firstName.toLowerCase() + '-' + req.body.lastName.toLowerCase(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress
      }
      members.push(newMember)
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
    // x
    })

  membersRouter.use('/:memberKey', (req, res, next) => {
    const member = _.find(members, {key: req.params.memberKey})
    if (!member) {
      res.status(404).send('no member found with key: ' + req.params.memberKey)
      return
    }
    req.member = member
    next()
  })

  membersRouter.route('/:memberKey')
    .get((req, res) => {
      res.json(req.member)
    })

  return membersRouter
}
