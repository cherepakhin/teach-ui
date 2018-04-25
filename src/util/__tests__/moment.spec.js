import moment from 'moment';

describe('moment', () => {
  it('Форматирование даты', () => {
    expect(moment('2017-12-13').format('YYYY-MM-DD')).toBe('2017-12-13');
  });
  it('Добавить день', () => {
    expect(moment('2017-12-13').add(1, 'd').format('YYYY-MM-DD')).toBe('2017-12-14');
  });
  it('Достать день', () => {
    expect(moment('2017-12-13').date()).toBe(13);
  });
  it('Количество дней в периоде', () => {
    expect(moment('2017-12-04').diff('2018-01-04', 'days')).toBe(-31);
    // console.log(moment('2017-12-04').getDate());
  });
  // it('Первый день месяца текущей даты', () => {
  //   const m = moment('2017-12-04');
  //   console.log(m);
  //   const d = new Date(m.year(), m.month(), 1);
  //   expect(moment(d)).toEqual(moment('2017-12-01'));
  //   // console.log(moment('2017-12-04').getDate());
  // });
});
