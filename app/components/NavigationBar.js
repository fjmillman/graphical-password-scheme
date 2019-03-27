import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Router from 'next/router';
import InstructionsDialog from './InstructionsDialog';

const styles = () => ({
  grow: {
    flexGrow: 1,
  },
});

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    const { open } = this.state;

    return (
      <Toolbar>
        <Typography
          component="h2"
          variant="h5"
          className={classes.grow}
          nowrap="true"
        >
          Graphical Password Authentication Scheme
        </Typography>
        <IconButton
          color="inherit"
          aria-label="Home"
          onClick={() => Router.push('/')}
        >
          <Icon>home</Icon>
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="Instructions"
          onClick={this.handleClickOpen}
        >
          <Icon>library_books</Icon>
        </IconButton>
        <InstructionsDialog open={open} handleClose={this.handleClose} />
        <IconButton
          color="inherit"
          aria-label="Register"
          onClick={() => Router.push('/register')}
        >
          <Icon>person_add</Icon>
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="Login"
          onClick={() => Router.push('/login')}
        >
          <Icon>exit_to_app</Icon>
        </IconButton>
      </Toolbar>
    );
  }
}

export default withStyles(styles)(NavigationBar);
