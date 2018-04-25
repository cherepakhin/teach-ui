import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appReducer from './appReducer';
import modalReducer from './modalReducer';
import featureReducer from './featureReducer';
import featureGroupReducer from './featureGroupReducer';
import manualReducer from './manualReducer';
import questionReducer from './questionReducer';
import resultReducer from './resultReducer';
import setupDepartmentReducer from './setupDepartmentReducer';
import setupEmployeeReducer from './setupEmployeeReducer';
import reportReducer from './reportReducer';
import planReducer from './planReducer';

export default combineReducers({
  routing: routerReducer,
  app: appReducer,
  modal: modalReducer,
  feature: featureReducer,
  featureGroup: featureGroupReducer,
  question: questionReducer,
  manual: manualReducer,
  result: resultReducer,
  setupDepartment: setupDepartmentReducer,
  setupEmployee: setupEmployeeReducer,
  report: reportReducer,
  plan: planReducer,
});
