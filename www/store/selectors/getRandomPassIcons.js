import state from "../state";

export function getRandomPassIcons () {
    return [...state.passIcons].sort(() => 0.5 - Math.random()).slice(0, 12);
}
