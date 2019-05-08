export default {
  unicodeToChinese: (data: any) => {
    if (data === '' || typeof data === 'undefined') return '请输入十六进制unicode';
    return unescape(data.replace(/\\u/gi, '%u'));
  }
}
