import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  CardText,
  CardActions,
  SelectionControlGroup,
} from 'react-md';

import * as QuestionActions from '../../actions/QuestionActions';

class QuestionPage extends React.Component {
  constructor(props) {
    super(props);
    if (props.question.n > 0) {
      this.state = {
        selectedAnswerN: props.question.answers[0].n,
      };
    }
  }


  render() {
    if (this.props.question.n === 0) {
      return <div className='md-grid'>На сегодня нет вопросов для тестирования</div>;
    }
    return (
      <div className='md-grid'>
        <Card>
          <CardText>
            <SelectionControlGroup
              id='questions-radio'
              name='questions-radio'
              type='radio'
              label={this.props.question.txt}
              defaultValue={`${this.props.question.answers[0].n}`}
              controls={this.props.question.answers.map(answer => ({ label: answer.txt, value: `${answer.n}` }))}
              onChange={value => this.setState({ selectedAnswerN: value })}
            />
          </CardText>
          <CardActions centered>
            <Button
              id='btn_send_answer'
              raised
              primary
              iconChildren='play_arrow'
              iconBefore={false}
              onClick={() =>
                (this.props.actions.sendAnswer(this.props.question.n, this.state.selectedAnswerN))
              }
            >Далее
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return { ...state.question };
};

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators(QuestionActions, dispatch),
  };
};


QuestionPage.propTypes = {
  actions: PropTypes.shape({
    sendAnswer: PropTypes.func.isRequired,
  }).isRequired,
  question: PropTypes.shape({
    n: PropTypes.number.isRequired,
    txt: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      n: PropTypes.number.isRequired,
      txt: PropTypes.string.isRequired,
    })),
  }).isRequired,
};

const ConnectedQuestionPage = connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
export { QuestionPage, ConnectedQuestionPage };
