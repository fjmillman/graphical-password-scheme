export function constructApiUrl(api) {
    return process.env.NODE_ENV === "production" ?
        `https://${window.location.hostname}/${api}`:
        `http://localhost:9999/${api}`;
}
