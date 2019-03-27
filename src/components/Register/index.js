import React from 'react';
import * as PropTypes from 'prop-types';
import axios from 'axios';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/es/Typography';
import TextField from '@material-ui/core/es/TextField';
import Icon from '@material-ui/core/es/Icon';
import Button from '@material-ui/core/es/Button';
import PassIconSelectionGrid from '../PassIconSelectionGrid';
import constructApiUrl from '../../lib/constructApiUrl';
import getAllPassIcons from '../../lib/getAllPassIcons';

const styles = theme => ({
  root: {
    textAlign: 'center',
  },
  title: {
    marginBottom: theme.spacing.unit * 3,
  },
  text: {
    margin: theme.spacing.unit * 3,
  },
  passIcon: {
    fontSize: 10,
    color: 'rgba(0, 0, 255, 0.5)',
  },
  flagIcon: {
    fontSize: 10,
    color: 'rgba(255, 0, 0, 0.5)',
  },
  skipIcon: {
    fontSize: 10,
    color: 'rgba(0, 255, 0, 0.5)',
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
  },
});

class Register extends React.Component {
  constructor(props) {
    super(props);
    const { api } = props;
    this.api = constructApiUrl(api);
    this.state = {
      username: '',
      allPassIcons: getAllPassIcons(),
      passIcons: [],
      skipIcons: [],
      flagIcons: [],
      usernameError: false,
      passwordError: false,
      passwordEntry: false,
    };
    this.onSuccess = this.onSuccess.bind(this);
    this.getToggle = this.getToggle.bind(this);
    this.toggleIcon = this.toggleIcon.bind(this);
    this.getUser = this.getUser.bind(this);
    this.next = this.next.bind(this);
    this.register = this.register.bind(this);
  }

  onSuccess() {
    const { onSuccess } = this.props;

    onSuccess();
  }

  getToggle(icon) {
    const { passIcons, skipIcons, flagIcons } = this.state;

    if (passIcons.includes(icon)) return 'pass';
    if (skipIcons.includes(icon)) return 'skip';
    if (flagIcons.includes(icon)) return 'flag';

    return false;
  }

  getUser(username) {
    try {
      return axios.get(this.api, {
        params: {
          username: username || {},
        },
      });
    } catch (err) {
      console.error(err.stack);
      return {};
    }
  }

  toggleIcon(icon) {
    const { passIcons, skipIcons, flagIcons } = this.state;

    if (passIcons.includes(icon)) {
      this.setState({
        passIcons: passIcons.filter(passIcon => passIcon !== icon),
      });
    } else if (skipIcons.includes(icon)) {
      this.setState({
        skipIcons: skipIcons.filter(skipIcon => skipIcon !== icon),
      });
    } else if (flagIcons.includes(icon)) {
      this.setState({
        flagIcons: flagIcons.filter(flagIcon => flagIcon !== icon),
      });
    } else if (passIcons.length < 6) {
      this.setState({ passIcons: [...passIcons, icon] });
    } else if (skipIcons.length < 3) {
      this.setState({ skipIcons: [...skipIcons, icon] });
    } else if (flagIcons.length < 3) {
      this.setState({ flagIcons: [...flagIcons, icon] });
    }
  }

  async next() {
    const { username } = this.state;

    if (username.length === 0) {
      this.setState({ usernameError: true });
      return;
    }

    await this.getUser(username)
      .then(res => {
        if (res.data) {
          this.setState({ usernameError: true });
          return;
        }
        this.setState({
          passwordEntry: true,
        });
      })
      .catch(err => console.log(err));
  }

  async register() {
    const { username, passIcons, skipIcons, flagIcons } = this.state;

    if (passIcons.length < 6 || skipIcons.length < 3 || flagIcons.length < 3) {
      this.setState({
        passwordError: true,
      });
      return;
    }

    const user = {
      username,
      password: {
        passIcons,
        skipIcons,
        flagIcons,
      },
    };

    await axios
      .post(this.api, user || {})
      .then(() => console.log('User is registered'))
      .catch(err => console.error(err.stack));

    this.onSuccess();
  }

  render() {
    const { classes } = this.props;

    const {
      username,
      usernameError,
      allPassIcons,
      passwordError,
      passwordEntry,
    } = this.state;

    const UsernameInput = () => (
      <>
        <Typography component="p" align="center" className={classes.text}>
          Please enter a username
        </Typography>
        <TextField
          autoFocus
          label="Username"
          required
          error={usernameError}
          value={username}
          onChange={event =>
            this.setState({
              username: event.target.value,
              usernameError: false,
            })
          }
          type="string"
          helperText="Please enter a username"
          margin="normal"
          variant="outlined"
        />
        <div>
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.next}
          >
            <Typography variant="subtitle1" color="primary">
              Next
            </Typography>
          </Button>
        </div>
      </>
    );

    const PasswordInput = () => (
      <>
        <Typography component="p" className={classes.text}>
          Select <Icon className={classes.passIcon}>fiber_manual_record</Icon> 6
          pass objects,{' '}
          <Icon className={classes.flagIcon}>fiber_manual_record</Icon> 3 flag
          objects, and{' '}
          <Icon className={classes.skipIcon}>fiber_manual_record</Icon> 3 skip
          objects
        </Typography>
        <PassIconSelectionGrid
          passIcons={allPassIcons}
          getToggle={this.getToggle}
          toggleIcon={this.toggleIcon}
          error={passwordError}
        />
        <div>
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.register}
          >
            <Typography variant="subtitle1" color="primary">
              Register
            </Typography>
          </Button>
        </div>
      </>
    );

    return (
      <div className={classes.root}>
        <Typography component="h3" variant="h5" className={classes.title}>
          Registration
        </Typography>
        {!passwordEntry ? <UsernameInput /> : <PasswordInput />}
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  api: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default withStyles(styles)(Register);
