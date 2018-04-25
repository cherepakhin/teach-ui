import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FeatureGroupChip from '../FeatureGroupChip';

let props = {};
beforeEach(() => {
  configure({ adapter: new Adapter() });
  props = {
    n: 11,
    parent_n: 1,
    name: 'group11',
    parent_name: 'group1',
    deleteChip: jest.fn(),
  };
});

describe('FeatureGroupChip', () => {
  it('init', () => {
    const featureGroupChip = shallow(<FeatureGroupChip {...props} />);
    const chip = featureGroupChip.find('#feature_group_chip11');
    expect(chip.props().label).toBe(`${props.parent_name} | ${props.name}`);
  });

  it('default', () => {
    const featureGroupChip = shallow(<FeatureGroupChip />);
    const chip = featureGroupChip.find('#feature_group_chip-1');
    expect(chip.props().label).toBe(' | ');
  });

  it('click', () => {
    const featureGroupChip = shallow(<FeatureGroupChip {...props} />);
    const chip = featureGroupChip.find('#feature_group_chip11');
    // expect(chip.props().label).toBe(`${props.parent_name} | ${props.name}`);
    chip.simulate('click');
    expect(props.deleteChip.mock.calls.length).toBe(1);
    expect(props.deleteChip.mock.calls[0][0]).toBe(11);
  });
});
