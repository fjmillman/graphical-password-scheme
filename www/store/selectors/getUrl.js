import state from "../state";

export function getUrl(observation) {
    if (state.scheme === 1) {
        switch (observation) {
            case 1:
                return "https://www.youtu.be/P3lXKxOkxbg";
            case 2:
                return "https://www.youtu.be/P3lXKxOkxbg";
            case 3:
                return "https://www.youtu.be/P3lXKxOkxbg";
        }
    } else if (state.scheme === 2) {
        switch (observation) {
            case 1:
                return "https://www.youtu.be/P3lXKxOkxbg";
            case 2:
                return "https://www.youtu.be/P3lXKxOkxbg";
            case 3:
                return "https://www.youtu.be/P3lXKxOkxbg";
        }
    }
}
