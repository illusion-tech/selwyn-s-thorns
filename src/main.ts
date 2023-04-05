import "./全局常量.js";
import { Card } from "./用户界面/card.js";
import { CardActions } from "./用户界面/card_actions.js";
import { 人物管理器类 } from "./用户界面/人物管理器.js";
import { 地图管理器类 } from "./用户界面/地图管理器.js";
import { 对话选项管理器类 } from "./用户界面/对话选项管理器.js";
import { 时间管理器类 } from "./用户界面/时间管理器.js";
import { 项链菜单类 } from "./用户界面/项链菜单.js";

const 人物管理器 = new 人物管理器类();
const 对话选项管理器 = new 对话选项管理器类(人物管理器);
const 时间管理器 = new 时间管理器类();
const 地图管理器 = new 地图管理器类(时间管理器);
const 项链菜单 = new 项链菜单类();

console.log({
    人物管理器,
    对话选项管理器,
    时间管理器,
    地图管理器,
    项链菜单,
    Card,
    CardActions,
});
