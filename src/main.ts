import { Card } from "./用户界面/card.js";
import { CardActions } from "./用户界面/card_actions.js";
import { 人物管理器类 } from "./用户界面/character_manager.js";
import { 对话选项管理器类 } from "./用户界面/dialogue_options_manager.js";
import { 地图管理器类 } from "./用户界面/map.js";
import { 时间管理器类 } from "./用户界面/time_manager.js";

const 人物管理器 = new 人物管理器类();
const 对话选项管理器 = new 对话选项管理器类(人物管理器);
const 时间管理器 = new 时间管理器类();
const 地图管理器 = new 地图管理器类(时间管理器);

console.log({
    人物管理器,
    对话选项管理器,
    时间管理器,
    地图管理器,
    Card,
    CardActions,
});
