import state from "../state";

export function toggleIcon(passIcon) {
    if ((state.page === 3 || state.page === 10) && state.isRegistration) {
        if (state.icons.pass.includes(passIcon)) {
            state.icons.pass.splice(state.icons.pass.indexOf(passIcon), 1);
        } else if (state.icons.flag.includes(passIcon)) {
            state.icons.flag.splice(state.icons.flag.indexOf(passIcon), 1);
        } else if (state.icons.skip.includes(passIcon)) {
            state.icons.skip.splice(state.icons.skip.indexOf(passIcon), 1);
        } else if (state.icons.pass.length < 6) {
            state.icons.pass.push(passIcon);
        } else if (state.icons.flag.length < 3) {
            state.icons.flag.push(passIcon);
        } else if (state.icons.skip.length < 3) {
            state.icons.skip.push(passIcon);
        }
    } else {
        if (state.selected.includes(passIcon)) {
            state.selected.splice(state.selected.indexOf(passIcon), 1);
        } else if (state.selected.length < 6) {
            state.selected.push(passIcon);
        }
    }
}
