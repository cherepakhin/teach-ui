import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FeatureGroupSelector from '../FeatureGroupSelector';
import featureGroups from '../../__tests__/feature_groups.json';

beforeEach(() => {
  configure({ adapter: new Adapter() });
});

describe('FeatureGroupSelector', () => {
  it('init', () => {
    const page = shallow(<FeatureGroupSelector featureGroups={featureGroups} />);
    const elements = page.find('FeatureGroup');
    expect(elements.length).toBe(3);
    expect(elements.at(0).props().name).toBe(featureGroups[0].name);
    expect(elements.at(1).props().name).toBe(featureGroups[1].name);
  });

  it('Проверка сортировки', () => {
    const unsortedFeatureGroups = [
      {
        n: 2,
        parent_n: -1,
        name: 'group2',
        children: [
          { n: 21, parent_n: 2, name: 'group21' },
        ],
      },
      {
        n: 1,
        parent_n: -1,
        name: 'group1',
        children: [
          { n: 11, parent_n: 1, name: 'group11' },
        ],
      },
    ];
    const page = shallow(<FeatureGroupSelector featureGroups={unsortedFeatureGroups} />);
    const elements = page.find('FeatureGroup');
    expect(elements.length).toBe(2);
    expect(elements.at(0).props().name).toBe(unsortedFeatureGroups[1].name);
    expect(elements.at(1).props().name).toBe(unsortedFeatureGroups[0].name);
  });

  it('init когда неопределен список групп', () => {
    const page = shallow(<FeatureGroupSelector />);
    const elements = page.find('FeatureGroup');
    expect(elements.length).toBe(0);
  });
});
