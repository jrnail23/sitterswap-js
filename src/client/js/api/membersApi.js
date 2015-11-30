import makeServerRequest from './utils/makeServerRequest'
import {receiveMembers, receiveMember} from '../actions/membersServerActions'

export const getAllMembers = () => {
  return makeServerRequest('/members')
    .tap(receiveMembers)
}

export const getMemberByKey = (key) => {
  return makeServerRequest('/members/' + key)
    .tap(receiveMember)
}

export const saveMember = (member) => {
  return makeServerRequest({
    resolve: 'response',
    method: 'POST',
    uri: '/members',
    body: member
  })
    .then(responseMsg => {
      if (responseMsg.statusCode === 201) {
        return makeServerRequest({
          baseUrl: null,
          uri: responseMsg.headers.location
        })
          .then(receiveMember)
      }
      throw new Error('wtf happened? I only really expect HTTP 201 with a location header, but received HTTP ' + responseMsg.statusCode + '(' + responseMsg.statusMessage + ')')
    })
}
