import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FeatureGroupChips from '../FeatureGroupChips';
import featureGroups from '../../__tests__/feature_group_children.json';

let props = {};
beforeEach(() => {
  configure({ adapter: new Adapter() });
  props = {
    featureGroups,
    deleteChip: jest.fn(),
  };
});

describe('FeatureGroupChipSSS', () => {
  it('init', () => {
    const featureGroupChips = shallow(<FeatureGroupChips {...props} />);
    const chips = featureGroupChips.find('FeatureGroupChip');
    expect(chips.length).toBe(4);
  });

  it('default init', () => {
    const featureGroupChips = shallow(<FeatureGroupChips />);
    const chips = featureGroupChips.find('FeatureGroupChip');
    expect(chips.length).toBe(0);
  });

  it('click', () => {
    const featureGroupChips = mount(<FeatureGroupChips {...props} />);
    const chip = featureGroupChips.find('#FeatureGroupChip11');
    chip.simulate('click');
    expect(props.deleteChip.mock.calls.length).toBe(1);
    expect(props.deleteChip.mock.calls[0][0]).toBe(11);
  });
});
