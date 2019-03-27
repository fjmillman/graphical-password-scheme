import React from 'react';
import * as PropTypes from 'prop-types';
import Router from 'next/router';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
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
    textAlign: 'center',
    margin: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 5,
  },
  text: {
    margin: theme.spacing.unit * 3,
  },
  button: {
    margin: theme.spacing.unit * 2,
  },
});

const IndexPage = ({ classes }) => (
  <div className={classes.layout}>
    <NavigationBar />
    <main className={classes.main}>
      <Typography component="h2" variant="h5">
        Welcome
      </Typography>
      <Typography component="p" className={classes.text}>
        This is a demo of the over-the-shoulder-attack (OSA) resistant graphical
        password authentication scheme that I proposed as part of the Research
        Project for my MComp Computer Science Masters Degree. It implements the
        use of a drag and drop mechanism which was hypothesised to improve
        OSA-resistance over the typical method of selection. You can have a go
        by registering as a user, and then attempting to login via the buttons
        below. You can view the instructions via the page icon in the top right
        hand corner. If you would like to see the code I used to design and
        develop this scheme as well as this website itself, check it out at{' '}
        <Link href="https://github.com/fjmillman/graphical-password-scheme">
          <a target="_blank">github.com/fjmillman/graphical-password-scheme</a>
        </Link>
      </Typography>
      <div>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => Router.push('/register')}
        >
          <Typography variant="subtitle1" color="primary">
            Register
          </Typography>
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => Router.push('/login')}
        >
          <Typography variant="subtitle1" color="primary">
            Login
          </Typography>
        </Button>
      </div>
    </main>
  </div>
);

IndexPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
};

export default withStyles(styles)(IndexPage);
