function getKeyByValue(obj: any, value: any) {
  const result =  Object.keys(obj).find(key => obj[key] === value);
  if (result === null || result === undefined) {
    return "";
  }
  else {
    return result;
  }
}
function isUndefinedOrNull(obj: any) {
  return !(obj || obj === 0);
}

const objectUtil = {
  getKeyByValue,
  isUndefinedOrNull
}

export default objectUtil