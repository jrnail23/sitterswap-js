import React from 'react'
import { IndexLink } from 'react-router'

export default class extends React.Component {
  render () {
    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <IndexLink to='/' className='navbar-brand'>
            <img src='https://www.npmjs.com/static/images/npm-logo.svg' style={{height: '49px', width: '80px'}} />
          </IndexLink>
          <ul className='nav navbar-nav'>
            <li><IndexLink to='/'>Home</IndexLink></li>
          </ul>
        </div>
      </nav>
    )
  }
}
