import React from 'react';
import * as PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/es/IconButton';
import Icon from '@material-ui/core/es/Icon';

const styles = () => ({
  root: {
    textAlign: 'center',
  },
  icon: {
    fontSize: 48,
    color: 'rgb(0, 0, 0)',
  },
  inactiveIcon: {
    background: 'rgba(0, 0, 0, 0)',
  },
  passIcon: {
    background: 'rgba(0, 0, 255, 0.25)',
  },
  flagIcon: {
    background: 'rgba(255, 0, 0, 0.25)',
  },
  skipIcon: {
    background: 'rgba(0, 255, 0, 0.25)',
  },
});

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.toggleIcon = this.toggleIcon.bind(this);
    this.getToggle = this.getToggle.bind(this);
  }

  getToggle(icon) {
    const { getToggle } = this.props;
    return getToggle(icon);
  }

  toggleIcon(icon) {
    const { toggleIcon } = this.props;
    toggleIcon(icon);
  }

  render() {
    const { classes, passIcon } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={() => this.toggleIcon(passIcon)}
          className={
            !this.getToggle(passIcon)
              ? classes.inactiveIcon
              : this.getToggle(passIcon) === 'pass'
              ? classes.passIcon
              : this.getToggle(passIcon) === 'flag'
              ? classes.flagIcon
              : classes.skipIcon
          }
        >
          <Icon className={classes.icon}>{passIcon}</Icon>
        </IconButton>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  passIcon: PropTypes.string.isRequired,
  getToggle: PropTypes.func.isRequired,
  toggleIcon: PropTypes.func.isRequired,
};

export default withStyles(styles)(Index);
