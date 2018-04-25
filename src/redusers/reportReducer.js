import { CONST_ACTION, mapNameReportToURL } from '../constants';


const initialState = {
  // имя отчета: {
  //  data:
  //  params:
  // }
  report: {},
  activeReport: '',
};


const reportReducer = function (state = initialState, action) {
  switch (action.type) {
    case CONST_ACTION.SET_REPORT: {
      const newState = { ...state };
      if (mapNameReportToURL.get(action.payload.nameReport).showInMenu) {
        newState.activeReport = action.payload.nameReport;
      }
      newState.report[action.payload.nameReport] = {
        data: action.payload.data,
        params: action.payload.params,
      };
      return newState;
    }
    case CONST_ACTION.SET_ACTIVE_REPORT: {
      return { ...state, activeReport: action.payload };
    }
    default:
      return state;
  }
};

export default reportReducer;
