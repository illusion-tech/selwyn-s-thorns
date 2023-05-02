const 被污损 = Symbol("被污损");
const 最大填充 = Symbol("最大填充");
const 最小填充 = Symbol("最小填充");
const 解锁 = Symbol("解锁");
const 未解锁 = Symbol("未解锁");
const 无 = Symbol("无");
const 是 = Symbol("是");
const 否 = Symbol("否");
const 真 = true;
const 假 = false;
const 空白 = "";
const 未定义 = undefined;

type 未定义 = typeof 未定义;
type 空白 = typeof 空白;
type 是 = typeof 是;
type 否 = typeof 否;
type 是否 = typeof 是 | typeof 否;
type 真 = typeof 真;
type 假 = typeof 假;
type 真假 = boolean;
type 数值 = number;
type 字符串 = string;
type 资源标识 = `$${数值}`;
type 最大填充 = typeof 最大填充;
type 最小填充 = typeof 最小填充;
type 填充模式 = typeof 最大填充 | typeof 最小填充;
type 解锁状态 = typeof 解锁 | typeof 未解锁;
type 被污损 = typeof 被污损;
type 无 = void;
type 未知 = unknown;
type 永不 = never;
type 项链菜单配置 = {
    记忆回溯: 解锁状态;
    日记本: 解锁状态;
    钥匙: 解锁状态;
};

enum 水平对齐方式 {
    靠左 = "left",
    居中 = "middle",
    靠右 = "right",
}

enum 垂直对齐方式 {
    靠上 = "top",
    居中 = "center",
    靠下 = "bottom",
}

type MyGlobalThis = typeof globalThis & {
    空白: 空白;
    被污损: 被污损;
    最大填充: typeof 最大填充;
    最小填充: typeof 最小填充;
    解锁: typeof 解锁;
    未解锁: typeof 未解锁;
    无: typeof 无;
    是: 是;
    否: 否;
    真: 真;
    假: 假;
    未定义: 未定义;
    项链菜单配置: 项链菜单配置;
    水平对齐方式: 水平对齐方式;
    垂直对齐方式: 垂直对齐方式;
    是否弹框错误信息: 是否;
};

const myGlobalThis = globalThis as MyGlobalThis;

myGlobalThis.被污损 = myGlobalThis.被污损 ?? 被污损;
myGlobalThis.最大填充 = myGlobalThis.最大填充 ?? 最大填充;
myGlobalThis.最小填充 = myGlobalThis.最小填充 ?? 最小填充;
myGlobalThis.解锁 = myGlobalThis.解锁 ?? 解锁;
myGlobalThis.未解锁 = myGlobalThis.未解锁 ?? 未解锁;
myGlobalThis.无 = myGlobalThis.无 ?? 无;
myGlobalThis.是 = myGlobalThis.是 ?? 是;
myGlobalThis.否 = myGlobalThis.否 ?? 否;
myGlobalThis.真 = myGlobalThis.真 ?? 真;
myGlobalThis.假 = myGlobalThis.假 ?? 假;
myGlobalThis.未定义 = myGlobalThis.未定义 ?? 未定义;
myGlobalThis.空白 = myGlobalThis.空白 ?? 空白;
myGlobalThis.项链菜单配置 = myGlobalThis.项链菜单配置 ?? { 记忆回溯: 未解锁, 日记本: 未解锁, 钥匙: 未解锁 };
myGlobalThis.水平对齐方式 = myGlobalThis.水平对齐方式 ?? 水平对齐方式;
myGlobalThis.垂直对齐方式 = myGlobalThis.垂直对齐方式 ?? 垂直对齐方式;
myGlobalThis.是否弹框错误信息 = 是;
