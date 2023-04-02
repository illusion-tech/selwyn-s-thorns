import { 人物管理器类 } from "./用户界面/character_manager.js";
import { 对话选项管理器类 } from "./用户界面/dialogue_options_manager.js";
import { Card } from "./用户界面/card.js";
import { CardActions } from "./用户界面/card_actions.js";

const 人物管理器 = new 人物管理器类();
const 对话选项管理器 = new 对话选项管理器类(人物管理器);

console.log({
    人物管理器,
    对话选项管理器,
    Card,
    CardActions,
});
