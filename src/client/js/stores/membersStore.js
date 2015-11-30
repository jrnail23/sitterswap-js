import Dispatcher from '../dispatcher'
import makeStore from '@lanetix/make-store'
import ActionTypes from '../constants/actionTypes'
import { getMemberByKey as getMemberByKeyApi } from '../api/membersApi'

// TODO: use Flux utils base stores here?

const _members = new Map()

const _addMembers = (members) => {
  members.forEach(member => {
    // TODO: maybe use ETags or versions here to decide whether to update state? does it even matter?
    _members.set(member.key, member)
  })
}

let methods = {
  getAllMembers () {
    return Array.from(_members.values())
  },

  getMemberByKey (key) {
    let member = _members.get(key)
    if (!member) {
      console.log('membersStore.getMemberByKey(' + key + ') -- not in store, going to API')
      getMemberByKeyApi(key)
    }
    return member
  }
}

let handlers = {
  [ActionTypes.RECEIVE_MEMBERS]: action => _addMembers(action.members),
  [ActionTypes.RECEIVE_MEMBER]: action => _addMembers([action.member])
}

export default makeStore(methods, handlers, Dispatcher)
