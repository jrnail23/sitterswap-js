import React from 'react'
import store from '../../stores/membersStore'

const getStateFromStore = (key) => {
  return {
    member: store.getMemberByKey(key)
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

  render () {
    var member = this.state.member
    return (
        <div>
          <h1>Member Profile</h1>
          <h2>{member.firstName + ' ' + member.lastName}</h2>
          <div className='dev'>(member profile goes here)</div>
        </div>
      )
  }
}
