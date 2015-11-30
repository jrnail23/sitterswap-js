// import makeServerRequest from './utils/makeServerRequest'
import Bromise from 'bluebird'
import _ from 'lodash'
import { receiveActivities, receiveActivity } from '../actions/activitiesServerActions'

let nextId = 5

const fakeActivitiesData = [
  {
    href: '/members/jane-doe/activities/1',
    date: new Date('11/20/2015'),
    client: 'jane-doe',
    sitter: 'brittany-starr',
    points: 8
  },
  {
    href: '/members/jane-doe/activities/2',
    date: new Date('10/12/2015'),
    client: 'jane-doe',
    sitter: 'john-public',
    points: 6
  },
  {
    href: '/members/james-nail/activities/3',
    date: new Date('07/19/2015'),
    client: 'james-nail',
    sitter: 'jane-doe',
    points: 4
  },
  {
    href: '/members/john-public/activities/4',
    date: new Date('07/23/2015'),
    client: 'john-public',
    sitter: 'brittany-starr',
    points: 9
  }
]

export const getMemberActivities = (memberKey) => {
  console.log('fakeActivitiesData', fakeActivitiesData)
  var filteredResults = _.filter(fakeActivitiesData, {client: memberKey})
  console.log('filteredResults:', filteredResults)
  return Bromise.resolve(filteredResults)
    .tap(activities => receiveActivities(memberKey, activities))
  // return makeServerRequest('/members/' + memberKey + '/activities/')
  //   .tap(receiveActivities)
}

export const recordActivity = (activity) => {
  console.log('pretend this just saved the member to the DB via AJAX call...')
  activity.href = '/members/' + activity.client + '/activities/' + nextId
  nextId++
  fakeActivitiesData.push(activity)
  return Bromise.resolve(activity)
    .tap(receiveActivity)
  // return makeServerRequest({
  //   resolve: 'response',
  //   method: 'POST',
  //   uri: '/members/' + activity.client + '/activities/',
  //   body: activity
  // })
  //   .then(responseMsg => {
  //     if (responseMsg.statusCode === 201) {
  //       return makeServerRequest({
  //         baseUrl: null,
  //         uri: responseMsg.headers.location
  //       })
  //         .then(receiveActivity)
  //     }
  //     throw new Error('wtf happened? I only really expect HTTP 201 with a location header, but received HTTP ' + responseMsg.statusCode + '(' + responseMsg.statusMessage + ')')
  //   })
}
