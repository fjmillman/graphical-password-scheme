import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Router from "next/router";

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
    },
    navBar: {
        marginLeft: theme.spacing.unit * 3,
    }
});

const LoginPage = props => (
    <React.Fragment>
        <div className={props.classes.layout}>
            <Toolbar>
                <Typography
                    component={"h2"}
                    variant={"h5"}
                    color={"inherit"}
                    align={"center"}
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
                    Login
                </Typography>
            </main>
        </div>
    </React.Fragment>
);

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);
