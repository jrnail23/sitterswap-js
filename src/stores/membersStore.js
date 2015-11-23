import Dispatcher from '../dispatcher'
import ActionTypes from '../constants/actionTypes'
import {EventEmitter} from 'events'
import _ from 'lodash'

var CHANGE_EVENT = 'change'

var _members = []

var MembersStore = _.extend({
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback)
  },
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },
  emitChange: function () {
    this.emit(CHANGE_EVENT)
  },
  getAllMembers: function () {
    return _members
  },
  getMemberByKey: function (key) {
    return _.find(_members, {key: key})
  }
}, EventEmitter.prototype)

MembersStore.dispatcher = Dispatcher.register(function (action) {
  switch (action.actionType) {
    case ActionTypes.INITIALIZE:
      _members = action.initialData.members
      MembersStore.emitChange()
      break
    case ActionTypes.ADD_MEMBER:
      _members.push(action.member)
      MembersStore.emitChange()
      break
    default:
      // no-op
  }
})

export default MembersStore
