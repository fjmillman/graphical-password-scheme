import url from "url";

export function getBaseUrl() {
    return url.format({
        protocol: "https",
        host: window.location.hostname,
        pathname: "/"
    });
}
