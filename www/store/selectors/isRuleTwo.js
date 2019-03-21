import state from "../state";

export function isRuleTwo(passIcons) {
    return state.icons.skip.some(skip => passIcons.includes(skip)) &&
        state.icons.pass.filter(pass => passIcons.includes(pass)).length >= 5;
}
