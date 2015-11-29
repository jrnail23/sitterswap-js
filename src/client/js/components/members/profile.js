import React from 'react'
import store from '../../stores/membersStore'
import EmailLink from '../common/emailLink'
import {Link} from 'react-router'

const getStateFromStore = (key) => {
  return {
    member: store.getMemberByKey(key)
  }
}

class Loader extends React.Component {
  render () {
    return (<blink>
      LOADING...
    </blink>)
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

    const {key} = props.params
    this.state = getStateFromStore(key)
  }

  componentDidMount () {
    store.addChangeListener(this.onStoreChanged)
  }

  componentWillUnmount () {
    store.removeChangeListener(this.onStoreChanged)
  }

  onStoreChanged () {
    const {key} = this.props.params
    this.setState(getStateFromStore(key))
  }

  renderMember (member) {
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
          <h3>Tasks</h3>
          <ul>
            <li><Link to={`/members/${member.key}/sits/add`} className='dev'>Record a sit</Link></li>
          </ul>
        </section>
      </div>
    )
  }

  render () {
    var member = this.state.member
    return (
        <div>
          {
            member ? this.renderMember(member) : <Loader />
          }
        </div>
      )
  }
}
