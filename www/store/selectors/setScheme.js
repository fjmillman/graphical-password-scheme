import React from "react";
import state from "../state";
import { getBaseUrl } from "../updaters/getBaseUrl";
import axios from "axios";

export async function setScheme() {
    const apiUrl = process.env.NODE_ENV === "production" ? `${getBaseUrl()}api/result` : "http://localhost:9999/api/result";

    await axios.get(apiUrl)
        .then(res => state.scheme = res.data % 2 === 0 ? 1 : 2)
        .catch(error => console.error(error.stack));
}
