import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

const styles = () => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        overflow: "hidden",
    },
    registrationGrid: {
        width: 250,
        height: 550,
    },
    loginGrid: {
        width: 250,
        height: 350,
    },
    icon: {
        fontSize: 48,
        color: "rgb(0, 0, 0)"
    },
    activeIcon: {
        background: "rgba(0, 0, 0, 0.25)"
    },
    inactiveIcon: {
        background: "rgba(0, 0, 0, 0)"
    },
    passIcon: {
        background: "rgba(0, 0, 255, 0.25)"
    },
    flagIcon: {
        background: "rgba(255, 0, 0, 0.25)"
    },
    skipIcon: {
        background: "rgba(0, 255, 0, 0.25)"
    },
});

class PassIcon extends React.Component {
    constructor(props) {
        super(props);
        this.toggleIcon = this.toggleIcon.bind(this);
        this.getToggle = this.getToggle.bind(this);
    }

    getToggle(icon) {
        return this.props.getToggle(icon)
    }

    toggleIcon(icon) {
        this.props.toggleIcon(icon)
    }

    render() {
        const passIconGrid = props.passIcons.map(passIcon => (
            <GridListTile key={passIcon}>
                <IconButton
                    onClick={() => this.toggleIcon(this.props.passIcon)}
                    className={!this.getToggle(this.props.passIcon)
                        ? this.props.classes.inactiveIcon
                        : this.getToggle(this.props.passIcon) === "pass"
                            ? this.props.classes.passIcon
                            : this.getToggle(this.props.passIcon) === "flag"
                                ? this.props.classes.flagIcon
                                : this.getToggle(this.props.passIcon) === "skip"
                                    ? this.props.classes.skipIcon
                                    : this.props.classes.activeIcon
                    }
                >
                    <Icon className={this.props.classes.icon}>{this.props.passIcon}</Icon>
                </IconButton>
            </GridListTile>
        ));

        return (
            <div className={props.classes.root}>
                <GridList
                    cellHeight={75}
                    className={props.register ? props.classes.registrationGrid : props.classes.loginGrid}
                    cols={3}
                >
                    {passIconGrid}
                </GridList>
            </div>
        );
    };
}

PassIcon.propTypes = {
    classes: PropTypes.object.isRequired,
    passIcons: PropTypes.object.isRequired,
};

export default withStyles(styles)(PassIcon);
