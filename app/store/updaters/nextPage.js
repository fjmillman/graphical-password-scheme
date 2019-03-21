import state from "../state";
import { setScheme } from "../selectors/setScheme";
import { startTimer } from "./startTimer";

export function nextPage() {
    if (state.page === 0) setScheme();
    state.page++;
    if (state.page === 3 || state.page === 10) startTimer();
}
