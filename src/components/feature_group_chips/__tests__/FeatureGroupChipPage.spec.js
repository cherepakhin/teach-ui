import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FeatureGroupChipPage from '../FeatureGroupChipPage';

beforeEach(() => {
  configure({ adapter: new Adapter() });
});

describe('FeatureGroupChipPage', () => {
  it('selectFeatureGroups', () => {
    const page = mount(<FeatureGroupChipPage onSave={() => {}} />);
    page.instance().selectFeatureGroups([{ n: 31, name: '' }]);
    expect(page.state().selectedFeatureGroups.length).toBe(1);
    expect(page.state().selectedFeatureGroups[0].n).toBe(31);
  });

  it('selectFeatureGroups. Сортировка.', () => {
    const page = mount(<FeatureGroupChipPage onSave={() => {}} />);
    const arr = [
      { n: 1, name: 'name3' },
      { n: 2, name: 'name2' },
    ];
    page.instance().selectFeatureGroups(arr);
    // console.log(arr);
    expect(page.state().selectedFeatureGroups.length).toBe(2);
    expect(page.state().selectedFeatureGroups[0].name).toBe('name2');
  });

  // it('selectFeatureGroups. Отладка.', () => {
  //   const cmp = function (a1, a2) {
  //     return a1.name - a2.name;
  //   };

  //   const arr = [
  //     { n: 2, name: '2' },
  //     { n: 1, name: '1' },
  //   ];
  //   arr.sort(cmp);
  //   // const a = arr.sort((a1, a2) => { a2.n - a1.n; });
  //   console.log(arr);
  // });
});
