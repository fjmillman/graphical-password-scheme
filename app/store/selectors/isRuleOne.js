import state from "../state";

export function isRuleOne(passIcons) {
    return state.icons.flag.some(flag => passIcons.includes(flag)) &&
        !state.icons.skip.some(skip => passIcons.includes(skip)) &&
        state.icons.pass.filter(pass => passIcons.includes(pass)).length >= 1;
}
