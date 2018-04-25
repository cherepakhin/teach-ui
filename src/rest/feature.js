import soFetch from '../util/soFetch';
import { URL_SERVER } from '../constants';
/**
 * [getFeaturesByName Получение хар-к по имени
 * @param  {[type]}  name слово для поиска
 *                   start_row: int
 *                   rows_per_page: int
 * }
 *
 * @return {[type]}      {results: {
 *                                 features: [{}]
 *                                 count_rows: int
 * }}
 */
export const getFeaturesByName = function (name = '', start_row = 0, rows_per_page = 10, format = 'short') {
  return soFetch.get({
    url: `${URL_SERVER}/feature/`,
    data: {
      name, start_row, rows_per_page, format,
    },
  })
    .then((json) => {
      let features = [];
      if (json.results.length > 0) {
        features = json.results;
      }
      return {
        count_rows: json.count_rows || 0,
        features,
      };
    });
};

