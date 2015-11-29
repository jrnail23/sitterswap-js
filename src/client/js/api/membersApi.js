import { defaults } from 'lodash'
import serverActions from '../actions/serverActions'
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
    .tap(serverActions.receiveAllMembers)
}

export const getMemberByKey = (key) => {
  return makeRequest('/members/' + key)
    .tap(serverActions.receiveMember)
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
          .then(serverActions.receiveMember)
      }
      throw new Error('wtf happened? I only really expect HTTP 201 with a location header, but received HTTP ' + responseMsg.statusCode + '(' + responseMsg.statusMessage + ')')
    })
}
