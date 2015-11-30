import React from 'react'
import {bindAll} from 'lodash'
import RecordSitForm from './recordSitForm'
import {recordNewActivity} from '../../actions/activitiesActions'
import moment from 'moment'

export default class extends React.Component {
  static contextTypes = {
    history: React.PropTypes.object.isRequired
  }

  static propTypes = {
    params: React.PropTypes.shape({
      memberKey: React.PropTypes.string.isRequired
    })
  }

  constructor (props, context) {
    super(props, context)

    bindAll(this, 'setSitState', 'sitFormIsValid', 'recordSit')

    this.state = {
      sit: {
        sitter: '',
        date: new Date().toLocaleDateString(),
        points: ''
      },
      errors: {}
    }
  }

  setSitState (event) {
    var field = event.target.name
    var value = event.target.value
    this.state.sit[field] = value
    return this.setState({sit: this.state.sit})
  }

  sitFormIsValid () {
    var formIsValid = true
    this.state.errors = {}

    if (!this.state.sit.sitter) {
      this.state.errors.sitter = 'Sitter is required'
      formIsValid = false
    }

    if (!this.state.sit.date) {
      this.state.errors.date = 'Date is required'
      formIsValid = false
    }

    if (!moment(this.state.sit.date).isValid()) {
      this.state.errors.date = 'Date must be a valid date'
      formIsValid = false
    }

    if (!this.state.sit.points) {
      this.state.errors.points = 'Points is required'
      formIsValid = false
    }

    this.setState({errors: this.state.errors})
    return formIsValid
  }

  recordSit (event) {
    event.preventDefault()

    if (!this.sitFormIsValid()) {
      return
    }
    var newSit = Object.assign({client: this.props.params.memberKey}, this.state.sit)
    recordNewActivity(newSit)
    this.context.history.pushState(null, `/members/${newSit.client}`)
  }

  render () {
    const memberKey = this.props.params.memberKey
    const sit = this.state.sit
    return (
      <div>
        <h1>Record a Sit for {memberKey}</h1>
        <RecordSitForm memberKey={memberKey} sit={sit}
          onChange={this.setSitState}
          onSave={this.recordSit}
          errors={this.state.errors} />
      </div>
    )
  }
}
