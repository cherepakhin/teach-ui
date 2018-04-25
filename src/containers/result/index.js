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

import { close } from '../../actions/ResultActions';
import { getNextQuestion } from '../../actions/InitVarActions';

class ResultPage extends React.Component {
   static propTypes = {
     is_correct: PropTypes.bool,
     feature: PropTypes.shape({
       name: PropTypes.string.isRequired,
       info: PropTypes.string.isRequired,
       info_profit: PropTypes.string.isRequired,
       feature_group: PropTypes.arrayOf(shape({
         n: number,
         name: string,
       })),
     }).isRequired,
     actions: PropTypes.shape({
       close: PropTypes.func.isRequired,
       getNextQuestion: PropTypes.func.isRequired,
     }).isRequired,
   };

  onCLose=() => {
    this.props.actions.close();
    this.props.actions.getNextQuestion();
  }

  render() {
    const getSubTitle = (isCorrect) => {
      if (isCorrect === undefined) return undefined;
      let res = <div className='md-background--secondary'>Неправильный ответ</div>;
      if (isCorrect) res = <div className='md-background--primary'>Правильный ответ</div>;
      return res;
    };

    let featureGroupChips = <div />;
    if (this.props.feature.feature_group !== undefined &&
      this.props.feature.feature_group.length > 0) {
      featureGroupChips = this.props.feature.feature_group.map(featureGroup => (<Chip
        id={`feature_group_chip${featureGroup.n}`}
        label={`${featureGroup.parent_name} | ${featureGroup.name}`}
      />));
    }
    return (
      <div className='md-grid'>
        <Card>
          <CardTitle
            title={this.props.feature.name}
            subtitle={getSubTitle(this.props.is_correct)}
          />
          <CardText>
            {featureGroupChips}
            <h3>Характеристика</h3>
            <p>{this.props.feature.info}</p>
            <h3>Выгода</h3>
            <p>{this.props.feature.info_profit}</p>
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
  return { ...state.result };
};

const mapDispatchToProps = function (dispatch) {
  return {
    actions: {
      close: bindActionCreators(close, dispatch),
      getNextQuestion: bindActionCreators(getNextQuestion, dispatch),
    },
  };
};


const ConnectedResultPage = connect(mapStateToProps, mapDispatchToProps)(ResultPage);
export { ResultPage, ConnectedResultPage };
