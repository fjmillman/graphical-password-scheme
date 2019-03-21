import state from "../state";
import { getPassIcons } from "./getPassIcons";
import { isRuleOne } from "./isRuleOne";
import { isRuleTwo } from "./isRuleTwo";
import { isRuleThree } from "./isRuleThree";

export function isValid() {
    const passIcons = getPassIcons();

    if (isRuleOne(passIcons)) {
        return state.selected.filter(icon => state.icons.pass.includes(icon)).length >= 1;
    } else if (isRuleTwo(passIcons)) {
        return state.selected.filter(icon => state.icons.skip.includes(icon)).length === 1 &&
            state.selected.filter(icon => state.icons.pass.includes(icon)).length === 5;
    } else if (isRuleThree(passIcons)) {
        return true;
    } else {
        console.error("Error: Rule logic failure");
    }
}
