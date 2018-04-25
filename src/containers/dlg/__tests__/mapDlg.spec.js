import { CONST_ACTION } from '../../../constants';
import mapDlg from '../mapDlg';

describe('Test mapDlg', () => {

  it('Проверка DLG_MESSAGE', () => {
    expect(mapDlg.has(CONST_ACTION.DLG_MESSAGE)).toBe(true);
    const dlg = mapDlg.get(CONST_ACTION.DLG_MESSAGE);
    expect(dlg).toBeDefined();
    expect(dlg.widget).toBeDefined();
  });

});
