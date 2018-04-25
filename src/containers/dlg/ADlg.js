import { bindActionCreators } from 'redux';
import cancel from './cancel';
import { CONST_ACTION } from '../../constants';

export default class ADlg {

  /**
   * [constructor description]
   * @param  {[type]} typeDlg [тип диалога. Д.б. задан в CONST_ACTION]
   * @param  {[type]} title   [заголовок]
   * @param  {[type]} widget  [тело диалога]
   * @param  {[type]} userFn    [функция при нажатии OK
   *                          (необязательно. можно задать при вызове openDlg)]
   * @return {[type]}         [description]
   */
  constructor(typeDlg, title, widget, userFn) {
    this.typeDlg = typeDlg;
    this.title = title || '';
    this.widget = widget;
    this.userFn = userFn;
    /*    this.fnOk = fnOk ? fnOk : cancel,
        this.fnCancel = cancel;*/
    this._actions = {
      // fnOk: fnOk || cancel,
      fnOk: userFn ? this.fnOk.bind(this) : cancel,
      fnCancel: cancel,
    };
  }

// TODO: Достает вызывать type: CONST_ACTION.CLOSE_DIALOG каждый раз в actions. Сделать обертку
  fnOk(...args) {
    // this.actions.fnOk();
    return (dispatch, getState) => {
      dispatch({
        type: CONST_ACTION.CLOSE_DIALOG,
      });
      this.userFn(...args)(dispatch, getState);
    };
  }


/**
 * [show Показать диалог]
 * @param  {[type]} dispatch   [description]
 * @param  {[type]} modalProps [свойства]
 * @param  {[type]} fnOk       [функция при нажатии OK
 *                             (необязательно. может быть присвоена в конструкторе)]
 * @return {[type]}            [description]
 */
  show(dispatch, modalProps, userFnOk) {
    if (userFnOk !== undefined) {
      this.userFn = userFnOk;
      // TODO: не работает передача функции в диалог
      // this._actions.fnOk = this.fnOk.bind(this);
    }
    this.actions = bindActionCreators(this._actions, dispatch);
    dispatch({
      type: CONST_ACTION.OPEN_DIALOG,
      payload: {
        modalType: this.typeDlg,
        modalProps,
      },
    });
  }
}
