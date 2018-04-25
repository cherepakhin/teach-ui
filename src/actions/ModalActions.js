import mapDlg from '../containers/dlg/mapDlg';
import { CONST_ACTION } from '../constants';

/**
 * [openDlg Открыть диалог
 * @param  {[type]} modalType  [тип диалога]
 * @param  {[type]} modalProps [свойства диалога]
 * @param  {[type]} fnOk       [функция Ok]
 * @return {[type]}            [description]
 */
const openDlg = function (modalType, modalProps, fnOk) {
  return (dispatch) => {
    if (modalType === undefined) {
      mapDlg.get(CONST_ACTION.DLG_MESSAGE).show(dispatch, 'Не указан тип диалога');
      return;
    }

    // Необходимо связать функции кнопок OK и CANCEL с dispatch
    // dispatch нужен в этих функциях для обмена с внешним миром

    // НЕ НРАВИТСЯ. может все таки пренести ok и cancel в спец.класс
    // содержащий и widget и функции ok и cancel
    // dispatch передавать через сеттер

    // Вроде так. Ok и cancel до сих пор не в классе dlg
    const dlg = mapDlg.get(modalType);
    if (dlg === undefined) {
      mapDlg.get(CONST_ACTION.DLG_MESSAGE)
      .show(dispatch, `Диалог с типом ${modalType} не определен`);
      return;
    }

    dlg.show(dispatch, modalProps, fnOk);
  };
};

export default openDlg;
