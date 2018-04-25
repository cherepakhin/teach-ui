import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FeatureGroup from '../FeatureGroup';

const featureGroup = {
  n: 2,
  name: 'FEATURE_GROUP_2',
  children: [
    { n: 22, name: 'FEATURE_GROUP_22' },
    { n: 21, name: 'FEATURE_GROUP_21' },
  ],
};

beforeEach(() => {
  configure({ adapter: new Adapter() });
});

describe('FeatureGroup', () => {
  it('init', () => {
    const page = mount(<FeatureGroup {...featureGroup} />);
    expect(page.state().collapsed).toBe(true);
    const title = page.find('TitleFeatureGroup');
    expect(title.props().name).toBe(featureGroup.name);
  });

  it('Проверка setCollapsed()', () => {
    const page = mount(<FeatureGroup {...featureGroup} />);
    page.instance().setCollapsed();
    expect(page.state().collapsed).toBe(false);
  });

  it('Проверка открытия подгрупп', () => {
    const page = mount(<FeatureGroup {...featureGroup} />);
    const title = page.find('TitleFeatureGroup');
    title.simulate('click');
    const checkBoxes = page.find('Checkbox');
    expect(checkBoxes.length).toBe(2);
    // Заодно проверяется сортировка по имени, поэтому idx[0]=n[1]
    expect(checkBoxes.at(0).props().name).toBe(featureGroup.children[1].name);
    expect(checkBoxes.at(0).props().label).toBe(featureGroup.children[1].name);

    expect(checkBoxes.at(1).props().name).toBe(featureGroup.children[0].name);
    expect(checkBoxes.at(1).props().label).toBe(featureGroup.children[0].name);
  });

  it('Проверка закрытия подгрупп', () => {
    const page = mount(<FeatureGroup {...featureGroup} />);
    const title = page.find('TitleFeatureGroup');
    title.simulate('click'); // открыть
    title.simulate('click'); // закрыть
    const checkBoxes = page.find('Checkbox');
    expect(checkBoxes.length).toBe(0);
  });

  it('Проверка что открыта,если есть отмеченные. И показаны только отмеченные.', () => {
    const page = mount(<FeatureGroup {...featureGroup} selected={[{ n: 21 }]} />);
    const checkBoxes = page.find('Checkbox');
    expect(checkBoxes.length).toBe(1);
    expect(checkBoxes.at(0).props().name).toBe(featureGroup.children[1].name);
    expect(checkBoxes.at(0).props().label).toBe(featureGroup.children[1].name);
  });

  it('Удалить из отмеченных.', () => {
    const onCheck = jest.fn();
    const page = mount(<FeatureGroup {...featureGroup} selected={[{ n: 21 }]} onCheck={onCheck} />);
    const checkBoxes = page.find('Checkbox');
    expect(checkBoxes.length).toBe(1);
    page.find('input[type="checkbox"]').simulate('change', { target: { checked: false } });
    expect(onCheck.mock.calls.length).toBe(1);
    expect(onCheck.mock.calls[0][0]).toBe(featureGroup.children[1]);
  });
});
