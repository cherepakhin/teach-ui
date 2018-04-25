import { formatDate, formatNumber } from '../index';

describe('constatnts', () => {
  it('Форматирование даты formatDate', () => {
    expect(formatDate('2012-01-26')).toBe('26.01.12');
  });

  it('Форматирование чисел', () => {
    const num = formatNumber(12345.678);
    // console.log(num);
    expect(num).toBe('12,345.68');
  });

  it('parse Date', () => {
    const day = new Date(2017, 11, 2);
    const strToday = day.toISOString().slice(0, 10);
    // console.log(strToday);
    expect(new Date(Date.parse(strToday)).toISOString().slice(0, 10)).toEqual(strToday);
  });
});
