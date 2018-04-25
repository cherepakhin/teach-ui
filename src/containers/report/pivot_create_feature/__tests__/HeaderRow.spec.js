import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import HeaderRow from '../HeaderRow';

let props = {};
beforeEach(() => {
  configure({ adapter: new Adapter() });
  props = {
    startDate: '2017-12-02',
    endDate: '2017-12-12',
  };
});

describe('HeaderRow', () => {
  it('Проверка header', () => {
    props.report = [];
    const header = shallow(<HeaderRow {...props} />);
    const divs = header.find('div');
    // console.log(divs.length);
    expect(divs.length).toBe(11);
    let day = 2;
    divs.forEach((div) => {
      expect(div.props().children).toBe(day);
      day += 1;
    });
  });
});
