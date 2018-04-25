import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { findIndex } from 'lodash';

import EditFeatureDlg from '../widget';

let props = {};
beforeEach(() => {
  configure({ adapter: new Adapter() });
  props = {
    actions: {
      fnOk: jest.fn(),
      fnCancel: jest.fn(),
    },
    feature: {
      n: 1,
      name: 'Aquastop',
      info: 'Принцип действия-в двухслойном шланге. Установлены клапан и двойной запирающий вентиль. Если происходит разгерметизация то вентиль',
      info_profit: 'Данная функция позволяет Вам эксплуатировать стиральную машину и не переживать, если происходит разгерметизация шланга, специальное устройство быстро перекроет воду и Вы сможете избежать неприятных последствий.',
      questions: [
        {
          n: 1,
          txt: 'AQUASTOP это ?',
          answer_n: 14,
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
      ],
    },
  };
});

describe('Test EditFeatureDlg', () => {
  it('init', () => {
    const dlg = shallow(<EditFeatureDlg {...props} />);
    expect(dlg.state().feature).toEqual(props.feature);
  });

  it('addAnswer', () => {
    const dlg = shallow(<EditFeatureDlg {...props} />);
    dlg.instance().addAnswer();
    expect(dlg.state().feature.questions[0].answers.length).toBe(5);
    expect(dlg.state().feature.questions[0].answers[4].n).toBe(-1);
    dlg.instance().addAnswer();
    expect(dlg.state().feature.questions[0].answers.length).toBe(6);
    expect(dlg.state().feature.questions[0].answers[5].n).toBe(-2);
  });

  it('change name TextField', () => {
    const dlg = shallow(<EditFeatureDlg {...props} />);
    let field = dlg.find('#txt_name_feature');
    field.simulate('change', 'NEW_NAME');
    expect(dlg.state().feature.name).toBe('NEW_NAME');
    field = dlg.find('#txt_name_feature');
    expect(field.props().value).toBe('NEW_NAME');
  });

  it('change info TextField', () => {
    const dlg = shallow(<EditFeatureDlg {...props} />);
    let field = dlg.find('#txt_info_feature');
    field.simulate('change', 'NEW_INFO');
    expect(dlg.state().feature.info).toBe('NEW_INFO');
    field = dlg.find('#txt_info_feature');
    expect(field.props().value).toBe('NEW_INFO');
  });

  it('change info_profit TextField', () => {
    const dlg = shallow(<EditFeatureDlg {...props} />);
    let field = dlg.find('#txt_info_profit_feature');
    field.simulate('change', 'NEW_INFO_PROFIT');
    expect(dlg.state().feature.info_profit).toBe('NEW_INFO_PROFIT');
    field = dlg.find('#txt_info_profit_feature');
    expect(field.props().value).toBe('NEW_INFO_PROFIT');
  });

  // it('Изменение текста вопроса', () => {
  //   const dlg = mount(<EditFeatureDlg {...props} />);
  //   let field = dlg.find('#txt_question');
  //   console.log(field.at(0).props().value);
  //   field.at(0).simulate('change', 'NEW_QUESTION');
  //   field.at().simulate('change', 'NEW_QUESTION');
  //   field = dlg.find('#txt_question');
  //   console.log(field.at(0).props().value);
  //   console.log(field.at(1).props().value);
  //   console.log(field.at(2).props().value);
  //   console.log(field.at(3).props().value);
  //   expect(dlg.state().feature.questions[0].txt).toBe('NEW_QUESTION');
  //   // field = dlg.find('#txt_question');
  //   // expect(field.props().value).toBe('NEW_QUESTION');
  // });

  it('checkAnswer', () => {
    const dlg = shallow(<EditFeatureDlg {...props} />);
    const field = dlg.find('#checkBtn12');
    field.simulate('click');
    expect(dlg.state().feature.questions[0].answer_n).toBe(12);
  });

  it('Иконка изменилась при отметке правильного вопроса', () => {
    const dlg = shallow(<EditFeatureDlg {...props} />);
    const field = dlg.find('#checkBtn12');
    field.simulate('click');
    const icon = dlg.find('#check_icon12');
    // console.log(icon.props());
    expect(icon.props().children).toBe('check');
  });

  it('deleteAnswer', () => {
    const dlg = shallow(<EditFeatureDlg {...props} />);
    const field = dlg.find('#delete_btn12');
    field.simulate('click');
    expect(dlg.state().feature.questions[0].answers.length).toBe(3);
    const idx = findIndex(dlg.state().feature.questions[0].answers, { n: 12 });
    expect(idx).toBe(-1);
  });
});
