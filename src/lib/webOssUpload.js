// const LOCAL_NAME = 'local_name' // 上传时固定设置成用户的文件名
// const RANDOM_NAME = 'random_name' // 上传时固定设置成随机文件名，后缀保持跟客户端文件一致
const G_DIRNAME = 'merchant/web/'
function webOssUpload ({ filename, policy, accessid, signature, securityToken }) {
  return {
    'Filename': G_DIRNAME + filename,
    'key': G_DIRNAME + filename,
    'policy': policy,
    'OSSAccessKeyId': accessid,
    'x-oss-security-token': securityToken,
    'success_action_status': '200', // 让服务端返回200，不设置则默认返回204
    'signature': signature
  }
}
export default webOssUpload
