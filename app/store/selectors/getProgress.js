import state from "../state";

export function getProgress() {
    return (state.page / 17) * 100;
}
