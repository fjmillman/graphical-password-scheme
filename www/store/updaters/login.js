import state from "../state";
import { nextPage } from "./nextPage";
import { isValid } from "../selectors/isValid";
import { getRandomStage } from "../selectors/getRandomStage";
import { endTimer } from "./endTimer";
import { startTimer } from "./startTimer";

export function login() {
    if (state.selected.length !== 6) {
        return;
    }

    let login = {
        selected: state.selected,
        valid: false,
        time: endTimer()
    };

    if (isValid()) {
        state.valid++;
        login.valid = true;
    }

    state.authentication.logins.push(login);

    startTimer();

    if (state.stage < 2) {
        state.stage++;
        state.selected = [];
        state.currentPassIcons = getRandomStage();
        return;
    }

    state.schemeResult.authentications.push(state.authentication);
    state.iterations++;
    state.stage = 0;
    state.valid = 0;
    state.pastStages = [];
    state.selected = [];
    state.icons = {
        pass: [],
        skip: [],
        flag: [],
    };
    state.authentication = {
        registration: {},
        logins: []
    };
    state.isRegistration = !state.isRegistration;
    state.isLogin = !state.isLogin;

    if (state.iterations === 1) {
        state.iterations = 0;
        nextPage();
        return;
    }
}
