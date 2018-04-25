import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TablePagination from 'react-md/lib/DataTables/TablePagination';
import {
  Grid,
  Cell,
  Paper,
} from 'react-md';

import * as ManualActions from '../../actions/ManualActions';

class ManualPage extends React.Component {
  constructor(props) {
    super(props);
    this.showInfo = this.showInfo.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    if (this.props.countRows === 0) {
      console.log('componentDidMount');
      this.props.actions.manual.filterFeatures('');
    }
  }

  changePage(startRow, rowsPerPage) {
    this.props.actions.manual.changePage(startRow, rowsPerPage);
  }

  showInfo(feature) {
    this.props.actions.manual.showFeatureInfo(feature);
  }

  render() {
    return (
      <div id='manual-grid' style={{ paddingTop: 16 }}>
        <Grid noSpacing>
          {this.props.features.map(f => (
            <Cell
              key={`cell${f.n}`}
              size={2}
            >
              <Paper
                id={`btn_show_info${f.n}`}
                onClick={() => this.showInfo(f)}
                raiseOnHover
                zDepth={0}
                className='md-text--theme-primary md-pointer--hover md'
                style={{ padding: 8 }}
              >
                {f.name}
              </Paper>
            </Cell>
        ))}
        </Grid>
        <TablePagination
          baseId='manual-grid'
          rows={this.props.countRows}
          rowsPerPage={this.props.params.rowsPerPage}
          rowsPerPageLabel='Строк на страницу'
          onPagination={this.changePage}
          page={(this.props.params.startRow / this.props.params.rowsPerPage) + 1}
        />
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return { ...state.manual };
};

const mapDispatchToProps = function (dispatch) {
  return {
    actions: {
      manual: bindActionCreators(ManualActions, dispatch),
    },
  };
};


ManualPage.propTypes = {
  features: PropTypes.arrayOf(PropTypes.object).isRequired,
  countRows: PropTypes.number.isRequired,
  params: PropTypes.shape({
    startRow: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    manual: PropTypes.shape({
      changePage: PropTypes.func.isRequired,
      filterFeatures: PropTypes.func.isRequired,
      showFeatureInfo: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

const ConnectedManualPage = connect(mapStateToProps, mapDispatchToProps)(ManualPage);
export { ManualPage, ConnectedManualPage };
