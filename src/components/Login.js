import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PassIcon from "./PassIcon";
import { constructApiUrl } from "../lib/constructApiUrl";

const styles = theme => ({
    text: {
        margin: theme.spacing.unit * 3,
    },
    button: {
        margin: theme.spacing.unit,
        marginTop: theme.spacing.unit * 5,
        float: "right",
        clear: "both"
    },
});

class Login extends React.Component {
    constructor(props) {
        props.apiUrl = constructApiUrl(props.api);
        super(props);
        this.state = {
            usernameEntry: true,
            stage: 1,
            username: "",
            user: {},
            selected: [],
            validCounter: 0,
            pastStages: [],
            passIcons: [
                "star",
                "face",
                "home",
                "print",
                "room",
                "visibility",
                "flag",
                "forward",
                "wifi",
                "work",
                "warning",
                "weekend",
                "computer",
                "watch",
                "headset",
                "sync",
                "ac_unit",
                "beach_access",
                "all_inclusive",
                "cake",
                "email"
            ],
            currentPassIcons: [],
            usernameError: false,
            passwordError: false,
            success: false,
        };
        this.next = this.next.bind(this);
        this.getRandomPassIcons = this.getRandomPassIcons.bind(this);
        this.isRuleOne = this.isRuleOne.bind(this);
        this.isRuleTwo = this.isRuleTwo.bind(this);
        this.isRuleThree = this.isRuleThree.bind(this);
        this.isValid = this.isValid.bind(this);
        this.getRandomStage = this.getRandomStage.bind(this);
        this.getToggle = this.getToggle.bind(this);
        this.toggleIcon = this.toggleIcon.bind(this);
        this.login = this.login.bind(this);
    }

    async next() {
        const user = await axios.get(this.props.apiUrl, this.state.username || {})
            .then(() => console.log("User exists"))
            .catch(err => console.error(err.stack));

        if (!user) {
            this.setState({usernameError: true});
            return;
        }

        this.setState({usernameEntry: false});
    }

    getRandomPassIcons () {
        return [...this.state.passIcons].sort(() => 0.5 - Math.random()).slice(0, 12);
    }

    isRuleOne(icons) {
        return this.state.flagIcons.some(flag => icons.includes(flag)) &&
            !this.state.skipIcons.some(skip => icons.includes(skip)) &&
            this.state.passIcons.filter(pass => icons.includes(pass)).length >= 1;
    }

    isRuleTwo(icons) {
        return this.state.skipIcons.some(skip => icons.includes(skip)) &&
            this.state.passIcons.filter(pass => icons.includes(pass)).length >= 5;
    }

    isRuleThree(icons) {
        return !this.state.flagIcons.some(flag => icons.includes(flag)) &&
            !this.state.passIcons.some(pass => icons.includes(pass));
    }

    isValid(selectedIcons) {
        if (this.isRuleOne(selectedIcons)) {
            return this.state.selected.filter(icon => this.state.passIcons.includes(icon)).length >= 1;
        } else if (this.isRuleTwo(selectedIcons)) {
            return this.state.selected.filter(icon => this.state.skipIcons.includes(icon)).length === 1 &&
                this.state.selected.filter(icon => this.state.passIcons.includes(icon)).length === 5;
        } else if (this.isRuleThree(selectedIcons)) {
            return true;
        } else {
            console.error("Error: Rule logic failure");
        }
    }

    getRandomStage() {
        const remainingStages = [...Array(3).keys()]
            .map(x => ++x)
            .filter(stage => !this.state.pastStages.includes(stage));

        const randomStage = remainingStages[Math.floor(Math.random() * remainingStages.length)];

        let randomPassIcons = this.getRandomPassIcons();

        while (randomStage === 1 && !this.isRuleOne(randomPassIcons) ||
            randomStage === 2 && !this.isRuleTwo(randomPassIcons) ||
            randomStage === 3 && !this.isRuleThree(randomPassIcons)
            ) {
            randomPassIcons = this.getRandomPassIcons();
        }

        this.setState({
            currentPassIcons: randomPassIcons,
            pastStages: [...this.state.pastStages, randomStage],
        });

        return randomPassIcons;
    }

    getToggle(icon) {
        return this.state.selected.includes(icon);
    }

    toggleIcon(icon) {
        if (this.state.selected.includes(icon)) {
            this.setState({
                selected: this.state.selected.filter(selectedIcon => selectedIcon !== icon),
            });
        } else if (this.state.selected.length < 6) {
            this.setState({ selected: [...this.state.selected, icon] });
        }
    }

    login() {
        if (this.state.selected.length !== 6) return;

        if (this.isValid(this.state.selected)) this.setState({validCounter: this.state.validCounter + 1});

        if (this.state.stage < 3) {
            this.setState({
                stage: this.state.stage + 1,
                selected: [],
                currentPassIcons: this.getRandomStage()
            });
            return;
        }

        if (this.state.validCounter !== 3) {
            this.setState({
                stage: 1,
                selected: [],
                validCounter: 0,
                pastStages: [],
                passwordError: true,
            });
            return;
        }

        this.setState({
            success: true
        });
    }

    render() {
        const usernameEntry = () => (
            <React.Fragment>
                <Typography
                    component={"p"}
                    align={"center"}
                    className={this.props.classes.text}
                >
                    Please enter your username
                </Typography>
                <Typography
                    component={"p"}
                    className={this.props.classes.text}
                >
                    <TextField
                        label="Username"
                        required
                        error={this.state.usernameError}
                        className={this.props.classes.textField}
                        value={this.state.username}
                        onChange={event => this.setState({username: event.target.value})}
                        helperText="Please enter a username"
                        margin="normal"
                        variant="outlined"
                    />
                </Typography>
                <Button
                    variant="contained"
                    className={this.props.classes.button}
                    onClick={this.next}
                >
                    <Typography
                        variant="subtitle1"
                        color="primary"
                    >
                        Next
                    </Typography>
                </Button>
            </React.Fragment>
        );

        const passwordEntry = () => (
            <React.Fragment>
                <Typography
                    component={"p"}
                    align={"center"}
                    className={this.props.classes.text}
                >
                    Stage {this.state.stage} of 3
                </Typography>
                <PassIcon
                    register={false}
                    passIcons={this.state.currentPassIcons}
                    getToggle={this.getToggle}
                    toggleIcon={this.toggleIcon}
                    error={this.state.passwordError}
                />
                <Button
                    variant="contained"
                    className={this.props.classes.button}
                    onClick={this.login}
                >
                    <Typography
                        variant="subtitle1"
                        color="primary"
                    >
                        Login
                    </Typography>
                </Button>
            </React.Fragment>
        );

        const success = () => (
            <Typography
                variant="subtitle1"
                color="primary"
            >
                You successfully logged in!
            </Typography>
        );

        return this.state.usernameEntry ? usernameEntry() : !this.state.success ? passwordEntry() : success();
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
