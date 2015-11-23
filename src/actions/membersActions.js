import Dispatcher from '../dispatcher'
import ActionTypes from '../constants/actionTypes'
import {saveMember} from '../api/membersApi'

export const addMember = (member) => {
  var newMember = saveMember(member)
  console.log('in addMember action')
  Dispatcher.dispatch({
    actionType: ActionTypes.ADD_MEMBER,
    member: newMember
  })
}
