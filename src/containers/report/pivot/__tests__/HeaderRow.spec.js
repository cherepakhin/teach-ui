import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import HeaderRow from '../HeaderRow';

let props = {};
configure({ adapter: new Adapter() });

beforeEach(() => {
  props = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  };
});

describe('HeaderRow', () => {
  it('Проверка header', () => {
    props.report = [];
    const header = shallow(<HeaderRow {...props} />);
    const divs = header.find('div');
    // console.log(divs.length);
    expect(divs.length).toBeGreaterThan(27);
    let day = 1;
    divs.forEach((div) => {
      expect(div.props().children).toBe(day);
      day += 1;
    });
  });
});
