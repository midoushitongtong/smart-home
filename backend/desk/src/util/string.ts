export default {
  unicodeToChinese: (data: any) => {
    data = data.replace(/\\/g, "%");
    return unescape(data);
  }
}
