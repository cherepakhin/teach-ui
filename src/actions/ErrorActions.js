import { CONST_ACTION } from '../constants';
import mapDlg from '../containers/dlg/mapDlg';

export const showMessage = function (dispatch, message) {
  mapDlg.get(CONST_ACTION.DLG_MESSAGE).show(dispatch, { message });
};
