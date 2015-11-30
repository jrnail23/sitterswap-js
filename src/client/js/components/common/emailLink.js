import React from 'react'

export default class extends React.Component {
  static propTypes = {
    displayText: React.PropTypes.string,
    emailAddress: React.PropTypes.string.isRequired
  }

  render () {
    return (<a href={'mailto:' + this.props.emailAddress}>{this.props.displayText || this.props.emailAddress}</a>)
  }
}
