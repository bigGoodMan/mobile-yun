// (function (global, factory) {
//   typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (window.imageResizeTools = factory())
// }(this, function () {
//   'use strict'
// (function (W, D, U) {
const methods = {};

/* 通过一个图片的url加载所需要的图片对象
 * url参数传入图片的url
 * fn为回调方法包含，一个Image对象的参数
 */
methods.urltoImage = function(url, fn) {
  const img = new Image();
  img.src = url;
  img.onload = function() {
    fn(img);
  };
};

/* 将一个Image对象转变为一个Canvas类型对象
 * image参数传入一个Image对象
 */
methods.imagetoCanvas = function(image, position) {
  const cvs = document.createElement("canvas");
  const ctx = cvs.getContext("2d");
  const w = image.width;
  const h = image.height;
  switch (position) {
    case 3:
      cvs.width = w;
      cvs.height = h;
      // ctx.fillStyle = '#FFFFFF'
      // ctx.fillRect(0, 0, w, h)

      // 清除画布
      ctx.clearRect(0, 0, -w / 2, -h / 2);
      ctx.translate(w / 2, h / 2);
      ctx.rotate((180 * Math.PI) / 180);
      ctx.drawImage(image, -w / 2, -h / 2);
      break;
    case 6:
      cvs.width = h;
      cvs.height = w;
      // ctx.fillStyle = '#FFFFFF'
      // ctx.fillRect(0, 0, w, h)
      // 清除画布
      ctx.clearRect(0, 0, -w / 2, -h / 2);
      ctx.translate(h / 2, w / 2);
      ctx.rotate((90 * Math.PI) / 180);
      ctx.drawImage(image, -w / 2, -h / 2);
      break;
    case 8:
      cvs.width = h;
      cvs.height = w;
      // ctx.fillStyle = '#FFFFFF'
      // ctx.fillRect(0, 0, w, h)
      // 清除画布
      ctx.clearRect(0, 0, -w / 2, -h / 2);
      ctx.translate(h / 2, w / 2);
      ctx.rotate((270 * Math.PI) / 180);
      ctx.drawImage(image, -w / 2, -h / 2);
      break;
    default:
      cvs.width = w;
      cvs.height = h;
      // ctx.fillStyle = '#FFFFFF'
      // ctx.fillRect(0, 0, w, h)
      // 清除画布
      ctx.clearRect(0, 0, 0, 0);
      ctx.drawImage(image, 0, 0);
      break;
  }
  return cvs;
};

/* 将一个Canvas对象压缩转变为一个Blob类型对象
 * canvas参数传入一个Canvas对象
 * quality参数传入一个0-1的number类型，表示图片压缩质量
 * fn为回调方法，包含一个Blob对象的参数
 */
methods.canvasResizetoFile = function(
  canvas,
  quality = 1,
  fn,
  type = "image/jpeg"
) {
  // 为了兼容旧版本
  // type = 'image/jpeg' // png居然会变大
  // quality = 10e-9
  if (canvas.toBlob) {
    canvas.toBlob(
      function(blob) {
        fn(blob);
      },
      type,
      quality
    );
  } else {
    fn(canvas.toDataURL(type, quality));
  }
};

/* 将一个Canvas对象压缩转变为一个dataURL字符串
 * canvas参数传入一个Canvas对象
 * quality参数传入一个0-1的number类型，表示图片压缩质量
 */
methods.canvasResizetoDataURL = function(canvas, quality) {
  return canvas.toDataURL("image/jpeg", quality);
};
/**
 * 判断图片方向
 * @param {Blob} file 图片blob流文件
 * @param {Function} callback // 回调
 */
function imagePosition(file, type, callback) {
  const reader = new FileReader();
  let position = -1;
  reader.onloadend = function() {
    // fn(e.target.result, type)
    const view = new DataView(this.result);
    // let arrayBufferView = new Uint8Array(this.result)
    // let blob = new Blob([ arrayBufferView ], { type })
    // let urlCreator = window.URL || window.webkitURL || {}.createObjectURL
    // let objectURL = urlCreator.createObjectURL(blob);
    // urlCreator.revokeObjectURL(objectURL) 当图片加载完成之后释放它

    if (view.getUint16(0, false) !== 0xffd8) {
      position = -2;
      return callback(position);
    }
    const length = view.byteLength;
    let offset = 2;
    while (offset < length) {
      const marker = view.getUint16(offset, false);
      offset += 2;
      if (marker === 0xffe1) {
        if (view.getUint32((offset += 2), false) !== 0x45786966) {
          position = -1;
          return callback(position);
        }
        const little = view.getUint16((offset += 6), false) === 0x4949;
        offset += view.getUint32(offset + 4, little);
        const tags = view.getUint16(offset, little);
        offset += 2;
        for (let i = 0; i < tags; i++) {
          if (view.getUint16(offset + i * 12, little) === 0x0112) {
            return callback(view.getUint16(offset + i * 12 + 8, little));
          }
        }
      } else if ((marker & 0xff00) !== 0xff00) break;
      else offset += view.getUint16(offset, false);
    }
    return callback(position);
  };
  reader.readAsArrayBuffer(file);
}
/* 将File（Blob）类型文件转变为dataURL字符串
 * file参数传入一个File（Blob）类型文件
 * fn为回调方法，包含一个dataURL字符串的参数
 */
methods.filetoDataURL = function(file, fn) {
  const reader = new FileReader();
  const type = file.type;
  reader.onloadend = function(e) {
    // e.target.result base64
    imagePosition(file, type, function(position) {
      fn(e.target.result, type, position);
    });
  };
  reader.readAsDataURL(file);
};

/* 将一串dataURL字符串转变为Image类型文件
 * dataurl参数传入一个dataURL字符串
 * fn为回调方法，包含一个Image类型文件的参数
 */
methods.dataURLtoImage = function(dataurl, fn) {
  const img = new Image();
  img.onload = function() {
    fn(img);
  };
  img.src = dataurl;
};

/* 将一串dataURL字符串转变为Blob类型对象
 * dataurl参数传入一个dataURL字符串
 */
methods.dataURLtoFile = function(dataurl) {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime
  });
};

// 缩小图片进行图片压缩
methods.canvasImageResize = function(img, width, height, position) {
  // 缩放图片需要的canvas
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  // 图片原始尺寸
  const originWidth = img.width;
  const originHeight = img.height;
  // 最大尺寸限制
  const maxWidth = width;
  const maxHeight = height;
  // 目标尺寸
  let targetWidth = originWidth;
  let targetHeight = originHeight;
  // 图片尺寸超过400x400的限制
  if (originWidth > maxWidth || originHeight > maxHeight) {
    if (originWidth / originHeight > maxWidth / maxHeight) {
      // 更宽，按照宽度限定尺寸
      targetWidth = maxWidth;
      targetHeight = Math.round(maxWidth * (originHeight / originWidth));
    } else {
      targetHeight = maxHeight;
      targetWidth = Math.round(maxHeight * (originWidth / originHeight));
    }
  }

  // canvas对图片进行缩放
  // canvas.width = targetWidth
  // canvas.height = targetHeight
  // polyfill 提供了这个方法用来获取设备的 pixel ratio
  // let getPixelRatio = function (ctx) {
  //   let backingStore = ctx.backingStorePixelRatio ||
  //         ctx.webkitBackingStorePixelRatio ||
  //         ctx.mozBackingStorePixelRatio ||
  //         ctx.msBackingStorePixelRatio ||
  //         ctx.oBackingStorePixelRatio ||
  //         ctx.backingStorePixelRatio || 1
  //   return (window.devicePixelRatio || 1) / backingStore
  // }
  // let ratio = getPixelRatio(cxt)
  // cs2.width = targetWidth
  // cs2.height = targetHeight
  // console.log(ratio, 'ratio')
  // cxt.drawImage(img, 0, 0, targetWidth, targetHeight)
  // cxt.scale('50%', '50%')
  // cs2.style.width = targetWidth + 'px'
  // cs2.style.height = targetHeight + 'px'
  // let img2 = document.createElement('img')
  // img2.src = cs2.toDataURL()
  // document.body.appendChild(img2)
  // document.body.appendChild(img)
  // 清除画布
  if (position === 6 || position === 8) {
    canvas.width = targetHeight;
    canvas.height = targetWidth;
    context.clearRect(0, 0, targetHeight, targetWidth);
  } else {
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    context.clearRect(0, 0, targetWidth, targetHeight);
  }
  // context.clearRect(0, 0, targetWidth, targetHeight)
  // 图片压缩
  switch (position) {
    case 3: // 180度
      context.translate(targetWidth, targetHeight);
      context.rotate((180 * Math.PI) / 180);
      context.drawImage(img, 0, 0, targetWidth, targetHeight);
      break;
    case 6: // 顺时针90度
      context.translate(targetHeight, 0);
      context.rotate((90 * Math.PI) / 180);
      context.drawImage(img, 0, 0, targetWidth, targetHeight);
      break;
    case 8: // 逆时针90度
      context.translate(0, targetWidth);
      context.rotate((-90 * Math.PI) / 180);
      context.drawImage(img, 0, 0, targetWidth, targetHeight);
      break;
    default:
      context.drawImage(img, 0, 0, targetWidth, targetHeight);
      break;
  }
  return canvas;
};

/** *以下是进一步封装***/

/* 将File（Blob）类型文件压缩后再返回Blob类型对象
 * file参数传入一个File（Blob）类型文件
 * quality参数传入一个0-1的number类型，表示图片压缩质量
 * fn为回调方法，包含一个Blob类型文件的参数
 * 使用示例：
 * var file = document.getElementById('demo').files[0];
 * imageResizeTool.fileResizetoFile(file,0.6,function(res){
 *     console.log(res);
 *     //做出你要上传的操作；
 * })
 */
methods.fileResizetoFile = function(file, fn, quality, width, height) {
  methods.filetoDataURL(file, function(dataurl, type, position) {
    methods.dataURLtoImage(dataurl, function(image) {
      if (width && height) {
        methods.canvasResizetoFile(
          methods.canvasImageResize(image, width, height, position),
          quality,
          fn,
          type
        );
      } else {
        methods.canvasResizetoFile(
          methods.imagetoCanvas(image, position),
          quality,
          fn,
          type
        );
      }
    });
  });
};
export default methods;
// W.imageResizeTool = methods
// }))
// }(window, document, undefined))
