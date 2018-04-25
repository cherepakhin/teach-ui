import widget from './widget';
import { CONST_ACTION } from '../../../constants';
import ADlg from '../ADlg';
import { save } from '../../../actions/SetupEmployeeActions';

/**
 * Контроллер для управления диалогом ввода сотрудника
 */
class OAddEmployeeDlg extends ADlg {
  constructor() {
    super(CONST_ACTION.DLG_ADD_EMPLOYEE, '', widget, save);
  }
}

export default new OAddEmployeeDlg();
