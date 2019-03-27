import React from 'react';
import * as PropTypes from 'prop-types';
import axios from 'axios';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/es/Typography';
import TextField from '@material-ui/core/es/TextField';
import Button from '@material-ui/core/es/Button';
import constructApiUrl from '../../lib/constructApiUrl';
import getRandomPassIcons from '../../lib/getRandomPassIcons';
import PassIconDragAndDropGrid from '../PassIconDragAndDropGrid';
import ProgressDots from '../ProgressDots';

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
  button: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
    clear: 'both',
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.api = constructApiUrl(props.api);
    this.state = {
      stage: 1,
      username: '',
      password: {
        passIcons: [],
        flagIcons: [],
        skipIcons: [],
      },
      selected: [],
      validCounter: 0,
      pastStages: [],
      currentPassIcons: [],
      usernameError: false,
      passwordError: false,
      passwordEntry: false,
    };
    this.next = this.next.bind(this);
    this.isRuleOne = this.isRuleOne.bind(this);
    this.isRuleTwo = this.isRuleTwo.bind(this);
    this.isRuleThree = this.isRuleThree.bind(this);
    this.isValid = this.isValid.bind(this);
    this.getNumberOfConnections = this.getNumberOfConnections.bind(this);
    this.setRandomStage = this.setRandomStage.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.pairIcon = this.pairIcon.bind(this);
    this.login = this.login.bind(this);
  }

  onSuccess() {
    const { onSuccess } = this.props;

    onSuccess();
  }

  getNumberOfConnections() {
    const { selected } = this.state;

    return selected.length;
  }

  setRandomStage() {
    const { pastStages } = this.state;

    const remainingStages = [...Array(3).keys()]
      .map(x => x + 1)
      .filter(stage => !pastStages.includes(stage));

    const randomStage =
      remainingStages[Math.floor(Math.random() * remainingStages.length)];

    let randomPassIcons = getRandomPassIcons();

    while (
      (randomStage === 1 && !this.isRuleOne(randomPassIcons)) ||
      (randomStage === 2 && !this.isRuleTwo(randomPassIcons)) ||
      (randomStage === 3 && !this.isRuleThree(randomPassIcons))
    ) {
      randomPassIcons = getRandomPassIcons();
    }

    this.setState({
      currentPassIcons: randomPassIcons,
      pastStages: [...pastStages, randomStage],
    });
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

  isRuleOne(icons) {
    const {
      password: { passIcons, flagIcons, skipIcons },
    } = this.state;

    return (
      flagIcons.some(flag => icons.includes(flag)) &&
      !skipIcons.some(skip => icons.includes(skip)) &&
      passIcons.filter(pass => icons.includes(pass)).length >= 1
    );
  }

  isRuleTwo(icons) {
    const {
      password: { passIcons, skipIcons },
    } = this.state;

    return (
      skipIcons.some(skip => icons.includes(skip)) &&
      passIcons.filter(pass => icons.includes(pass)).length >= 5
    );
  }

  isRuleThree(icons) {
    const {
      password: { passIcons, flagIcons },
    } = this.state;

    return (
      !flagIcons.some(flag => icons.includes(flag)) &&
      !passIcons.some(pass => icons.includes(pass))
    );
  }

  isValid(selectedIcons) {
    const {
      selected,
      password: { passIcons, skipIcons },
    } = this.state;

    if (this.isRuleOne(selectedIcons)) {
      return selected.filter(icon => passIcons.includes(icon)).length >= 1;
    }

    if (this.isRuleTwo(selectedIcons)) {
      return (
        selected.filter(icon => skipIcons.includes(icon)).length === 1 &&
        selected.filter(icon => passIcons.includes(icon)).length === 5
      );
    }

    return this.isRuleThree(selectedIcons);
  }

  async next() {
    const { username } = this.state;

    await this.getUser(username)
      .then(res => {
        if (!res.data) {
          this.setState({ usernameError: true });
          return;
        }

        this.setState({
          password: res.data.password,
          passwordEntry: true,
        });

        this.setRandomStage();
      })
      .catch(err => console.log(err));
  }

  pairIcon(sourceIcon, targetIcon) {
    const { selected } = this.state;

    if (
      selected.length < 6 &&
      !selected.filter(
        icon => icon.source === sourceIcon && icon.target === targetIcon
      ).length
    ) {
      this.setState({
        selected: [...selected, { source: sourceIcon, target: targetIcon }],
        passwordError: false,
      });
    }
  }

  login() {
    const { selected, validCounter, stage } = this.state;

    if (selected.length < 6) {
      this.setState({
        passwordError: true,
      });
      return;
    }

    if (this.isValid(selected))
      this.setState({ validCounter: validCounter + 1 });

    if (stage < 3) {
      this.setState({
        stage: stage + 1,
        selected: [],
      });
      this.setRandomStage();
      return;
    }

    if (validCounter !== 3) {
      this.setState({
        stage: 1,
        selected: [],
        validCounter: 0,
        pastStages: [],
        passwordError: true,
      });
      return;
    }

    this.onSuccess();
  }

  render() {
    const { classes } = this.props;

    const { passwordEntry } = this.state;

    const UsernameInput = () => {
      const { usernameError, username } = this.state;

      return (
        <>
          <Typography component="p" align="center" className={classes.text}>
            Please enter your username
          </Typography>
          <TextField
            style={{ textAlign: 'center' }}
            label="Username"
            autoFocus
            required
            error={usernameError}
            value={username}
            onChange={event =>
              this.setState({
                username: event.target.value,
                usernameError: false,
              })
            }
            helperText="Please enter your username"
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
    };

    const PasswordInput = () => {
      const { stage, currentPassIcons, passwordError, selected } = this.state;

      return (
        <>
          <Typography component="p" className={classes.text}>
            Stage {stage} of 3
          </Typography>
          <div>
            <ProgressDots numberOfConnections={selected.length} />
            <PassIconDragAndDropGrid
              passIcons={currentPassIcons}
              pairIcon={this.pairIcon}
              error={passwordError}
            />
          </div>
          <div>
            <Button
              variant="contained"
              className={classes.button}
              onClick={this.login}
            >
              <Typography variant="subtitle1" color="primary">
                Login
              </Typography>
            </Button>
          </div>
        </>
      );
    };

    return (
      <div className={classes.root}>
        <Typography component="h3" variant="h5" className={classes.title}>
          Login
        </Typography>
        {!passwordEntry ? <UsernameInput /> : <PasswordInput />}
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  api: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default withStyles(styles)(Login);
