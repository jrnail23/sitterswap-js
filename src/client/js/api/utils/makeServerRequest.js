import request from 'http-as-promised'
import config from '../../config'
import { defaults } from 'lodash'

export default options => {
  const defaultOptions = {
    method: 'GET',
    json: true,
    resolve: 'body',
    baseUrl: config.serverBaseUrl
  }

  const userOptions = typeof (options) === 'string' ? {uri: options} : options
  const opts = defaults(userOptions, defaultOptions)
  return request(opts)
}
