import Dispatcher from '../dispatcher'
import ActionTypes from '../constants/actionTypes'
import {getAllMembers} from '../api/membersApi'

export default class InitializeActions {
  static initApp () {
    Dispatcher.dispatch({
      type: ActionTypes.INITIALIZE,
      initialData: {
        members: getAllMembers()
      }
    })
  }
}
