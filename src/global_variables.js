const that = globalThis;
if (that.studio_s === undefined) that.studio_s = {};
if (that.studio_s.container === undefined) that.studio_s.container = new Map();
if (that.studio_s.TOKEN === undefined)
    that.studio_s.TOKEN = {
        NECKLACE_MENU: Symbol("necklace_menu"),
        对话选项管理器: Symbol("对话选项管理器"),
    };

const ss = that.studio_s;
/**
 * @type {Map<symbol, 对话选项管理器类>}
 */
const container = ss.container;
/**
 * @type {{ 对话选项管理器: symbol}}
 */
const TOKEN = ss.TOKEN;
const 记号 = TOKEN;
const 容器 = container;
