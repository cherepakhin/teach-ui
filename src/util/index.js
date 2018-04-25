/**
 * Форматирование даты
 * @param  {Date} ddate [description]
 * @return {string}     дата в виде dd.mm.yyyy
 */
export const formatDate = function (ddate) {
  const _ddate = new Date(Date.parse(ddate));
  const year = _ddate.getFullYear().toString().slice(-2);
  let month = (1 + _ddate.getMonth()).toString();
  month = month.length > 1 ? month : `0${month}`;
  let day = _ddate.getDate().toString();
  day = day.length > 1 ? day : `0${day}`;
  return `${day}.${month}.${year}`;
};

export const dateFormatter = new Intl.DateTimeFormat('ru');

export const strToDecimal = function (str) {
  // return parseFloat(str).toFixed(2);
  const d = str * 1.00;
  return d;
};

export const strToDate = function (str) {
  let ret = new Date().toISOString().slice(0, 10);
  if (str !== undefined) {
    ret = str.slice(0, 10);
  }
  return ret;
};

export const formatNumber = function (num) {
  // return num.toFixed(2);
  return num.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

