const 最大填充 = Symbol("最大填充");
const 最小填充 = Symbol("最小填充");
const 解锁 = Symbol("解锁");
const 未解锁 = Symbol("未解锁");
const 是 = Symbol("是");
const 否 = Symbol("否");
const 真 = true;
const 假 = false;
declare type 是 = typeof 是;
declare type 否 = typeof 否;
declare type 是否 = typeof 是 | typeof 否;
declare type 真 = typeof 真;
declare type 假 = typeof 假;
declare type 真假 = boolean;
declare type 数值 = number;
declare type 字符串 = string;
declare type 资源标识 = `$${数值}`;
declare type 填充模式 = typeof 最大填充 | typeof 最小填充;
declare type 解锁状态 = typeof 解锁 | typeof 未解锁;

type MyGlobalThis = typeof globalThis & {
    最大填充: typeof 最大填充;
    最小填充: typeof 最小填充;
    解锁: typeof 解锁;
    未解锁: typeof 未解锁;
    是: typeof 是;
    否: typeof 否;
    真: typeof 真;
    假: typeof 假;
};

(globalThis as MyGlobalThis).最大填充 = 最大填充;
(globalThis as MyGlobalThis).最小填充 = 最小填充;
(globalThis as MyGlobalThis).解锁 = 解锁;
(globalThis as MyGlobalThis).未解锁 = 未解锁;
(globalThis as MyGlobalThis).是 = 是;
(globalThis as MyGlobalThis).否 = 否;
(globalThis as MyGlobalThis).真 = 真;
(globalThis as MyGlobalThis).假 = 假;
