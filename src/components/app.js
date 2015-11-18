import React from 'react'
import Header from './common/header'

export default class App extends React.Component {
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

App.propTypes = {
  children: React.PropTypes.node
}
