import Dispatcher from '../dispatcher'
import makeStore from '@lanetix/make-store'
import ActionTypes from '../constants/actionTypes'
import { getMemberByKey as getMemberByKeyApi } from '../api/membersApi'
import Immutable from 'immutable'

const Member = Immutable.Record({
  key: undefined,
  firstName: undefined,
  lastName: undefined,
  emailAddress: undefined
})

let _members = Immutable.Map()

const _addMembers = (members) => {
  const memberRecords = members.map(m => new Member({key: m.key, firstName: m.firstName, lastName: m.lastName, emailAddress: m.emailAddress}))
  _members = _members.withMutations(map => memberRecords.forEach(m => map.set(m.key, m)))
}

let methods = {
  getAllMembers () {
    return _members.toArray()
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
