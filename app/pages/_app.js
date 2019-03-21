import React from "react";
import App, { Container } from "next/app";
import Header from "../components/Header";
import CssBaseline from "@material-ui/core/CssBaseline";

export default class EvaluationApp extends App {
    static async getInitialProps({Component, req}) {
        let props = {};

        if (Component.getInitialProps) {
            props = await Component.getInitialProps(req);
        }

        return { props };
    }

    render() {
        const {Component, props} = this.props;
        return (
            <Container>
                <Header/>
                <CssBaseline/>
                <Component {...props} />
            </Container>
        );
    }
};
