import widget from './widget';
import { CONST_ACTION } from '../../../constants';
import ADlg from '../ADlg';
import { change } from '../../../actions/PlanActions';

/**
 * Контроллер для управления диалогом ввода строки
 */
class OChangePlanDlg extends ADlg {
  constructor() {
    super(CONST_ACTION.DLG_CHANGE_PLAN, '', widget, change);
  }
}

export default new OChangePlanDlg();
