import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

const styles = theme => ({
    layout: {
        width: "auto",
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    main: {
        margin: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 5,
    },
    text: {
        margin: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 5,
    },
    navBar: {
        marginLeft: theme.spacing.unit * 3,
    },
    button: {
        margin: theme.spacing.unit * 3,
    },
});

const IndexPage = props => (
    <React.Fragment>
        <div className={props.classes.layout}>
            <Toolbar>
                <Typography
                    component={"h2"}
                    variant={"h5"}
                    noWrap
                >
                    Graphical Password Scheme User Interface
                </Typography>
                <div className={props.classes.navBar}>
                    <IconButton
                        color="inherit"
                        aria-label="Login"
                        onClick={() => Router.push("/")}
                    >
                        <Icon>home</Icon>
                    </IconButton>
                    <IconButton
                        color="inherit"
                        aria-label="Login"
                        onClick={() => Router.push("/register")}
                    >
                        <Icon>person_add</Icon>
                    </IconButton>
                    <IconButton
                        color="inherit"
                        aria-label="Login"
                        onClick={() => Router.push("/login")}
                    >
                        <Icon>exit_to_app</Icon>
                    </IconButton>
                </div>
            </Toolbar>
            <main className={props.classes.main}>
                <Typography
                    component={"p"}
                    align={"center"}
                    className={props.classes.text}
                >
                    This is the UI for testing the graphical password scheme in its natural habitat
                </Typography>
                <Button
                    variant="contained"
                    className={props.classes.button}
                    onClick={() => Router.push("/register")}
                >
                    <Typography
                        variant="subtitle1"
                        color="primary"
                    >
                        Register
                    </Typography>
                </Button>
                <Button
                    variant="contained"
                    className={props.classes.button}
                    onClick={() => Router.push("/login")}
                >
                    <Typography
                        variant="subtitle1"
                        color="primary"
                    >
                        Login
                    </Typography>
                </Button>
            </main>
        </div>
    </React.Fragment>
);

IndexPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IndexPage);
