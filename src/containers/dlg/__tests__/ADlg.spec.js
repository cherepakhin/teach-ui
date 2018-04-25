import ADlg from '../ADlg';
import cancel from '../cancel';

describe('Тесты ADlg', () => {
  it('Правильный конструктор', () => {
    const fnOk = jest.fn();
    const widget = {};
    const adlg = new ADlg('typeDlg', 'title', widget, fnOk);
    expect(adlg.typeDlg).toBe('typeDlg');
    expect(adlg.widget).toBe(widget);
    expect(adlg._actions.fnCancel).toEqual(cancel);
    expect(adlg.userFn).toEqual(fnOk);
  });

  it('Конструктор. Не определена fnOk', () => {
    const widget = {
    };
    const adlg = new ADlg('typeDlg', 'title', widget);
    expect(adlg.typeDlg).toBe('typeDlg');
    expect(adlg.widget).toBe(widget);
    expect(adlg._actions).toEqual({
      fnOk: cancel,
      fnCancel: cancel,
    });
  });

  it('Проверка show', () => {
    const widget = {};
    const dispatch = jest.fn();
    const fnOk = function () {
      return () => {
      };
    };

    const adlg = new ADlg('typeDlg', 'title', widget, fnOk);
    adlg.show(dispatch, { testProp: 'testProp' });
    adlg.actions.fnOk();
    expect(adlg.actions.fnOk).toBeInstanceOf(Function);
    expect(adlg.actions.fnCancel).toBeInstanceOf(Function);
  });
});
