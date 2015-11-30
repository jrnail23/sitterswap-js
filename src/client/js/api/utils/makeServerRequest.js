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

  let userOptions = typeof (options) === 'string' ? {uri: options} : options
  let opts = defaults(userOptions, defaultOptions)
  return request(opts)
}
