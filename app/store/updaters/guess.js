import state from "../state";
import { nextPage } from "./nextPage";

export function guess() {
    state.schemeResult.guesses.push({
        selected: state.selected,
        valid: state.selected.filter(icon => state.setPassIcons.includes(icon)).length
    });

    state.selected = [];

    if (state.page === 8 || state.page === 15) {
        if (state.scheme === 1) {
            state.result.scheme1 = state.schemeResult;
            state.scheme = 2;
        } else if (state.scheme === 2) {
            state.result.scheme2 = state.schemeResult;
            state.scheme = 1;
        }

        state.schemeResult = {
            authentications: [],
            guesses: []
        };
    }

    nextPage();
}
