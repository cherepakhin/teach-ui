import React from 'react';
import PropTypes, { string } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ReportActions from '../../actions/ReportActions';
import { ConnectedEmployeeFeatureGroupReport } from './employee_feature_group';
import { ConnectedPivotReportPage } from './pivot';
import { ConnectedPivotCreateFeatureReportPage } from './pivot_create_feature';
import { ConnectedDlgDetailEmployeeReport } from './dlg_detail_employee_report';

class ReportPage extends React.Component {
  state={
    visibleDetail: false,
  }
  getContent=() => {
    switch (this.props.activeReport) {
      case 'Отчет Сотрудники->Группы хар-к': {
        return (<ConnectedEmployeeFeatureGroupReport
          showDetail={this.showDetail}
        />);
      }
      case 'Сводный отчет': {
        return (<ConnectedPivotReportPage
          showDetail={this.showDetail}
        />);
      }
      case 'Ввод новых хар-к': {
        return (<ConnectedPivotCreateFeatureReportPage />);
      }
      default:
        return <div />;
    }
  }

  showDetail=(employeeName, year, month) => {
    this.props.actions.buildReport('Результаты опроса сотрудника', { employee_name: employeeName, year, month });
    this.setState({ visibleDetail: true });
  }

  hideDetail=() => {
    this.setState({ visibleDetail: false });
    this.props.actions.setActiveReport(this.props.activeReport);
  }

  render() {
    return (
      <div>
        <ConnectedDlgDetailEmployeeReport
          visible={this.state.visibleDetail}
          hideDetail={this.hideDetail}
        />
        {this.getContent()}
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return { ...state.report };
};

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators(ReportActions, dispatch),
  };
};

ReportPage.propTypes = {
  // report: PropTypes.arrayOf(PropTypes.shape({
  //   employee_name: PropTypes.string.isRequired,
  //   results: PropTypes.arrayOf(PropTypes.shape({
  //     n: PropTypes.number.isRequired,
  //     ddate: PropTypes.string.isRequired,
  //     is_correct: PropTypes.bool.isRequired,
  //   })).isRequired,
  //   summary: PropTypes.string.isRequired,
  // })).isRequired,
  activeReport: string,
  report: PropTypes.shape().isRequired,
  actions: PropTypes.shape({
    setActiveReport: PropTypes.func.isRequired,
    buildPivotReport: PropTypes.func.isRequired,
    buildReport: PropTypes.func.isRequired,
  }).isRequired,
  params: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
  }).isRequired,

};

const ConnectedReportPage = connect(mapStateToProps, mapDispatchToProps)(ReportPage);
export { ReportPage, ConnectedReportPage };
