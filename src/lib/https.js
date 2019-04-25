import HttpRequest from './request'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : `${location.origin}/merchant/index.php/`
const https = new HttpRequest(baseUrl)
export default https
