import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  NavigationDrawer,
  CircularProgress,
} from 'react-md';

import { ConnectedModalRoot } from '../dlg/ModalRoot';
import { ConnectedQuestionPage } from '../question';
import { ConnectedResultPage } from '../result';
import AdminPage from '../admin';
import { ConnectedReportPage } from '../report';
import { ConnectedManualPage } from '../manual';
import { ConnectedFeatureInfo } from '../manual/FeatureInfo';

import { ConnectedSetupFeaturePage } from '../setup_feature';
import { ConnectedSetupFeatureGroupPage } from '../setup_feature_group';
import { ConnectedSetupEmployeePage } from '../setup_employee';
import { ConnectedSetupDepartmentPage } from '../setup_department';
import { ConnectedPlanPage } from '../plan';
import { ConnectedLoginPage } from '../login';

import NavLink from './NavLink';

import { history } from '../../store';
import { loginLink, linksForAdmin, linksForSeller } from './links';
import buildToolBar from './buildToolBar';
import { initVar } from '../../actions/InitVarActions';
import openDlg from '../../actions/ModalActions';
import * as SetupDepartmentActions from '../../actions/SetupDepartmentActions';
import * as ManualActions from '../../actions/ManualActions';
import * as SetupFeatureActions from '../../actions/SetupFeatureActions';
import * as ReportActions from '../../actions/ReportActions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getNavItems = this.getNavItems.bind(this);
  }

  getNavItems() {
    let navItems = [];
    switch (this.props.app.role) {
      case '':
        navItems = loginLink;
        break;
      case 'Админ':
        navItems = linksForAdmin;
        break;
      default:
        navItems = linksForSeller;
    }
    return navItems.map(props => <NavLink {...props} key={props.to} />);
  }

  render() {
    const { actions, childs } = buildToolBar(history.location.pathname, this.props);
    const routing = ((location) => {
      if (this.props.app.role === '') {
        return (
          <Switch key={location.key}>
            <Route path='/' location={location} component={ConnectedLoginPage} />
          </Switch>);
      }
      if (this.props.app.role === 'Админ') {
        return (
          <Switch key={location.key}>
            {/* <Route exact path='/' location={location} component={ConnectedReportPage} /> */}
            <Route exact path='/' location={location} component={ConnectedManualPage} />
            <Route exact path='/result' location={location} component={ConnectedResultPage} />
            <Route exact path='/manual/feature' location={location} component={ConnectedFeatureInfo} />
            <Route exact path='/manual' location={location} component={ConnectedManualPage} />
            <Route exact path='/admin' location={location} component={AdminPage} />
            <Route exact path='/report' location={location} component={ConnectedReportPage} />
            <Route exact path='/setup_feature' location={location} component={ConnectedSetupFeaturePage} />
            <Route exact path='/setup_feature_group' location={location} component={ConnectedSetupFeatureGroupPage} />
            <Route exact path='/setup_employee' location={location} component={ConnectedSetupEmployeePage} />
            <Route exact path='/setup_department' location={location} component={ConnectedSetupDepartmentPage} />
            <Route exact path='/plan' location={location} component={ConnectedPlanPage} />
          </Switch>);
      }
      return (
        <Switch key={location.key}>
          <Route exact path='/question' location={location} component={ConnectedQuestionPage} />
          <Route exact path='/result' location={location} component={ConnectedResultPage} />
          <Route exact path='/manual/feature' location={location} component={ConnectedFeatureInfo} />
          <Route exact path='/manual' location={location} component={ConnectedManualPage} />
          <Route exact path='/' location={location} component={ConnectedQuestionPage} />
        </Switch>);
    }
    );
    // const _navItems = this.state.login ?
    //   navItems.map(props => <NavLink {...props} key={props.to} />) :
    //   [<NavLink {...loginLink} key={loginLink.to} />];
    return (
      <ConnectedRouter history={history}>
        <Route
          render={({ location }) => (
            <NavigationDrawer
              drawerTitle='МДТ'
              navItems={this.getNavItems()}
              mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
              tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
              desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
              toolbarActions={actions}
              toolbarChildren={childs}
            >
              {this.props.app.progress &&
              <CircularProgress
                id='progress'
                key='progress'
                scale={2}
                className='loading'
                centered
              />
              }
              {
                 routing(location)
              }
              <ConnectedModalRoot openDlg={openDlg} />
            </NavigationDrawer>
        )}
        />
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = function (state) {
  return state;
};

const mapDispatchToProps = function (dispatch) {
  return {
    actions: {
      initVar: bindActionCreators(initVar, dispatch),
      openDlg: bindActionCreators(openDlg, dispatch),
      setupDepartmentActions: bindActionCreators(SetupDepartmentActions, dispatch),
      manual: bindActionCreators(ManualActions, dispatch),
      feature: bindActionCreators(SetupFeatureActions, dispatch),
      report: bindActionCreators(ReportActions, dispatch),
    },
  };
};

App.propTypes = {
  actions: PropTypes.shape({
    initVar: PropTypes.func.isRequired,
    openDlg: PropTypes.func.isRequired,
  }).isRequired,
  app: PropTypes.shape({
    progress: PropTypes.bool.isRequired,
    token: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
