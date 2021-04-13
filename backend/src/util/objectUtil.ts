const getKeyByValue: any = (obj: any, value: any) => Object.keys(obj).find(key => obj[key] === value);
const isUndefinedOrNull: any = (obj: any) => !(obj || obj === 0);

export default {
  getKeyByValue,
  isUndefinedOrNull
}