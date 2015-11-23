import Bromise from 'bluebird'
import _ from 'lodash'
import members from './data/members'

var _clone = function (item) {
  return JSON.parse(JSON.stringify(item))
}

export const getAllMembers = () => {
  return _clone(members)
}

export const getMemberByKey = (key) => {
  let member = _.find(members, {key: key})
  return _clone(member)
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

  return _clone(member)
}

export const asyncGetAllMembers = () => {
  return Bromise.resolve(_clone(members))
}

export const asyncGetMemberByKey = (key) => {
  const member = _.find(members, {key: key})
  return Bromise.resolve(_clone(member))
}

export const asyncSaveMember = (member) => {
  console.log('pretend this just saved the member to the DB via AJAX call...')

  if (member.key) {
    var existingMemberIndex = _.indexOf(members, _.find(members, {key: member.key}))
    members.splice(existingMemberIndex, 1, member)
  } else {
    member.key = member.firstName.toLowerCase() + '-' + member.lastName.toLowerCase()
    members.push(member)
  }

  return Bromise.resolve(_clone(member))
}
