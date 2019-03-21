import axios from "axios";
import state from "../state";
import { getBaseUrl } from "./getBaseUrl";
import { nextPage } from "./nextPage";

export async function submit() {
    if (!state.result.age || !state.result.gender) {
        state.formError = true;
        return;
    }

    const apiUrl = process.env.NODE_ENV === "production" ? `${getBaseUrl()}api/result` : "http://localhost:9999/api/result";

    await axios.post(apiUrl, state.result || {})
        .then(() => console.log(state.result))
        .catch(error => console.error(error.stack));

    nextPage();
}
