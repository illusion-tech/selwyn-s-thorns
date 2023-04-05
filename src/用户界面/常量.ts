export const 解锁 = Symbol("解锁");
export const 未解锁 = Symbol("未解锁");
export type 解锁状态 = typeof 解锁 | typeof 未解锁;
