import React from 'react'
import Input from '../common/textInput'

export default class NewMemberForm extends React.Component {
  static propTypes = {
    member: React.PropTypes.shape({
      firstName: React.PropTypes.string.isRequired,
      lastName: React.PropTypes.string.isRequired,
      emailAddress: React.PropTypes.string.isRequired
    }).isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object
  }

  render () {
    return (
      <div>
        <form>
          <Input name='firstName'
            label='First Name'
            value={this.props.member.firstName}
            onChange={this.props.onChange}
            error={this.props.errors.firstName} />
          <Input name='lastName'
            label='Last Name'
            value={this.props.member.lastName}
            onChange={this.props.onChange}
            error={this.props.errors.lastName} />
          <Input name='emailAddress'
            label='Email Address'
            value={this.props.member.emailAddress}
            onChange={this.props.onChange}
            error={this.props.errors.emailAddress} />

          <input type='submit'
            value='Save'
            className='btn btn-default'
            onClick={this.props.onSave} />
        </form>
      </div>
    )
  }
}
