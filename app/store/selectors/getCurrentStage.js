import state from "../state";

export function getCurrentStage() {
    return state.stage + 1;
}
