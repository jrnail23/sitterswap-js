import { defaults } from 'lodash'
import {receiveMembers, receiveMember} from '../actions/membersServerActions'
import request from 'http-as-promised'

const baseUrl = 'http://localhost:9006/'

const makeRequest = options => {
  const defaultOptions = {
    method: 'GET',
    json: true,
    resolve: 'body',
    baseUrl: baseUrl
  }

  let userOptions = typeof (options) === 'string' ? {uri: options} : options
  let opts = defaults(userOptions, defaultOptions)
  return request(opts)
}

export const getAllMembers = () => {
  return makeRequest('/members')
    .tap(receiveMembers)
}

export const getMemberByKey = (key) => {
  return makeRequest('/members/' + key)
    .tap(receiveMember)
}

export const saveMember = (member) => {
  return makeRequest({
    resolve: 'response',
    method: 'POST',
    uri: '/members',
    body: member
  })
    .then(responseMsg => {
      if (responseMsg.statusCode === 201) {
        return makeRequest({
          baseUrl: null,
          uri: responseMsg.headers.location
        })
          .then(receiveMember)
      }
      throw new Error('wtf happened? I only really expect HTTP 201 with a location header, but received HTTP ' + responseMsg.statusCode + '(' + responseMsg.statusMessage + ')')
    })
}
