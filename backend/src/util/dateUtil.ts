import moment from "moment";
import logger from "../_base/log/logger4js";

function fromString(str: string) {
  // console.log(str);
  const [day, month, year] = str.split("-")
  const date = new Date(Number(year), Number(month) - 1, Number(day))  
  return date;
}

function fromTimeString(str: string) {
  const [date,time] = str.split(" ")
  const [day, month, year] = date.split("-")
  const [hour,minute,second] = time.split(":")
  const datetime = new Date(Number(year), Number(month) - 1, Number(day),Number(hour),Number(minute),Number(second))  
  return datetime;
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
    let nowDate = new Date();
    nowDate.setHours(nowDate.getHours()+7);
    return date < nowDate;
  }
}

function getMillisecondBetween(date1: Date, date2: Date) {
  return date1.getTime() - date2.getTime();
}

function isValidDateTime(str: string, format: string = "DD-MM-YYYY HH:mm:ss") {

  return str && typeof str === "string" && moment(str, format, true).isValid();
}
function isValidDateTimeBeforeNow(str: string) {

  const format = "DD-MM-YYYY HH:mm:ss";
  const isValid =  str && typeof str === "string" && moment(str, format, true).isValid();

  if (!isValid) {
    return false;
  }
  else {
    const datetime = fromTimeString(str);
    let nowDate = new Date();
    nowDate.setHours(nowDate.getHours()+7);s
    return datetime < nowDate;
  }
}


const dateUtil = {
  isValidDate,
  isValidDateBeforeNow,
  fromString,
  fromTimeString,
  isValidDateTime,
  isValidDateTimeBeforeNow,
  getMillisecondBetween
}

export default dateUtil