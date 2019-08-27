export default {
  toUnicode: data => {
    const res: any = [];
    for (let i = 0; i < data.length; i++) {
      res[i] = ('00' + data.charCodeAt(i).toString(16)).slice(-4);
    }
    return '\\u' + res.join('\\u');
  }
};
