import questionToolBar from '../question/toolbar';
import adminToolBar from '../admin/toolbar';
import reportToolBar from '../report/toolbar';
import manualToolBar from '../manual/toolbar';
import setupFeatureToolBar from '../setup_feature/toolbar';
import setupFeatureGroupToolBar from '../setup_feature_group/toolbar';
import setupEmployeeToolBar from '../setup_employee/toolbar';
import setupDepartmentToolBar from '../setup_department/toolbar';
import planToolBar from '../plan/toolbar';
import loginToolBar from '../login/toolbar';

/**
 * Создание toolbar по текущему пути и state
 * @param  {string} pathname путь
 * @param  {object} state
 * @return {{actions,childs}} массивы элементов элеме для создания toolbar
 */
export default function (pathname, state) {
  if (state === undefined) {
    return {
      actions: [],
      childs: [],
    };
  }
  switch (pathname) {
    case '/question':
      return questionToolBar.getActionsAndChilds(state);
    case '/admin':
      return adminToolBar.getActionsAndChilds(state);
    case '/setup_feature':
      return setupFeatureToolBar.getActionsAndChilds(state);
    case '/setup_feature_group':
      return setupFeatureGroupToolBar.getActionsAndChilds(state);
    case '/setup_employee':
      return setupEmployeeToolBar.getActionsAndChilds(state);
    case '/setup_department':
      return setupDepartmentToolBar.getActionsAndChilds(state);
    case '/plan':
      return planToolBar.getActionsAndChilds(state);
    case '/report':
      return reportToolBar.getActionsAndChilds(state);
    case '/manual':
      return manualToolBar.getActionsAndChilds(state);
    case '/login':
      return loginToolBar.getActionsAndChilds(state);
    default:
      return questionToolBar.getActionsAndChilds(state);
  }
}
