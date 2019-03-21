import state from "../state";
import { getRandomStage } from "../selectors/getRandomStage";
import { endTimer } from "./endTimer";
import { startTimer } from "./startTimer";

export function register() {
    if (state.icons.pass.length < 6 || state.icons.skip.length < 3 || state.icons.skip.length < 3) return;

    state.icons.time = endTimer();
    state.authentication.registration = state.icons;
    state.currentPassIcons = getRandomStage();
    state.isRegistration = !state.isRegistration;
    state.isLogin = !state.isLogin;
    startTimer();
}
