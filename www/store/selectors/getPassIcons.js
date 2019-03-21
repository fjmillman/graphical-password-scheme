import React from "react";
import state from "../state";

export function getPassIcons() {
    if (state.isLogin) {
        return state.currentPassIcons;
    }

    return state.passIcons;
}
