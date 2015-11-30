import React from 'react'

class LedgerRow extends React.Component {
  static propTypes = {
    item: React.PropTypes.shape({
      href: React.PropTypes.string.isRequired,
      date: React.PropTypes.string.isRequired,
      description: React.PropTypes.string.isRequired,
      points: React.PropTypes.number.isRequired
    })
  }

  render () {
    var item = this.props.item
    return (
      <tr>
        <td>{item.date}</td><td>{item.description}</td><td>{item.points}</td>
      </tr>
    )
  }
}

export default class MemberLedger extends React.Component {
  static propTypes = {
    ledgerItems: React.PropTypes.array
  }

  render () {
    return (
      <div>
        <table className='table table-striped table-bordered table-condensed'>
          <thead>
            <tr>
              <th>Date</th><th>Description</th><th>Points</th>
            </tr>
          </thead>
          <tbody>
            {this.props.ledgerItems.map(item => {
              const rowModel = {
                href: item.href,
                date: item.date.toLocaleDateString(),
                description: 'performed by ' + item.sitter,
                points: item.points
              }
              return <LedgerRow key={rowModel.href} item={rowModel} />
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
