import actionTypes from '../../../src/client/js/constants/actionTypes'
import proxyquire from 'proxyquire'
import sinon from 'sinon'

describe('Members Store', () => {
  let changeSpy
  let dispatch
  let membersStore

  beforeEach(() => {
    membersStore = proxyquire('../../../src/client/js/stores/members', {
      '../dispatcher': {
        register: (d) => {
          dispatch = d
        }
      }
    })
    changeSpy = sinon.spy()
    membersStore.addChangeListener(changeSpy)
  })

  afterEach(() => {
    membersStore.removeChangeListener(changeSpy)
  })

  it('should not be loaded by default', () => {
    membersStore.getAllMembers().should.be.empty()
    // membersStore.hasLoaded().should.be.false()
  })
})
