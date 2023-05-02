import { 未解锁, 解锁 } from '../全局常量.ts';
import { 日记管理器类 } from "./日记管理器.ts";
import { 时间管理器类 } from "./时间管理器.ts";
import { 项链菜单类 } from "./项链菜单.ts";

const 时间管理器 = new 时间管理器类();
const 日记管理器 = new 日记管理器类(时间管理器);
const 项链菜单 = new 项链菜单类(日记管理器);

项链菜单.创建项链({
    记忆回溯: 解锁,
    日记本: 未解锁,
    钥匙: 未解锁,
});
