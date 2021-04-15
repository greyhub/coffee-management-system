function isOnlyDigits(str: string) {
  return /^\d+$/.test(str);
}

const numberUtil = {
  isOnlyDigits
}

export default numberUtil