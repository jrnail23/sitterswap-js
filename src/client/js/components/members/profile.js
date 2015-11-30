import React from 'react'
import membersStore from '../../stores/membersStore'
import activitiesStore from '../../stores/activitiesStore'
import EmailLink from '../common/emailLink'
import Ledger from '../activities/memberLedger'
import NotFoundPage from '../not-found'

const getStateFromStores = (key) => {
  return {
    member: membersStore.getMemberByKey(key),
    ledgerItems: activitiesStore.getMemberActivities(key)
  }
}

export default class MemberProfilePage extends React.Component {
  static propTypes = {
    params: React.PropTypes.shape({
      key: React.PropTypes.string.isRequired
    })
  }

  constructor (props, context) {
    super(props, context)
    this.onStoreChanged = this::this.onStoreChanged
    this.state = getStateFromStores(props.params.key)
  }

  componentDidMount () {
    membersStore.addChangeListener(this.onStoreChanged)
    activitiesStore.addChangeListener(this.onStoreChanged)
  }

  componentWillUnmount () {
    membersStore.removeChangeListener(this.onStoreChanged)
    activitiesStore.removeChangeListener(this.onStoreChanged)
  }

  onStoreChanged () {
    this.setState(getStateFromStores(this.props.params.key))
  }

  render () {
    var member = this.state.member
    var ledgerItems = this.state.ledgerItems

    if (!member) {
      return (
        <NotFoundPage />
      )
    }

    return (
      <div>
        <h1>Member Profile</h1>
        <h2>{member.firstName + ' ' + member.lastName}</h2>
        <section>
          <h3>Contact Info</h3>
          <dl>
            <dt>Email Address</dt>
            <dd><EmailLink emailAddress={member.emailAddress} /></dd>
          </dl>
        </section>
        <section>
          <h3>Sits</h3>
          <div>
            <form className='dev'>
              (form goes here)
            </form>
          </div>
          <Ledger ledgerItems={ledgerItems} member={member} />
        </section>
      </div>
    )
  }
}
