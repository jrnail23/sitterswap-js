import React from 'react'
import Header from './common/header'

export default class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  render () {
    return (
      <div>
        <Header />
        <div className='container-fluid'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
