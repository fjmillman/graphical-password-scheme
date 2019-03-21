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
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});

class Register extends React.Component {
    constructor(props) {
        props.apiUrl = constructApiUrl(props.api);
        super(props);
        this.state = {
            username: "",
            passIcons: [],
            skipIcons: [],
            flagIcons: [],
            usernameError: false,
            passwordError: false,
        };
        this.getToggle = this.getToggle.bind(this);
        this.toggleIcon = this.toggleIcon.bind(this);
        this.register = this.register.bind(this);
    }

    getToggle(icon) {
        if (this.state.passIcons.includes(icon)) return "pass";
        if (this.state.skipIcons.includes(icon)) return "skip";
        if (this.state.flagIcons.includes(icon)) return "flag";
        return false;
    }

    toggleIcon(icon) {
        if (this.state.passIcons.includes(icon)) {
            this.setState({
                passIcons: this.state.passIcons.filter(passIcon => passIcon !== icon),
            });
        } else if (this.state.skipIcons.includes(icon)) {
            this.setState({
                skipIcons: this.state.skipIcons.filter(skipIcon => skipIcon !== icon),
            });
        } else if (this.state.flagIcons.includes(icon)) {
            this.setState({
                flagIcons: this.state.flagIcons.filter(flagIcon => flagIcon !== icon),
            });
        } else if (this.state.passIcons.length < 6) {
            this.setState({ passIcons: [...this.state.passIcons, icon] });
        } else if (this.state.skipIcons.length < 3) {
            this.setState({ skipIcons: [...this.state.skipIcons, icon] });
        } else if (this.state.flagIcons.length < 3) {
            this.setState({ flagIcons: [...this.state.flagIcons, icon] });
        }
    }

    async register() {
        if (this.state.username.length === 0) {
            this.setState({ usernameError: true });
            return;
        }

        if (this.state.passIcons.length < 6 ||
            this.state.skipIcons.length < 3 ||
            this.state.flagIcons.length < 3
        ) {
            this.setState({
                usernameError: false,
                passwordError: true,
            });
            return;
        }

        const user = {
            username: this.state.username,
            password: {
                passIcons: this.state.passIcons,
                skipIcons: this.state.skipIcons,
                flagIcons: this.state.flagIcons,
            },
        };

        await axios.post(this.props.apiUrl, user || {})
            .then(() => console.log("User is registered"))
            .catch(err => console.error(err.stack));
    }

    render() {
        return (
            <React.Fragment>
                <Typography
                    component={"h3"}
                    variant={"h5"}
                    className={this.props.classes.text}
                >
                    Registration
                </Typography>
                <React.Fragment>
                    <Typography
                        component={"p"}
                        align={"center"}
                        className={this.props.classes.text}
                    >
                        Enter a username and select 6 pass objects, 3 flag objects, and 3 skipping objects
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
                            onChange={event => this.setState({ username: event.target.value })}
                            helperText="Please enter a username"
                            margin="normal"
                            variant="outlined"
                        />
                    </Typography>
                    <PassIcon
                        register={true}
                        passIcons={this.state.passIcons}
                        getToggle={this.getToggle}
                        toggleIcon={this.toggleIcon}
                        error={this.state.passwordError}
                    />
                    <Button
                        variant="contained"
                        className={this.props.classes.button}
                        onClick={this.register}
                    >
                        <Typography
                            variant="subtitle1"
                            color="primary"
                        >
                            Register
                        </Typography>
                    </Button>
                </React.Fragment>
            </React.Fragment>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
