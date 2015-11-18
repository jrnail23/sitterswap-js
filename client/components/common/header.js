import React from 'react'
import { Router, Link } from 'react-router'

var Header = React.createClass({
  render: function () {
    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <Link to='app' className='navbar-brand'>
            <img src='https://www.npmjs.com/static/images/npm-logo.svg' />
          </Link>
          <ul className='nav navbar-nav'>
            <li><Link to='app'>Home</Link></li>
          </ul>
        </div>
      </nav>
    )
  }
})

module.exports = Header
