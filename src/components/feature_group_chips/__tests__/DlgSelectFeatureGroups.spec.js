import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DlgSelectFeatureGroups from '../DlgSelectFeatureGroups';

beforeEach(() => {
  configure({ adapter: new Adapter() });
});

describe('DlgSelectFeatureGroups', () => {
  it('init', () => {
    const selectedFeatureGroups = [
      { n: 1 },
      { n: 2 },
    ];
    const dlg = mount(<DlgSelectFeatureGroups selectedFeatureGroups={selectedFeatureGroups} />);
    expect(dlg.state().selected).toEqual(selectedFeatureGroups);
  });

  it('selectFeatureGroups. Добавить группу ', () => {
    const initFeatureGroups = [
      { n: 1 },
    ];
    const expectedFeatureGroups = [
      { n: 1 },
      { n: 2 },
    ];
    const dlg = mount(<DlgSelectFeatureGroups selectedFeatureGroups={initFeatureGroups} />);
    dlg.instance().selectFeatureGroup(expectedFeatureGroups[1]);
    expect(dlg.state().selected).toEqual(expectedFeatureGroups);
  });

  it('selectFeatureGroups. Удалить группу ', () => {
    const initFeatureGroups = [
      { n: 1 },
      { n: 2 },
    ];
    const expectedFeatureGroups = [
      { n: 1 },
    ];
    const dlg = mount(<DlgSelectFeatureGroups selectedFeatureGroups={initFeatureGroups} />);
    dlg.instance().selectFeatureGroup(initFeatureGroups[1]);
    expect(dlg.state().selected).toEqual(expectedFeatureGroups);
  });

  it('selectFeatureGroups. Удалить группу по другому. ', () => {
    const initFeatureGroups = [
      { n: 1 },
      { n: 2 },
    ];
    const expectedFeatureGroups = [
      { n: 1 },
    ];
    const dlg = mount(<DlgSelectFeatureGroups selectedFeatureGroups={initFeatureGroups} />);
    dlg.instance().selectFeatureGroup({ n: 2 });
    expect(dlg.state().selected).toEqual(expectedFeatureGroups);
  });
});
