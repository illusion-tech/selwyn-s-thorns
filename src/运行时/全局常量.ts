export const 最大填充 = Symbol("最大填充");
export const 最小填充 = Symbol("最小填充");
export const 解锁 = Symbol("解锁");
export const 未解锁 = Symbol("未解锁");
export const 无 = Symbol("无");
export const 是 = Symbol("是");
export const 否 = Symbol("否");
export const 已选择 = Symbol("已选择");
export const 未选择 = Symbol("未选择");
export const 真 = true;
export const 假 = false;
export const 空白 = "";
export const 未定义 = undefined;

export type 未定义 = typeof 未定义;
export type 空白 = typeof 空白;
export type 是 = typeof 是;
export type 否 = typeof 否;
export type 是否 = typeof 是 | typeof 否;
export type 真 = typeof 真;
export type 假 = typeof 假;
export type 真假 = boolean;
export type 数值 = number;
export type 字符串 = string;
export type 资源标识 = `$${数值}`;
export type 最大填充 = typeof 最大填充;
export type 最小填充 = typeof 最小填充;
export type 填充模式 = typeof 最大填充 | typeof 最小填充;
export type 选择状态 = typeof 已选择 | typeof 未选择;
export type 无 = void;
export type 未知 = unknown;
export type 永不 = never;
export type 任意 = any;
export type 坐标元组 = [x: number, y: number];
export type 坐标对象 = { x: number; y: number };
export type 坐标 = { 横: number; 纵: number };
export type 大小 = { 宽: number; 高: number };

export enum 水平对齐方式 {
    靠左 = "left",
    居中 = "middle",
    靠右 = "right",
}

export enum 垂直对齐方式 {
    靠上 = "top",
    居中 = "center",
    靠下 = "bottom",
}

export type MyGlobalThis = typeof globalThis & {
    空白: 空白;
    最大填充: typeof 最大填充;
    最小填充: typeof 最小填充;
    解锁: typeof 解锁;
    未解锁: typeof 未解锁;
    已选择: typeof 已选择;
    未选择: typeof 未选择;
    无: typeof 无;
    是: 是;
    否: 否;
    真: 真;
    假: 假;
    未定义: 未定义;
    水平对齐方式: 水平对齐方式;
    垂直对齐方式: 垂直对齐方式;
    cc: {
        game: {
            canvas: HTMLCanvasElement;
        };
    };
};

export const myGlobalThis = globalThis as MyGlobalThis;

myGlobalThis.最大填充 = myGlobalThis.最大填充 ?? 最大填充;
myGlobalThis.最小填充 = myGlobalThis.最小填充 ?? 最小填充;
myGlobalThis.解锁 = myGlobalThis.解锁 ?? 解锁;
myGlobalThis.未解锁 = myGlobalThis.未解锁 ?? 未解锁;
myGlobalThis.已选择 = myGlobalThis.已选择 ?? 已选择;
myGlobalThis.未选择 = myGlobalThis.未选择 ?? 未选择;
myGlobalThis.无 = myGlobalThis.无 ?? 无;
myGlobalThis.是 = myGlobalThis.是 ?? 是;
myGlobalThis.否 = myGlobalThis.否 ?? 否;
myGlobalThis.真 = myGlobalThis.真 ?? 真;
myGlobalThis.假 = myGlobalThis.假 ?? 假;
myGlobalThis.未定义 = myGlobalThis.未定义 ?? 未定义;
myGlobalThis.空白 = myGlobalThis.空白 ?? 空白;
myGlobalThis.水平对齐方式 = myGlobalThis.水平对齐方式 ?? 水平对齐方式;
myGlobalThis.垂直对齐方式 = myGlobalThis.垂直对齐方式 ?? 垂直对齐方式;
