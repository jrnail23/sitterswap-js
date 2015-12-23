import React from 'react'
import Header from './common/header'
import {getAllMembers} from '../api/membersApi'

export default class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  componentDidMount () {
    getAllMembers()
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
