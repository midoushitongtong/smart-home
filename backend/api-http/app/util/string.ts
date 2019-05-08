export default {
  toUnicode: (data) => {
    if (data === '' || typeof data === 'undefined') return '请输入汉字';
    var str = '';
    for (var i = 0; i < data.length; i++) {
      str += "\\u" + data.charCodeAt(i).toString(16);
    }
    return str;
  }
}
