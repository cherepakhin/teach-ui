import React from 'react';
import PropTypes, { number, string, shape } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button,
  Card,
  CardTitle,
  CardText,
  CardActions,
  Chip } from 'react-md';

import { closeFeatureInfo } from '../../actions/ManualActions';
import { formatDate } from '../../util';

class FeatureInfo extends React.Component {
   static propTypes = {
     feature: PropTypes.shape({
       name: PropTypes.string.isRequired,
       ddate: PropTypes.string.isRequired,
       employee: shape({
         name: string,
       }),
       info: PropTypes.string.isRequired,
       info_profit: PropTypes.string.isRequired,
       feature_group: PropTypes.arrayOf(shape({
         n: number,
         name: string,
         parent_name: string,
       })),
     }).isRequired,
     actions: PropTypes.shape({
       closeFeatureInfo: PropTypes.func.isRequired,
     }).isRequired,
   };

  onCLose=() => {
    this.props.actions.closeFeatureInfo();
  }

  render() {
    let featureGroupChips = <div />;
    if (this.props.feature.feature_group !== undefined &&
      this.props.feature.feature_group.length > 0) {
      featureGroupChips = this.props.feature.feature_group.map(featureGroup => (<Chip
        key={`feature_group_chip${featureGroup.n}`}
        id={`feature_group_chip${featureGroup.n}`}
        label={`${featureGroup.parent_name} | ${featureGroup.name}`}
      />));
    }
    return (
      <div className='md-grid'>
        <Card>
          <CardTitle
            title={this.props.feature.name}
          />
          <CardText>
            {featureGroupChips}
            <h3>Характеристика</h3>
            <p>{this.props.feature.info}</p>
            <h3>Выгода</h3>
            <p>{this.props.feature.info_profit}</p>
            <div className='md-text-right md-caption'>{`${this.props.feature.employee.name}(${formatDate(this.props.feature.ddate)})`}</div>
          </CardText>
          <CardActions centered>
            <Button
              raised
              primary
              iconChildren='done'
              onClick={this.onCLose}
            >Закрыть
            </Button>
          </CardActions>
        </Card>
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
      closeFeatureInfo: bindActionCreators(closeFeatureInfo, dispatch),
    },
  };
};


const ConnectedFeatureInfo = connect(mapStateToProps, mapDispatchToProps)(FeatureInfo);
export { FeatureInfo, ConnectedFeatureInfo };
