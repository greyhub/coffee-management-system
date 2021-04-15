import numberUtil from "./numberUtil";

function isCCCD(cccd: any) {
  return cccd && typeof cccd === "string" && cccd.trim().length === 12 && numberUtil.isOnlyDigits(cccd.trim());
}

const businessUtil = {
  isCCCD
}

export default businessUtil