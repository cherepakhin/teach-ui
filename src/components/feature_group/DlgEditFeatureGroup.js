import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  DialogContainer,
} from 'react-md';

class DlgEditFeatureGroup extends PureComponent {
  static propTypes = {
    featureGroup: PropTypes.shape({
      n: PropTypes.number,
      parent_n: PropTypes.number,
      name: PropTypes.string,
    }).isRequired,
    save: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      featureGroup: this.props.featureGroup,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(...this.state, { featureGroup: nextProps.featureGroup });
  }

  render() {
    const actions = [];
    actions.push(<Button flat secondary onClick={this.props.cancel}>Отмена</Button>);
    actions.push(<Button flat primary onClick={() => this.props.save(this.state.featureGroup)}>Сохранить</Button>);
    return (
      <DialogContainer
        id='dlg_edit_feature_group'
        visible={this.props.visible}
        onHide={this.props.cancel}
        actions={actions}
        title='Название группы'
      >
        <TextField
          id='txt_feature_group_name'
          value={this.state.featureGroup.name}
          onChange={txt => this.setState(...this.state, {
            featureGroup: {
              n: this.props.featureGroup.n,
              parent_n: this.props.featureGroup.parent_n,
              name: txt,
            },
          })}
        />
      </DialogContainer>
    );
  }
}

export default DlgEditFeatureGroup;
