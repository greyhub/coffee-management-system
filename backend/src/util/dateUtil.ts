import moment from "moment";

function fromString(str: string) {
  console.log(str);
  const [day, month, year] = str.split("-")
  const date = new Date(Number(year), Number(month) - 1, Number(day))  
  return date;
}

function isValidDate(str: string, format: string = "DD-MM-YYYY") {
  return str && typeof str === "string" && moment(str, format, true).isValid();
}
function isValidDateBeforeNow(str: string) {
  const format = "DD-MM-YYYY";
  const isValid =  str && typeof str === "string" && moment(str, format, true).isValid();

  if (!isValid) {
    return false;
  }
  else {
    const date = fromString(str)
    return date < new Date();
  }
}

const dateUtil = {
  isValidDate,
  isValidDateBeforeNow,
  fromString
}

export default dateUtil