import React from 'react';
import * as PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import GridList from '@material-ui/core/es/GridList';
import GridListTile from '@material-ui/core/es/GridListTile';
import PassIcon from '../PassIcon';

const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  grid: {
    width: 305,
    height: 475,
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

class PassIconSelectionGrid extends React.Component {
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
    const { classes, passIcons, getToggle, toggleIcon, error } = this.props;

    const passIconGrid = passIcons.map(passIcon => (
      <GridListTile key={passIcon}>
        <PassIcon
          passIcon={passIcon}
          getToggle={getToggle}
          toggleIcon={toggleIcon}
        />
      </GridListTile>
    ));

    return (
      <div className={classes.root}>
        <GridList
          style={{ backgroundColor: error ? 'rgba(255, 0, 0, 0.2)' : '' }}
          cellHeight={75}
          className={classes.grid}
          cols={4}
        >
          {passIconGrid}
        </GridList>
      </div>
    );
  }
}

PassIconSelectionGrid.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  passIcons: PropTypes.arrayOf(PropTypes.string),
  getToggle: PropTypes.func.isRequired,
  toggleIcon: PropTypes.func.isRequired,
  error: PropTypes.bool,
};

export default withStyles(styles)(PassIconSelectionGrid);
