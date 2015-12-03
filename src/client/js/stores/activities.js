import Dispatcher from '../dispatcher'
import makeStore from '@lanetix/make-store'
import ActionTypes from '../constants/actionTypes'
import { getMemberActivities as getMemberActivitiesApi } from '../api/activitiesApi'
import Immutable from 'immutable'
import _ from 'lodash'

const Activity = Immutable.Record({
  sitter: undefined,
  date: undefined,
  points: undefined,
  client: undefined,
  href: undefined
})

// Map<Key:Activity.client,Value:Map<Key:Activity.href,Value:Activity>>
let _activities = Immutable.Map()

const _addMemberActivities = (activities) => {
  let activityRecords = activities
    .map(activity => Object.assign(activity, {date: new Date(activity.date)}))
    .map(activity => new Activity(activity))

  let activitiesByClient = _.groupBy(activityRecords, a => a.client)
  var finalMap = Immutable.Map(Object.keys(activitiesByClient)
    .map(client => [client, Immutable.Map(activitiesByClient[client].map(a => [a.href, a]))]))

  _activities = _activities.mergeDeep(finalMap)
}

let methods = {
  getMemberActivities (memberKey) {
    var memberActivities = _activities.get(memberKey)
    if (!memberActivities) {
      getMemberActivitiesApi(memberKey)
      return []
    }
    let activities = Array.from(memberActivities.values())
    return activities || []
  }
}

let handlers = {
  [ActionTypes.RECEIVE_ACTIVITIES]: action => _addMemberActivities(action.memberKey, action.activities),
  [ActionTypes.RECEIVE_ACTIVITY]: action => _addMemberActivities(action.memberKey, [action.activity])
}

export default makeStore(methods, handlers, Dispatcher)
