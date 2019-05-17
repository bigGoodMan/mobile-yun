import HttpReq from '@/lib/https'
// 上传图片到oss
function uploadImgToOssApi ({ callback, data }) {
  return HttpReq.uploadPost({
    baseURL: 'http://img-hahaipi.oss-cn-hangzhou.aliyuncs.com',
    // url: `?callback=${callback}`,
    data,
    notLogin: true
  })
}
// 获取oss签名等相关信息
function getOssInfoApi () {
  return HttpReq.formPost({
    url: 'Gift_storage/getUploadParameter'

  })
}
export {
  uploadImgToOssApi, // 上传图片到oss
  getOssInfoApi // 获取oss签名等相关信息
}
