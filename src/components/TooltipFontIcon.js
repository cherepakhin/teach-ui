import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FontIcon, injectTooltip } from 'react-md';

const styles = {
  tooltipContainer: {
    position: 'relative',
    display: 'inline-block',
  },
};

/**
 * Starting with React 16, Stateless functions can not have refs, so need to create
 * a component class to work as expected.
 */
class TooltipFontIcon extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    tooltip: PropTypes.node.isRequired,
    iconClassName: PropTypes.string,
    styleIcon: PropTypes.string,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const {
      children, tooltip, iconClassName, styleIcon,
    } = this.props;
    return (
      <div style={styles.tooltipContainer}>
        {tooltip}
        <FontIcon
          secondary
          onClick={this.props.onClick}
          iconClassName={iconClassName}
          style={styleIcon}
        >{children}
        </FontIcon>
      </div>
    );
  }
}

export default injectTooltip(TooltipFontIcon);
