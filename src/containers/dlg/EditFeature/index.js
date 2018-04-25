import widget from './widget';
import { CONST_ACTION } from '../../../constants';
import ADlg from '../ADlg';
import { save } from '../../../actions/SetupFeatureActions';


/**
 * Контроллер для управления диалогом редактирования хар-ки
 */
class OEditFeature extends ADlg {
  constructor() {
    super(CONST_ACTION.DLG_EDIT_FEATURE, 'Характеристика', widget, save);
  }
}

export default new OEditFeature();
