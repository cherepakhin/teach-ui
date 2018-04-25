import messageError from './MessageError';
import searchResults from './SearchResults';
import editFeature from './EditFeature';
import addDepartment from './AddDepartment';
import addEmployee from './AddEmployee';
import changePlan from './ChangePlan';

/**
 * Map для связи типа диалога с контроллером диалога
 * @type {{}}
 */
const mapDlg = new Map();

mapDlg.set(messageError.typeDlg, messageError);
mapDlg.set(searchResults.typeDlg, searchResults);
mapDlg.set(editFeature.typeDlg, editFeature);
mapDlg.set(addDepartment.typeDlg, addDepartment);
mapDlg.set(addEmployee.typeDlg, addEmployee);
mapDlg.set(changePlan.typeDlg, changePlan);
export default mapDlg;

