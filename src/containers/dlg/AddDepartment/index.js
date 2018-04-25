import widget from './widget';
import { CONST_ACTION } from '../../../constants';
import ADlg from '../ADlg';
import { create } from '../../../actions/SetupDepartmentActions';

/**
 * Контроллер для управления диалогом ввода строки
 */
class OAddDepartmentDlg extends ADlg {
  constructor() {
    super(CONST_ACTION.DLG_ADD_DEPARTMENT, '', widget, create);
  }
}

export default new OAddDepartmentDlg();
