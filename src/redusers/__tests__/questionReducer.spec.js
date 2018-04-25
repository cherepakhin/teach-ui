import questionReducer from '../questionReducer';
import { CONST_ACTION } from '../../constants';

const defaultState = {
  question: {
    n: 0,
  },
};

describe('questionReducer', () => {
  it('default init', () => {
    expect(questionReducer(undefined, {}))
      .toEqual(defaultState);
  });

  it('action INIT_VAR (Вопрос определен)', () => {
    const question = {
      n: 1,
      txt: 'QUESTION_TEXT',
    };
    const newState = questionReducer(undefined, { type: CONST_ACTION.SET_QUESTION, payload: { question } });
    // console.log(newState);
    expect(newState)
      .toEqual({
        question,
      });
  });

  it('action INIT_VAR (Вопрос НЕ определен)', () => {
    expect(questionReducer(undefined, { type: CONST_ACTION.SET_QUESTION, payload: {} }))
      .toEqual({
        question: {
          n: 0,
        },
      });
  });
});
