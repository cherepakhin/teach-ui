import React from 'react';
import PropTypes from 'prop-types';
import { minBy, findIndex, remove, set } from 'lodash';


import {
  DataTable,
  TableHeader,
  TableRow,
  TableBody,
  TableColumn,
  EditDialogColumn,
  Grid,
  Cell,
  Card,
  CardTitle,
  CardActions,
  FontIcon,
} from 'react-md';

import Dialog from 'react-md/lib/Dialogs';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';

import AWidgetDlg from '../AWidgetDlg';
import FeatureGroupChipPage from '../../../components/feature_group_chips/FeatureGroupChipPage';
import { formatDate } from '../../../util';

export default class EditFeatureDlg extends AWidgetDlg {
  constructor(props) {
    super(props);
    /*
        props.modalProps - полное описание хар-ки, вместе с вопросами и ответами по ней
        n:1,
        name: 'Название хар-ки',
        info: 'Техническое описание',
        info_profit: 'Описание выгоды покупателя',
        questions: [
          {
            n: 1
            txt: 'Впрос по хар-ке',
            answer_n: 11,
            answers: [
              {
                n: 11,
                txt: 'Ответ №1'
              },{
                n: 12,
                txt: 'Ответ №2'
              }
            ]
          },{
            Вопрос №2
          }
        ]
     */
    let feature = {};
    const questions = [
      {
        n: 0,
        txt: '',
        answer_n: -1,
        answers: [
          {
            n: -1,
            txt: '',
          },
          {
            n: -2,
            txt: '',
          },
          {
            n: -3,
            txt: '',
          },
          {
            n: -4,
            txt: '',
          },
        ],
      },
    ];

    if (props.feature === undefined) {
      feature = {
        n: 0,
        name: '',
        info: '',
        info_profit: '',
        featureGroups: [],
        questions,

      };
    } else {
      feature = { ...props.feature };
    }
    if (feature.questions === undefined || feature.questions.length === 0) {
      feature.questions = questions;
      console.log(feature);
    }
    this.state = { feature };
  }

  // TODO: Воткнуть вызов
  onSaveFeaureGroups=(featureGroups) => {
    const newState = { ...this.state };
    newState.feature.featureGroups = [...featureGroups];
    this.setState(newState);
  }

  changeAnswer=(answer, txt) => {
    const _state = { ...this.state };
    const idx = findIndex(_state.feature.questions[0].answers, { n: answer.n });
    _state.feature.questions[0].answers[idx].txt = txt;
    this.setState(_state);
  }

  addAnswer=() => {
    const _state = { ...this.state };
    const feature = minBy(_state.feature.questions[0].answers, 'n');
    const newN = feature.n > 0 ? -1 : feature.n - 1;
    _state.feature.questions[0].answers.push({
      n: newN,
      txt: '',
    });
    this.setState(_state);
  }

  fnOk=() => {
    if (this.state.feature.featureGroups.length == 0) {
      alert('Укажите хотя бы одну группу хар-к.');
      return;
    }
    this.props.actions.fnOk(this.state.feature);
  }

  deleteAnswer=(answer) => {
    const _state = { ...this.state };
    remove(_state.feature.questions[0].answers, { n: answer.n });
    this.setState(_state);
  }

  getRows() {
    const _variants = this.state.feature.questions[0].answers.map(answer => (
      <TableRow
        key={`question${answer.n}`}
      >
        <TableColumn
          id={`checkBtn${answer.n}`}
          className='md-table-column md-text-left md-table-column--plain md-text md-table-column--relative md-pointer--hover'
          tooltipLabel='Отметить правильным ответом'
          adjusted={false}
          style={{ paddingRight: 12, paddingLeft: 12 }}
          onClick={() => (this.setState(set({ ...this.state }, 'feature.questions[0].answer_n', answer.n)))}
        >
          <FontIcon
            id={`check_icon${answer.n}`}
            className='md-text--theme-secondary'
          >
            {this.state.feature.questions[0].answer_n === answer.n ? 'check' : 'check_box_outline_blank'}
          </FontIcon>
        </TableColumn>
        <EditDialogColumn
          inline
          adjusted={false}
          value={answer.txt}
          repositionOnResize
          maxLength={500}
          sameWidth
          textFieldStyle={{ width: '100%' }}
          onChange={txt => (this.changeAnswer(answer, txt))}
        />

        <TableColumn
          id={`delete_btn${answer.n}`}
          className='md-pointer--hover '
          tooltipLabel='Удалить'
          onClick={() => this.deleteAnswer(answer)}
        ><FontIcon className='md-text--theme-secondary'>close</FontIcon>
        </TableColumn>
      </TableRow>
    ));
    return _variants;
  }

  render() {
    let info = '';
    if (this.props.feature !== undefined &&
      this.props.feature.employee !== undefined &&
      this.props.feature.employee.name !== undefined &&
      this.props.feature.ddate !== undefined) {
      info = `Изменил: ${this.props.feature.employee.name} ${formatDate(this.props.feature.ddate)}`;
    }
    const nav = <Button icon onClick={this.handleCancel}>close</Button>;
    const action = (
      <Button
        raised
        primary
        onClick={this.fnOk}
      >Сохранить
      </Button>
    );
    return (
      <Dialog
        id='dlg_add_question'
        visible
        onHide={this.handleCancel}
        aria-labelledby='dlg_add_question_area'
        fullPage
      >
        <Toolbar
          id='dlg_show_edit_feature'
          colored
          nav={nav}
          actions={action}
          title='Характеристика'
          fixed
        />
        <Grid className='md-toolbar-relative md-text-field-container--padded-block'>
          <Cell size={12}>
            {info}
          </Cell>
          <Cell size={12}>
            <TextField
              required
              id='txt_name_feature'
              label='Название'
              value={this.state.feature.name}
              onChange={name => (this.setState(set({ ...this.state }, 'feature.name', name)))}
              lineDirection='center'
              errorText='Поле должно быть заполнено'
            />
          </Cell>
          <Cell size={12}>
            <FeatureGroupChipPage
              onSave={this.onSaveFeaureGroups}
              featureGroups={this.props.featureGroups}
              selectedFeatureGroups={this.state.feature.featureGroups}
            />
          </Cell>
          <Cell size={12}>
            <TextField
              required
              rows={1}
              id='txt_info_feature'
              label='Описание'
              lineDirection='center'
              errorText='Поле должно быть заполнено'
              value={this.state.feature.info}
              onChange={info => (this.setState(set({ ...this.state }, 'feature.info', info)))}
            />
          </Cell>
          <Cell size={12}>
            <TextField
              required
              rows={1}
              id='txt_info_profit_feature'
              label='Выгода покупателя'
              lineDirection='center'
              errorText='Поле должно быть заполнено'
              value={this.state.feature.info_profit}
              onChange={info_profit => (this.setState(set({ ...this.state }, 'feature.info_profit', info_profit)))}
            />
          </Cell>
          <Cell size={12} >
            <Card
              tableCard
              style={{ paddingTop: 0 }}
            >
              <CardTitle
                style={{ paddingTop: 0, paddingBottom: 0 }}
                title={<TextField
                  required
                  id='txt_question'
                  label={<h4>Вопрос для тестирования</h4>}
                  lineDirection='center'
                  errorText='Поле должно быть заполнено'
                  resize={{ min: 500, max: 500 }}
                  value={this.state.feature.questions[0].txt}
                  onChange={txt => (this.setState(set({ ...this.state }, 'feature.questions[0].txt', txt)))}
                  style={{ paddingTop: 8 }}
                  rows={1}
                />}
              />
              <DataTable
                baseId='table_questions'
                responsive
                plain
                className='md-cell md-cell--12-desktop md-cell--8-tablet md-cell--6-phone'
                style={{ paddingTop: 0 }}
              >
                <TableHeader style={{ paddingBottom: 0 }}>
                  <TableRow>
                    <TableColumn
                      style={{
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingRight: 12,
                        paddingLeft: 12,
                      }}
                    />
                    <TableColumn
                      grow
                      adjusted={false}
                      style={{ paddingTop: 0, paddingBottom: 0 }}
                    ><h4>Варианты ответов</h4>
                    </TableColumn>
                    <TableColumn style={{ paddingTop: 0, paddingBottom: 0 }} />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {this.getRows()}
                </TableBody>
              </DataTable>
              <CardActions>
                <Button
                  id='btn_add_answer'
                  flat
                  primary
                  onClick={() => this.addAnswer()}
                >Добавить ответ
                </Button>
              </CardActions>
            </Card>

          </Cell>
        </Grid>
      </Dialog>
    );
  }
}

EditFeatureDlg.propTypes = {
  feature: PropTypes.shape({
    n: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    info_profit: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(PropTypes.shape({
      n: PropTypes.number.isRequired,
      txt: PropTypes.string.isRequired,
      answer_n: PropTypes.number.isRequired,
      answers: PropTypes.arrayOf(PropTypes.shape({
        n: PropTypes.number.isRequired,
        txt: PropTypes.string.isRequired,
      })).isRequired,
    })).isRequired,
  }),
};
