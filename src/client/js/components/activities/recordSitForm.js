import React from 'react'
import Input from '../common/textInput'
import {Link} from 'react-router'

export default class extends React.Component {
  static propTypes = {
    memberKey: React.PropTypes.string.isRequired,
    sit: React.PropTypes.shape({
      sitter: React.PropTypes.string.isRequired,
      date: React.PropTypes.string.isRequired,
      points: React.PropTypes.string.isRequired
    }).isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object
  }

  render () {
    const memberKey = this.props.memberKey
    const sit = this.props.sit
    return (
      <div>
        <form>
          <Input name='sitter'
            label='Sitter'
            value={sit.sitter}
            onChange={this.props.onChange}
            error={this.props.errors.sitter} />
          <Input name='date'
              label='Date'
              value={sit.date}
              onChange={this.props.onChange}
              error={this.props.errors.date} />
            <Input name='points'
              label='Points'
              value={sit.points}
              onChange={this.props.onChange}
              error={this.props.errors.points} />
            <Link to={`/members/${memberKey}`}
            className='btn btn-default'>Cancel</Link>
          <input type='submit'
            value='Save'
            className='btn btn-primary'
            onClick={this.props.onSave} />
        </form>
      </div>
    )
  }
}
