import makeServerRequest from './utils/makeServerRequest'
import { receiveActivities, receiveActivity } from '../actions/activitiesServerActions'

export const getMemberActivities = (memberKey) => {
  return makeServerRequest('/members/' + memberKey + '/activities/')
    .tap(activities => receiveActivities(memberKey, activities))
}

export const recordActivity = (activity) => {
  return makeServerRequest({
    resolve: 'response',
    method: 'POST',
    uri: '/members/' + activity.client + '/activities/',
    body: activity
  })
    .then(responseMsg => {
      if (responseMsg.statusCode === 201) {
        return makeServerRequest({
          baseUrl: null,
          uri: responseMsg.headers.location
        })
          .then(receiveActivity)
      }
      throw new Error('wtf happened? I only really expect HTTP 201 with a location header, but received HTTP ' + responseMsg.statusCode + '(' + responseMsg.statusMessage + ')')
    })
}
