import Dispatcher from '../dispatcher'
import makeStore from '@lanetix/make-store'
import ActionTypes from '../constants/actionTypes'
import { getMemberActivities as getMemberActivitiesApi } from '../api/activitiesApi'

const _activities = new Map()

const _addMemberActivities = (memberKey, activities) => {
  if (!_activities.has(memberKey)) {
    _activities.set(memberKey, new Map())
  }

  activities
    .map(activity => Object.assign(activity, {date: new Date(activity.date)}))
    .forEach(activity => {
      _activities.get(memberKey).set(activity.href, activity)
    })
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
