import validator from "validator";

function isValidString(str: string, min: number = 1, max: number = 50) {
  return str && typeof str === "string" && validator.isLength(str.trim(), {min: min, max: max});
}

const stringUtil = {
  isValidString
}

export default stringUtil