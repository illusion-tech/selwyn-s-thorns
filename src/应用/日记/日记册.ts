import type { 坐标, 数值, 未知, 资源标识 } from "../../运行时/全局常量.ts";
import type { 日记页类 } from "./日记页.ts";

export interface 成册配置 {
    贴纸配置: {
        资源标识: 资源标识;
        位置: 坐标;
        对应装订页: 日记页类;
    }[];
}

export class 日记册类 {
    constructor(成册配置: 成册配置, ...页集: 日记页类[]) {
        
    }
}
