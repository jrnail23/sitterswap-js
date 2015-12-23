import Dispatcher from '../dispatcher'
import actionTypes from '../constants/actionTypes'

export const receiveMembers = (members) => {
  Dispatcher.dispatch({
    type: actionTypes.RECEIVE_MEMBERS,
    members: members
  })
}

export const receiveMember = (member) => {
  Dispatcher.dispatch({
    type: actionTypes.RECEIVE_MEMBER,
    member: member
  })
}
