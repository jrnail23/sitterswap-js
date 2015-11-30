import Dispatcher from '../dispatcher'
import actionTypes from '../constants/actionTypes'

export const receiveActivities = (memberKey, activities) => {
  Dispatcher.dispatch({
    type: actionTypes.RECEIVE_ACTIVITIES,
    activities,
    memberKey
  })
}

export const receiveActivity = (activity) => {
  Dispatcher.dispatch({
    type: actionTypes.RECEIVE_ACTIVITY,
    activity,
    memberKey: activity.client
  })
}
