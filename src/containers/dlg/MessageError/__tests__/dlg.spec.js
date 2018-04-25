import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import dlg from '../../MessageError';
import cancel from '../../cancel';
import { CONST_ACTION } from '../../../../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test DLG_ERROR', () => {
  it('Определение widget', () => {
    expect(dlg.widget).toBeDefined();
  });

  it('Определение ok', () => {
    expect(dlg._actions.fnOk).toBeDefined();
    expect(dlg._actions.fnOk).toEqual(cancel);
  });

  it('Определение typeDlg', () => {
    expect(dlg.typeDlg).toBeDefined();
    expect(dlg.typeDlg).toEqual(CONST_ACTION.DLG_MESSAGE);
  });

  it('Определение title', () => {
    expect(dlg.title).toBeDefined();
    expect(dlg.title).toEqual('');
  });

  it('Тест show', () => {
    const store = mockStore({});
    const expectedActions = [
      {
        type: CONST_ACTION.OPEN_DIALOG,
        payload: {
          modalProps: 'message',
          modalType: CONST_ACTION.DLG_MESSAGE,
        },
      },
    ];
    dlg.show(store.dispatch, 'message');
    expect(store.getActions()).toEqual(expectedActions);
  });
});
