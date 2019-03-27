import React from 'react';
import * as PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/es/IconButton';
import Icon from '@material-ui/core/es/Icon';

const styles = () => ({
  progressDots: {
    flexGrow: 1,
  },
  activeIcon: {
    fontSize: 10,
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '50%',
  },
  inactiveIcon: {
    fontSize: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '50%',
  },
});

const ProgressDots = ({ classes, numberOfConnections }) => {
  const progressIcons = [...Array(numberOfConnections).fill(true)]
    .concat([...Array(6 - numberOfConnections).fill(false)])
    .map(value => (
      <Grid item>
        <IconButton disabled>
          <Icon className={!value ? classes.activeIcon : classes.inactiveIcon}>
            circle
          </Icon>
        </IconButton>
      </Grid>
    ));

  return (
    <Grid container className={classes.progressDots} spacing={16}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={0}>
          {progressIcons}
        </Grid>
      </Grid>
    </Grid>
  );
};

ProgressDots.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  numberOfConnections: PropTypes.number.isRequired,
};

export default withStyles(styles)(ProgressDots);
