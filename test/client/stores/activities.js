import Immutable from 'immutable'
import _ from 'lodash'

describe('Activities Store', () => {
  it('try it', () => {
    let initialActivities = [
      {
        href: '22',
        date: '2015-11-02T05:00:00.000Z',
        sitter: 'jane-doe',
        client: 'james-nail',
        points: 5
      },
      {
        href: '24',
        date: '2015-10-02T05:00:00.000Z',
        sitter: 'jane-doe',
        client: 'james-nail',
        points: 3
      }
    ]

    let newActivities = [
      {
        href: '20',
        date: '2015-11-02T05:00:00.000Z',
        sitter: 'cristiano-ronaldo',
        client: 'jane-doe',
        points: 5
      },
      {
        href: '21',
        date: '2015-11-02T05:00:00.000Z',
        sitter: 'leo-messi',
        client: 'jane-doe',
        points: 5
      },
      {
        href: '22',
        date: '2015-11-02T05:00:00.000Z',
        sitter: 'jane-doe',
        client: 'james-nail',
        points: 5
      },
      {
        href: '23',
        date: '2015-11-02T05:00:00.000Z',
        sitter: 'brittany-starr',
        client: 'james-nail',
        points: 5
      }
    ]

    const Activity = Immutable.Record({
      //sitter: undefined,
      // date: undefined,
      // points: undefined,
      client: undefined,
      href: undefined
    })

    // Map<Key:Activity.client,Value:Map<Key:Activity.href,Value:Activity>>
    let _activities = Immutable.Map()

    const _addMemberActivities = (activities) => {
      let activityRecords = activities
        //.map(activity => Object.assign(activity, {date: new Date(activity.date)}))
        .map(activity => new Activity(activity))

      let activitiesByClient = _.groupBy(activityRecords, a => a.client)
      var finalMap = Immutable.Map(Object.keys(activitiesByClient)
        .map(client => [client, Immutable.Map(activitiesByClient[client].map(a => [a.href, a]))]))

      _activities = _activities.mergeDeep(finalMap)
    }
    console.log('-----------------------------')
    _addMemberActivities(initialActivities)
    console.log('initial', _activities)
    console.log('-----------------------------')
    _addMemberActivities(newActivities)
    console.log('updated', _activities)
  })
})
