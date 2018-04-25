import resultReducer from '../resultReducer';
import { CONST_ACTION } from '../../constants';

const defaultState = {
  feature: {
    n: 0,
    name: '',
    info: '',
    info_profit: '',
  },
  pageOnClose: '/',
};

describe('resultReducer', () => {
  it('default init', () => {
    expect(resultReducer(undefined, {}))
      .toEqual(defaultState);
  });

  it('action SET_RESULT. Установка результата ответа на вопрос.', () => {
    const feature = {
      n: 1,
      name: 'FEATURE_NAME',
      info: 'FEATURE_INFO',
      info_profit: 'FEATURE_INFO_PROFIT',
      is_ok: true,
    };
    expect(resultReducer(undefined, { type: CONST_ACTION.SET_RESULT, payload: { feature, pageOnClose: '/question' } }))
      .toEqual({
        feature,
        pageOnClose: '/question',
      });
  });
});
