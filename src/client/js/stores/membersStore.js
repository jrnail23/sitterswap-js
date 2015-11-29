import Dispatcher from '../dispatcher'
import makeStore from '@lanetix/make-store'
import ActionTypes from '../constants/actionTypes'
import _ from 'lodash'

var _members = []

let methods = {
  getAllMembers () {
    return _members
  },

  getMemberByKey (key) {
    return _.find(_members, {key: key})
  }
}

let handlers = {
  [ActionTypes.RECEIVE_ALL_MEMBERS]: action => _members = action.members,
  [ActionTypes.RECEIVE_MEMBER]: action => { _members.push(action.member) }
}

export default makeStore(methods, handlers, Dispatcher)
