import "./运行时/全局常量.ts";

import { 变量容器类 } from "./应用/变量容器.ts";
import { Card } from "./用户界面/card.ts";
import { CardActions } from "./用户界面/card_actions.ts";
import { 地图管理器类 } from "./用户界面/地图管理器.ts";
import { 对话面板管理器类 } from "./用户界面/对话面板管理器.ts";
import { 简单教程类 } from "./用户界面/教程管理器.ts";
import { 日记管理器类 } from "./用户界面/日记管理器.ts";
import { 设置当前日期 as 内部设置当前日期, 时间管理器类, type 日期字符串 } from "./用户界面/时间管理器.ts";
import { 选项记录器类 } from "./用户界面/选项记录器.ts";
import { 项链菜单类 } from "./用户界面/项链菜单.ts";
import { 祛缩进 } from "./运行时/工具.ts";

const 选项记录器 = new 选项记录器类();
const 变量容器 = new 变量容器类(选项记录器);
const 对话面板管理器 = new 对话面板管理器类(选项记录器, 变量容器);

const 时间管理器 = new 时间管理器类();
const 地图管理器 = new 地图管理器类(时间管理器);

const 日记管理器 = new 日记管理器类(时间管理器, 选项记录器);
const 项链菜单 = new 项链菜单类(日记管理器, 选项记录器, 变量容器, 时间管理器);

const 设置当前日期 = (日期: 日期字符串) => 内部设置当前日期(日期, 时间管理器);
const 创建项链 = 项链菜单.创建项链.bind(项链菜单);
const 收起项链 = 项链菜单.收起项链.bind(项链菜单);

console.log({
    CardActions,
    Card,
    选项记录器,
    项链菜单,
    收起项链,
    时间管理器,
    设置当前日期,
    日记管理器,
    祛缩进,
    简单教程类,
    对话面板管理器,
    地图管理器,
    创建项链,
    变量容器,
});
