import Dispatcher from '../dispatcher'
import ActionTypes from '../constants/actionTypes'
import {recordActivity} from '../api/activitiesApi'

export const recordNewActivity = (activity) => {
  var newActivity = recordActivity(activity)
  Dispatcher.dispatch({
    type: ActionTypes.RECORD_NEW_ACTIVITY,
    activity: newActivity
  })
}
