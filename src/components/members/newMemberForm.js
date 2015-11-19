import React from 'react'

export default class NewMemberForm extends React.Component {
    render () {
      return (
        <div className='dev'>
          <form>
            <div className='form-group'>
              <label htmlFor='firstName'>First Name</label>
              <div className='field'>
                <input type='text'
                  name='firstName'
                  className='form-control'
                  placeholder='First Name'
                  ref='firstName'
                  value='' />
                <div className='input'>(error goes here)</div>
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='lastName'>Last Name</label>
              <div className='field'>
                <input type='text'
                  name='lastName'
                  className='form-control'
                  placeholder='Last Name'
                  ref='lastName'
                  value='' />
                <div className='input'>(error goes here)</div>
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='emailAddress'>Email Address</label>
              <div className='field'>
                <input type='text'
                  name='emailAddress'
                  className='form-control'
                  placeholder='me@email.com'
                  ref='emailAddress'
                  value='' />
                <div className='input'>(error goes here)</div>
              </div>
            </div>
            <input type='submit'
              value='Save'
              className='btn btn-default' />
          </form>
        </div>
      )
    }
}
