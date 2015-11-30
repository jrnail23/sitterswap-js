import Dispatcher from '../dispatcher'
import makeStore from '@lanetix/make-store'
import ActionTypes from '../constants/actionTypes'
import { getMemberActivities as getMemberActivitiesApi } from '../api/activitiesApi'

const _activities = new Map()

const _addMemberActivities = (memberKey, activities) => {
  if (!_activities.has(memberKey)) {
    _activities.set(memberKey, [])
  }

  activities.forEach(activity => {
    _activities.get(memberKey).push(activity)
  })
}

let methods = {
  getMemberActivities (memberKey) {
    if (!_activities.has(memberKey)) {
      return getMemberActivitiesApi(memberKey)
    }
    return _activities.get(memberKey)
  }
}

let handlers = {
  [ActionTypes.RECEIVE_ACTIVITIES]: action => _addMemberActivities(action.memberKey, action.activities),
  [ActionTypes.RECEIVE_ACTIVITY]: action => _addMemberActivities(action.memberKey, [action.activity])
}

export default makeStore(methods, handlers, Dispatcher)
