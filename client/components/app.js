import React from 'react'
import Header from './common/header'
import RouteHandler from 'react-router'

let App = React.createClass({
  render: function () {
    <div>
      <Header />
      <div className='container-fluid'>
        <RouteHandler />
      </div>
    </div>
  }
})

module.exports = App
