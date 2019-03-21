import state from "../state";
import { isRuleOne } from "./isRuleOne";
import { isRuleTwo } from "./isRuleTwo";
import { isRuleThree } from "./isRuleThree";
import { getRandomPassIcons } from "./getRandomPassIcons";

export function getRandomStage() {
    const remainingStages = [...Array(3).keys()]
        .map(x => ++x)
        .filter(stage => !state.pastStages.includes(stage));
    const randomStage = remainingStages[Math.floor(Math.random() * remainingStages.length)];
    let randomPassIcons = getRandomPassIcons();

    while (randomStage === 1 && !isRuleOne(randomPassIcons) ||
        randomStage === 2 && !isRuleTwo(randomPassIcons) ||
        randomStage === 3 && !isRuleThree(randomPassIcons)
        ) {
        randomPassIcons = getRandomPassIcons();
    }

    state.pastStages.push(randomStage);

    return randomPassIcons;
}
