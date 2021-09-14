/**
 * 文件上传插件
 * author：雨晴
 */
import apiHelper from 'apiHelper';

// 格式验证
function validationFormat(file) {
  let format = ['jpg', 'png', 'gif', 'bmp', 'jpeg', 'doc', 'docx', 'ppt', 'pptx', 'txt', 'zip', 'rar', 'csv', 'xls', 'xlsx', 'pdf', 'ico', 'mp3', 'mp4', 'rmvb', 'avi', 'amr', 'wma', 'acc'],
    { name } = file;

  return format.some(item => name.endsWith(item))
}

const upFile = (files, type, progress, param) => {
  return new Promise((resolve, reject) => {
    if (!validationFormat(files)) {
      return resolve({ e: 1 })
    }

    var data = new FormData();
    let nowId = Math.random().toString();
    data.append('file', files);
    data.append('category', type);
    if (param && param.constructor === Object) {
      for (const key in param) {
        data.append(key, param[key]);
      }
    }

    var xhr = new XMLHttpRequest();
    xhr.upload.onprogress = function (event) {
      progress && progress(event, nowId);
    }
    if (type == 'image') {
      xhr.open('post', apiHelper.getApi("uploadImg"));
    } else if (type == "excel") {
      xhr.open('post', apiHelper.getApi("uploadExcel"));
    }

    xhr.setRequestHeader('token', window.localStorage.getItem('token'));
    xhr.send(data)

    xhr.onload = (e) => {
      var args = JSON.parse(e.currentTarget.response);
      args.fileId = nowId;
      if (args.code == 200) {
        resolve(args)
      } else {
        reject(args)
      }
    }

    xhr.onerror = (e) => {
      reject({ error: e, fileId: nowId });
    }
  })
}
export default upFile;
