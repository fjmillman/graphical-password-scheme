import React from 'react';
import * as PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Router from 'next/router';
import { Login } from 'graphical-password-scheme';
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
});

const LoginPage = ({ classes }) => {
  const onSuccess = () => Router.push('/success');

  return (
    <div className={classes.layout}>
      <NavigationBar />
      <main className={classes.main}>
        <Login api="api/user" onSuccess={onSuccess} />
      </main>
    </div>
  );
};

LoginPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
};

export default withStyles(styles)(LoginPage);
