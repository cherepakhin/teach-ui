import React from 'react';
import Button from 'react-md/lib/Buttons';
import { Card } from 'react-md/lib/Cards';
import { history } from '../../store';

class AdminPage extends React.Component {
  render() {
    return (
      <div className='md-grid buttons__group'>
        <Card>
          <Button
            id='setup_department_btn'
            raised
            primary
            onClick={() => (history.push('/setup_department'))}
          >
            Подразделения
          </Button>
          <Button
            id='setup_employee_btn'
            raised
            primary
            onClick={() => (history.push('/setup_employee'))}
          >
            Сотрудники
          </Button>
        </Card>
        <Card>
          <Button
            id='setup_feature_group_btn'
            raised
            primary
            onClick={() => (history.push('/setup_feature_group'))}
          >
            Группы характеристик
          </Button>
          <Button
            id='setup_feature_btn'
            raised
            primary
            onClick={() => (history.push('/setup_feature'))}
          >
            Характеристики
          </Button>
        </Card>
        <Card>
          <Button
            id='setup_plan'
            raised
            primary
            onClick={() => (history.push('/plan'))}
          >
            Планы опросов
          </Button>
        </Card>
      </div>
    );
  }
}


export default AdminPage;
