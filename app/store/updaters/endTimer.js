import state from "../state";

export function endTimer() {
    return Math.round(((new Date() - state.startTime) + 0.00001) * 100) / 100000;
}
