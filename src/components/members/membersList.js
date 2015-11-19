import React from 'react'
import {Link} from 'react-router'

export default class extends React.Component {
  render () {
    return (
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr className='dev'>
              <td><Link to='/members/firstname-lastname'>LastName, FirstName</Link></td>
              <td><a href='mailto:fakeemail@email.com'>fakeemail@email.com</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
