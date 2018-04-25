import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'react-md/lib/Dialogs';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';
import { DatePicker } from 'react-md/lib/Pickers';

import AWidgetDlg from '../AWidgetDlg';

/*
 Диалог поиска резултатов опроса
 */

class DlgSearchResults extends AWidgetDlg {
  constructor(props) {
    super(props);
    this.state = {
      fromdate: this.props.fromdate,
      todate: this.props.todate,
      feature: '',
      question: '',
      employee: '',
    };
  }

  handleOk() {
    const data = { ...this.state, startRow: 0 };
    this.props.actions.fnOk(data);
  }

  render() {
    const nav = <Button icon onClick={this.handleCancel}>close</Button>;
    const action = (<Button
      raised
      primary
      onClick={this.handleOk}
    >Найти
                    </Button>);
    return (
      <Dialog
        id='dlg_search_results'
        visible
        onHide={this.handleCancel}
        aria-labelledby='dlg_search_results_area'
        fullPage
      >
        <Toolbar
          id='dlg_show_results'
          colored
          nav={nav}
          actions={action}
          title='Найти результаты опроса'
          fixed
        />
        <div className='md-toolbar-relative md-text-field-container--padded-block'>
          <DatePicker
            id='first-day-of-report'
            label='С даты'
            className='md-cell'
            autoOk
            showAllDays
            firstDayOfWeek={1}
            onChange={(dateString, dateObject) =>
              this.setState({ ...this.state, fromdate: dateObject.toISOString().slice(0, 10) })
            }
            defaultValue={this.state.fromdate}
            required
          />
          <DatePicker
            id='to-day-of-report'
            label='По дату'
            className='md-cell'
            autoOk
            showAllDays
            firstDayOfWeek={1}
            onChange={(dateString, dateObject) =>
              this.setState({ ...this.state, todate: dateObject.toISOString().slice(0, 10) })
            }
            defaultValue={this.state.todate}
            required
          />
          <TextField
            key='feature_name'
            id='feature_name'
            label='Характеристика'
            type='text'
            floating
            onChange={feature => this.setState({ ...this.state, feature })}
            value={this.state.feature}
          />
          <TextField
            key='employee_name'
            id='employee_name'
            label='Сотрудник'
            type='text'
            floating
            onChange={employee => this.setState({ ...this.state, employee })}
            value={this.state.employee}
          />
        </div>
      </Dialog>
    );
  }
}

DlgSearchResults.propTypes = {
  modalType: PropTypes.string.isRequired,
};

export default DlgSearchResults;
