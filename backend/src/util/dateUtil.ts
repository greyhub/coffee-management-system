import moment from "moment";
import logger from "../_base/log/logger4js";

function fromString(str: string) {
  console.log(str);
  const [day, month, year] = str.split("-")
  const date = new Date(Number(year), Number(month) - 1, Number(day))  
  return date;
}

function fromTimeString(str: string) {
  logger.info('time:'
      + str);
  console.log(str);
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
  logger.info('time:'
      + str);
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

function getMillisecondBetween(date1: Date, date2: Date) {
  return date1.getTime() - date2.getTime();
}

function isValidDateTime(str: string, format: string = "DD-MM-YYYY HH:MM:SS") {
  logger.info('time:'
      + str);
  return str && typeof str === "string" && moment(str, format, true).isValid();
}
function isValidDateTimeBeforeNow(str: string) {
  logger.info('time1:'
      + str);
  const format = "DD-MM-YYYY HH:mm:ss";
  const isValid =  str && typeof str === "string" && moment(str, format, true).isValid();
  logger.info('time2:'
  + str + " isvalid:" + moment(str, format, true).isValid());
  if (!isValid) {
    return false;
  }
  else {
    const datetime = fromTimeString(str)
    return datetime < new Date();
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