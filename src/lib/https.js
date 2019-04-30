import HttpRequest from './request'
import config from '@/config'
const apiUrl = location.origin.indexOf('mct.api') > -1 ? `${location.origin}/index.php/` : `${location.origin}/merchant/index.php/`
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : apiUrl
const https = new HttpRequest(baseUrl)
export default https
