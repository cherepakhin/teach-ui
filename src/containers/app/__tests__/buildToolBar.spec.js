import buildToolBar from '../buildToolBar';
import questionToolBar from '../../question/toolbar';
import reportToolBar from '../../report/toolbar';
import adminToolBar from '../../admin/toolbar';
import setupFeatureToolBar from '../../setup_feature/toolbar';
import setupFeatureGroupToolBar from '../../setup_feature_group/toolbar';
import setupEmployeeToolBar from '../../setup_employee/toolbar';
import setupDepartmentToolBar from '../../setup_department/toolbar';

describe('buildToolBar', () => {
  it('Тест на /question', () => {
    questionToolBar.getActionsAndChilds = jest.fn();
    const state = {
      test: 'test',
    };
    buildToolBar('/question', state);
    expect(questionToolBar.getActionsAndChilds.mock.calls.length).toBe(1);
    expect(questionToolBar.getActionsAndChilds.mock.calls[0][0]).toEqual(state);
  });

  it('Тест на /admin', () => {
    adminToolBar.getActionsAndChilds = jest.fn();
    const state = {
      test: 'test',
    };
    buildToolBar('/admin', state);
    expect(adminToolBar.getActionsAndChilds.mock.calls.length).toBe(1);
    expect(adminToolBar.getActionsAndChilds.mock.calls[0][0]).toEqual(state);
  });

  it('Тест на /setup_employee', () => {
    setupEmployeeToolBar.getActionsAndChilds = jest.fn();
    const state = {
      test: 'test',
    };
    buildToolBar('/setup_employee', state);
    expect(setupEmployeeToolBar.getActionsAndChilds.mock.calls.length).toBe(1);
    expect(setupEmployeeToolBar.getActionsAndChilds.mock.calls[0][0]).toEqual(state);
  });

  it('Тест на /setup_feature', () => {
    setupFeatureToolBar.getActionsAndChilds = jest.fn();
    const state = {
      test: 'test',
    };
    buildToolBar('/setup_feature', state);
    expect(setupFeatureToolBar.getActionsAndChilds.mock.calls.length).toBe(1);
    expect(setupFeatureToolBar.getActionsAndChilds.mock.calls[0][0]).toEqual(state);
  });

  it('Тест на /setup_feature_group', () => {
    setupFeatureGroupToolBar.getActionsAndChilds = jest.fn();
    const state = {
      test: 'test',
    };
    buildToolBar('/setup_feature_group', state);
    expect(setupFeatureGroupToolBar.getActionsAndChilds.mock.calls.length).toBe(1);
    expect(setupFeatureGroupToolBar.getActionsAndChilds.mock.calls[0][0]).toEqual(state);
  });

  it('Тест на /setup_department', () => {
    setupDepartmentToolBar.getActionsAndChilds = jest.fn();
    const state = {
      test: 'test',
    };
    buildToolBar('/setup_department', state);
    expect(setupDepartmentToolBar.getActionsAndChilds.mock.calls.length).toBe(1);
    expect(setupDepartmentToolBar.getActionsAndChilds.mock.calls[0][0]).toEqual(state);
  });

  it('Тест на /report', () => {
    reportToolBar.getActionsAndChilds = jest.fn();
    const state = {
      test: 'test',
    };
    buildToolBar('/report', state);
    expect(reportToolBar.getActionsAndChilds.mock.calls.length).toBe(1);
    expect(reportToolBar.getActionsAndChilds.mock.calls[0][0]).toEqual(state);
  });
});
