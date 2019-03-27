import React from 'react';
import * as PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import NavigationBar from '../components/NavigationBar';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  main: {
    margin: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 5,
  },
  text: {
    margin: theme.spacing.unit * 3,
  },
});

const SuccessPage = ({ classes }) => (
  <div className={classes.layout}>
    <NavigationBar />
    <main className={classes.main}>
      <Typography component="p" align="center" className={classes.text}>
        Success! You logged in successfully!
      </Typography>
    </main>
  </div>
);

SuccessPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
};

export default withStyles(styles)(SuccessPage);
