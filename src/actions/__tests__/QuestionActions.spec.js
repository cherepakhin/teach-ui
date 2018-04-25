import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../QuestionActions';
import { URL_SERVER, CONST_ACTION } from '../../constants';

let middlewares = [thunk];
let mockStore = configureMockStore(middlewares);


describe('QuestionActions', () => {
  beforeEach(() => {
    middlewares = [thunk];
    mockStore = configureMockStore(middlewares);
  });

  it('sendAnswer', () => {
    const params = {
      question_n: 1,
      answer_n: 12,
    };
    const state = {
      question: {
        question: {},
      },
    };
    const store = mockStore({ ...state });

    const feature = {
      n: 1,
      name: 'FEATURE_NAME',
      info: 'FEATURE_INFO',
      info_profit: 'FEATURE_INFO_PROFIT',
      is_ok: true,
    };
    nock(URL_SERVER)
      .post('/result/exam/')
      .reply(200, { ...feature });

    return store.dispatch(actions.sendAnswer(params))
      .then(() => {
        const actualActions = store.getActions();
        // console.log(actualActions);
        expect(actualActions[0]).toEqual({ type: CONST_ACTION.PROGRESS_SHOW });
        expect(actualActions[1].type).toEqual(CONST_ACTION.SET_RESULT);
        expect(actualActions[2]).toEqual({ type: CONST_ACTION.PROGRESS_HIDE });
        // expect(actualActions[1].payload.feature).toEqual(feature);
        // expect(actualActions[1].payload.pageOnClose).toEqual('/question');
      });
  });
});
