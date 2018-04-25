import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { QuestionPage } from '../../question';

let props = {};

beforeEach(() => {
  configure({ adapter: new Adapter() });
  props = {
    actions: {
      sendAnswer: jest.fn(),
    },
    question: {
      n: 1,
      txt: 'AQUASTOP это',
      answers: [
        {
          n: 11,
          txt: 'Защита от протечек бака в стиральной машине',
        }, {
          n: 12,
          txt: 'Защита от протечек наливного шланга',
        }, {
          n: 13,
          txt: 'Защита от дисбаланса барабана в ст.машине',
        }, {
          n: 14,
          txt: 'Индикатор остановки подачи воды',
        },
      ],
    },
  };
});

describe('Test QuestionPage', () => {
  it('init', () => {
    const page = shallow(<QuestionPage {...props} />);
    expect(page.state().selectedAnswerN).toEqual(props.question.answers[0].n);

    const questionRadio = page.find('#questions-radio');
    expect(questionRadio.props().label).toBe(props.question.txt);

    questionRadio.props().controls.forEach((radio, index) => {
      const answer = props.question.answers[index];
      expect(radio).toEqual({ label: answer.txt, value: `${answer.n}` });
    });
    expect(questionRadio.props().defaultValue).toBe(`${props.question.answers[0].n}`);
  });

  // it('Отметить ответ', () => {
  //   const page = shallow(<QuestionPage {...props} />);
  //   // expect(page.state().selectedAnswer).toEqual(props.question.answers[0]);
  //   let questionRadio = page.find('#questions-radio');
  //   questionRadio.simulate('click', { checked: true, value: '12' });
  //   questionRadio = page.find('#questions-radio');
  //   console.log(questionRadio.props());
  //   expect(page.state().selectedAnswer).toEqual(props.question.answers[1]);
  // });
  it('Послать ответ на проверку', () => {
    const page = shallow(<QuestionPage {...props} />);
    const btn = page.find('#btn_send_answer');
    btn.simulate('click');
    const fnSend = props.actions.sendAnswer;
    expect(fnSend.mock.calls.length).toBe(1);
    expect(fnSend.mock.calls[0][0]).toEqual(props.question.n);
    expect(fnSend.mock.calls[0][1]).toEqual(props.question.answers[0].n);
  });
});
