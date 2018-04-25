import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FeatureInfo } from '../FeatureInfo';

const props = {
  feature: {
    name: 'FEATURE_1',
    info: 'FEATURE_INFO',
    info_profit: 'FEATURE_INFO_PROFIT',
    ddate: '2018-03-31',
    employee: {
      name: 'NAME_EMPLOYEE',
    },
    feature_group: [
      { n: 1, name: 'FEATURE_GROUP_1', parent_name: 'PARENT' },
      { n: 2, name: 'FEATURE_GROUP_2', parent_name: 'PARENT' },
    ],
  },
  actions: {
    closeFeatureInfo: jest.fn(),
  },
};

configure({ adapter: new Adapter() });

describe('FeatureInfo', () => {
  it('init CardTitle', () => {
    const featureInfo = shallow(<FeatureInfo {...props} />);
    const cardTitle = featureInfo.find('CardTitle');
    expect(cardTitle.props().title).toBe(props.feature.name);
    // expect(cardTitle.props().subtitle).toBe('NAME_EMPLOYEE(31.03.18)');
  });

  it('init CardText feauterInfo', () => {
    const featureInfo = shallow(<FeatureInfo {...props} />);
    const p = featureInfo.find('CardText > p');
    expect(p.at(0).props().children).toBe(props.feature.info);
  });

  it('init CardText feauterInfoProfit', () => {
    const featureInfo = shallow(<FeatureInfo {...props} />);
    const p = featureInfo.find('CardText > p');
    expect(p.at(1).props().children).toBe(props.feature.info_profit);
  });

  it('init CardText autor', () => {
    const featureInfo = shallow(<FeatureInfo {...props} />);
    const p = featureInfo.find('CardText > div');
    expect(p.at(0).props().children).toBe('NAME_EMPLOYEE(31.03.18)');
  });

  it('init CardText feauterGroupChips', () => {
    const featureInfo = shallow(<FeatureInfo {...props} />);
    const chips = featureInfo.find('Chip');
    expect(chips.length).toBe(2);
    expect(chips.at(0).props().label).toBe(`${props.feature.feature_group[0].parent_name} | ${props.feature.feature_group[0].name}`);
  });

  it('closeFeatureInfo', () => {
    const featureInfo = mount(<FeatureInfo {...props} />);
    const button = featureInfo.find('Button');
    button.at(0).simulate('click');
    expect(props.actions.closeFeatureInfo.mock.calls.length).toBe(1);
  });
});
