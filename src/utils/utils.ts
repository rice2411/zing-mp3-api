export const isBlank = (data: string) => !data || data === "";
export const isArrayEmpty = (data: any[]) => !data || data.length === 0;
export const isBeforeDate = (left: Date, right: Date) =>
  left && right && left.getTime() < right.getTime();
export const isInteger = (value: any) => Number.isInteger(value);
export const isBoolean = require("node-boolify").isBoolean;
export const isFloat = (value: any) =>
  Number(value) === value && value % 1 !== 0;
export function isDate(_date) {
  try {
    var parsedDate = Date.parse(_date);

    if (isNaN(parsedDate)) {
      return true;
    }
  } catch (e) {
    return true;
  }
  return false;
}

/**
 * Equal today
 * @param string date
 */
export function isGreaterThanToday(mydate) {
  try {
    var q = new Date();
    var m = q.getMonth();
    var d = q.getDate();
    var y = q.getFullYear();
    var date = new Date(y, m, d);
    mydate = new Date(mydate);
    if (date.getTime() > mydate.getTime()) {
      return true;
    }
    return false;
  } catch (e) {
    return true;
  }
}
export function validURL (str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
    '((\\d{1,3}\\.){3}\\d{1,3}))'+
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
    '(\\?[;&a-z\\d%_.~+=-]*)?'+
    '(\\#[-a-z\\d_]*)?$','i');
  return !!pattern.test(str);
}

export const validateProfileDate = (date): boolean =>{
  let dateformat = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  return dateformat.test(date);
}

export const isPhoneVietNam = (phone: any): boolean => {
  const PHONE_PATTERN = /^(09|01|07|08|03|05|[1|2|5|6|8|9])+([0-9]{8})$/;
  return PHONE_PATTERN.test(phone);
}

export function isEmailValid(email): boolean {
  return /\S+@\S+\.\S+/.test(email);
}

export function checkURL(url) {
  if (typeof url !== 'string') return false;
  return (url.match(/\.(jpg|jpeg|gif|png)$/) != null);
}

const setStringDate = (date: Date) => {
  if (!date) return "";
  let day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
  let month =
    date.getMonth() < 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
  let year = date.getFullYear();
  return day + "/" + month + "/" + year;
};

const serverTimeZoneOffset = new Date().getTimezoneOffset() / 60;
const changeOffset = serverTimeZoneOffset + 7; // VN timezone

export const parseToLocalTime = (dateTime) => {
  let currentDate = new Date(dateTime);
  currentDate.setHours(currentDate.getHours() + changeOffset);
  currentDate.setHours(0, 0, 0, 0);
  let day = currentDate.getDay();
  let days = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
  return days[day] + ", " + setStringDate(currentDate);
};