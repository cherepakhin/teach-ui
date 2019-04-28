export const CONST_ACTION = {
  ROUTING: 'ROUTING',

  INIT_VAR: 'INIT_VAR',

  PROGRESS_SHOW: 'PROGRESS_SHOW',
  PROGRESS_HIDE: 'PROGRESS_HIDE',

  OPEN_DIALOG: 'OPEN_DIALOG',
  CLOSE_DIALOG: 'CLOSE_DIALOG',
  SET_TOKEN: 'SET_TOKEN',

  DLG_MESSAGE: 'DLG_MESSAGE',
  DLG_ADD_QUESTION: 'DLG_ADD_QUESTION',
  DLG_SEARCH_RESULTS: 'DLG_SEARCH_RESULTS',

  REFRESH_FEATURE: 'REFRESH_FEATURE',
  FILTER_FEATURE_FOR_EDIT: 'FILTER_FEATURE_FOR_EDIT',
  FILTER_FEATURE_FOR_MANUAL: 'FILTER_FEATURE_FOR_MANUAL',
  ADD_FEATURE: 'ADD_FEATURE',
  DLG_EDIT_FEATURE: 'DLG_EDIT_FEATURE',
  SET_FEATURE_FOR_MANUAL: 'SET_FEATURE_FOR_MANUAL',

  REFRESH_FEATURE_GROUP: 'REFRESH_FEATURE_GROUP',
  REFRESH_FEATURE_GROUPS: 'REFRESH_FEATURE_GROUPS',

  SET_RESULT: 'SET_RESULT',
  SET_QUESTION: 'SET_QUESTION',
  DLG_ADD_DEPARTMENT: 'DLG_ADD_DEPARTMENT',
  DLG_ADD_EMPLOYEE: 'DLG_ADD_EMPLOYEE',

  SET_REPORT: 'SET_REPORT',
  SET_ACTIVE_REPORT: 'SET_ACTIVE_REPORT',

  DLG_CHANGE_PLAN: 'DLG_CHANGE_PLAN',
  REFRESH_PLAN: 'REFRESH_PLAN',
  CHANGE_PLAN: 'CHANGE_PLAN',
};

// export const URL_SERVER = 'http://192.168.2.21/mdt_api/v1';
// export const URL_SERVER = 'http://127.0.0.1:6543/v1';
export const URL_SERVER = 'http://v.perm.ru/teach_api/v1'
// export const URL_SERVER = 'http://192.168.0.179/test_api/v1';
// export const URL_SERVER = 'http://192.168.2.100:6543/mdt_api/v1';
// export const URL_SERVER = 'http://192.168.1.10:6543/mdt_api/v1';

export const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export const mapNameReportToURL = new Map()
  .set('Сводный отчет', { url: 'pivot', showInMenu: true })
  .set('Отчет Сотрудники->Группы хар-к', { url: 'employee_feature_group', showInMenu: true })
  .set('Ввод новых хар-к', { url: 'pivot_create_feature', showInMenu: true })
  .set('Результаты опроса сотрудника', { url: 'employee_detail', showInMenu: false });
