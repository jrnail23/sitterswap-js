import Bromise from 'bluebird'
import _ from 'lodash'
import members from './data/members'
import serverActions from '../actions/serverActions'

var _clone = function (item) {
  return JSON.parse(JSON.stringify(item))
}

export const getAllMembers = () => {
  return Bromise.resolve(_clone(members))
    .tap(serverActions.receiveAllMembers)
}

export const getMemberByKey = (key) => {
  const member = _.find(members, {key: key})
  return Bromise.resolve(_clone(member))
    .tap(serverActions.receiveMember)
}

export const saveMember = (member) => {
  console.log('pretend this just saved the member to the DB via AJAX call...')

  if (member.key) {
    var existingMemberIndex = _.indexOf(members, _.find(members, {key: member.key}))
    members.splice(existingMemberIndex, 1, member)
  } else {
    member.key = member.firstName.toLowerCase() + '-' + member.lastName.toLowerCase()
    members.push(member)
  }

  return Bromise.resolve(_clone(member))
    .tap(serverActions.receiveMember)
}
