import widget from './widget';
import { CONST_ACTION } from '../../../constants';
import ADlg from '../ADlg';

/**
 * Контроллер для управления диалогом поиска движения бонусов
 */
class OSearchResults extends ADlg {
  constructor() {
    super(CONST_ACTION.DLG_SEARCH_RESULTS, 'Найти результаты опроса', widget);
  }
}

export default new OSearchResults();
