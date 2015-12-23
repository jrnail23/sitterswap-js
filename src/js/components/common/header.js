import React from 'react'
import { IndexLink, Link } from 'react-router'

export default class extends React.Component {
  render () {
    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <IndexLink to='/' className='navbar-brand'>
            <img src='images/TakomaRooster.png' style={{maxWidth: '150px', marginTop: '-10px'}} />
          </IndexLink>
          <ul className='nav navbar-nav'>
            <li><IndexLink to='/'>Home</IndexLink></li>
            <li><Link to='/members'>Members</Link></li>
          </ul>
        </div>
      </nav>
    )
  }
}
