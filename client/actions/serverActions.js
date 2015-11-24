import Dispatcher from '../dispatcher'
import actionTypes from '../constants/actionTypes'

export default {
  receiveAllMembers (members) {
    Dispatcher.dispatch({
      type: actionTypes.RECEIVE_ALL_MEMBERS,
      members
    })
  },

  receiveMember (member) {
    Dispatcher.dispatch({
      type: actionTypes.RECEIVE_MEMBER,
      member
    })
  }
}
