import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-md';
import TooltipFontIcon from '../../components/TooltipFontIcon';

class ItemFeatureGroup extends PureComponent {
  static propTypes = {
    featureGroup: PropTypes.shape({
      n: PropTypes.number,
      name: PropTypes.string,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
  };

  render() {
    const {
      featureGroup, onChange, onDelete, onClick,
    } = this.props;
    return (<ListItem
      key={featureGroup.n}
      primaryText={featureGroup.name}
      onClick={onClick}
      active={this.props.active}
      style={this.props.active ? { background: '#eee' } : {}}
      rightIcon={
        <div>
          <TooltipFontIcon
            onClick={onChange}
            tooltipLabel='Изменить'
            tooltipPosition='bottom'
          >
                              mode_edit
          </TooltipFontIcon>
          <TooltipFontIcon
            onClick={onDelete}
            tooltipLabel='Удалить'
            tooltipPosition='bottom'
          >
            close
          </TooltipFontIcon>
        </div>
      }
    />);
  }
}

export default ItemFeatureGroup;
