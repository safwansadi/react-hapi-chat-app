const moment = require("moment-timezone");

exports.DATE_FORMAT = {
  DATETIME_GENERAL_TABLE: "YYYY, MMMM Do, h:mm:ss a",
  DATE_REPORT: "DD-MMMM-YYYY",
  YEAR_MM: "YYYY-MM",
  DATETIME_FILE_NAME: "YYYY-MM-DD-HH-mm-ss",
  YEAR_MM_DD: "YYYY-MM-DD",
};

exports.getFormattedMoment = (serverDatetime, format) => {
  return moment(serverDatetime).tz("Asia/Dhaka").format(format);
};

exports.getFormattedDatetimeForReport = (serverDatetime) => {
  return moment(serverDatetime)
    .tz("Asia/Dhaka")
    .format(DATE_FORMAT.DATE_REPORT);
};

exports.getFormattedDatetimeForGeneralTable = (serverDatetime) => {
  return moment(serverDatetime)
    .tz("Asia/Dhaka")
    .format(DATE_FORMAT.DATETIME_GENERAL_TABLE);
};

exports.getCurrentDate = () =>
  moment().tz("Asia/Dhaka").format(DATE_FORMAT.DATE_REPORT);

exports.getCurrentDatetime = (format) =>
  moment().tz("Asia/Dhaka").format(format);

exports.getCurrentYearMonth = () =>
  moment().tz("Asia/Dhaka").format(DATE_FORMAT.YEAR_MM);

exports.convertDatetime = (datetime, inFormat) =>
  moment(datetime, inFormat).tz("Asia/Dhaka").format(DATE_FORMAT.DATE_REPORT);

exports.isDateExpired = (date) => {
  var dateToCompare = moment(date);
  var now = moment();

  if (now > dateToCompare) {
    return true;
  } else {
    return false;
  }
};

exports.isDateLess = (then, now) => {
  var before = moment(then);
  var after = moment(now);

  if (after < before) return true;

  return false;
};
