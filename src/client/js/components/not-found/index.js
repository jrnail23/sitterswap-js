import React from 'react'
import {Link} from 'react-router'

export default class extends React.Component {
  render () {
    return (
      <div>
        <h1>Page Not Found</h1>
        <p>This is not the page you&apos;re looking for.</p>
        <p><Link to='/'>Back to Home</Link></p>
      </div>
    )
  }
}
