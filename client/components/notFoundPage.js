import React from 'react'
import Link from 'react-router'

var NotFoundPage = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Page Not Found</h1>
        <p>This is not the page you&apos;re looking for.</p>
      </div>
    )
  }
})

module.exports = NotFoundPage
