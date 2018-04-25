import widget from './widget';
import { CONST_ACTION } from '../../../constants';
import ADlg from '../ADlg';

/**
 * Контроллер для управления диалогом вывода сообщения
 */
class OMessage extends ADlg {

  constructor() {
    const title = '';
    super(CONST_ACTION.DLG_MESSAGE, title, widget);
  }

  /*  show(dispatch, message) {
      this.dispatch = dispatch;
      this.dispatch({
        type: CONST_ACTION.OPEN_DIALOG,
        payload: {
          modalType: this.typeDlg,
          modalProps: {
            message: message
          }
        }
      });
    }
  */}

export default new OMessage();
