import Dispatcher from '../dispatcher'
import makeStore from '@lanetix/make-store'
import ActionTypes from '../constants/actionTypes'

// TODO: use Flux utils base stores here?

const _members = {}

const _addMembers = (members) => {
  members.forEach(member => {
    if (!_members[member.key]) {
      // TODO: maybe use ETags or versions here to decide whether to update state? does it even matter?
      _members[member.key] = member
    }
  })
}

let methods = {
  getAllMembers () {
    let keys = Object.keys(_members)
    return keys
      ? keys.map(key => _members[key])
      : []
  },

  getMemberByKey (key) {
    return _members[key]
  }
}

let handlers = {
  [ActionTypes.RECEIVE_MEMBERS]: action => _addMembers(action.members),
  [ActionTypes.RECEIVE_MEMBER]: action => _addMembers([action.member])
}

export default makeStore(methods, handlers, Dispatcher)
