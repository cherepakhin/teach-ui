import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FeatureGroupSelectorPage from '../FeatureGroupSelectorPage';

beforeEach(() => {
  configure({ adapter: new Adapter() });
});

describe('FeatureGroupSelectorPage', () => {
  it('init', () => {
    const page = shallow(<FeatureGroupSelectorPage />);
    expect(page.state().selected).toEqual([]);
  });

  it('selectFeatureGroup', () => {
    const page = mount(<FeatureGroupSelectorPage />);
    expect(page.state().selected).toEqual([]);
    page.instance().selectFeatureGroups({ n: 2 });
    expect(page.state().selected).toEqual([{ n: 2 }]);
  });
});
