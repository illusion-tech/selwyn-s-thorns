import { 选项记录器类 } from "../用户界面/选项记录器.ts";
import { 字符串, 已选择, 数值, 未定义 } from "../运行时/全局常量.ts";
import { 获取 } from '../运行时/工具.ts';
import { 错误 } from "../运行时/网络/错误.ts";
type 任意 = any;

export class 变量容器类 {
    #映射 = new Map<字符串, 数值 | 字符串>();
    #选项记录器: 选项记录器类;

    constructor(选项记录器: 选项记录器类) {
        this.#选项记录器 = 选项记录器;
    }

    创建数值变量(名称: 字符串, 初始值: 数值 = 0) {
        if (this.#映射.has(名称)) throw new 错误(`变量 ${名称} 已存在！`);

        const 路径数组 = 名称.split(".");
        const 变量名称 = 路径数组.pop();
        if (变量名称 === 未定义) throw new 错误(`变量 ${名称} 名称不合法！`);
        let 变量对象 = this.获取初始变量对象();
        for (const 路径 of 路径数组) {
            if (变量对象[路径] === 未定义) break;
            if (typeof 变量对象[路径] === "number") throw new 错误(`变量 ${名称} 路径会覆盖已有变量！`);
            变量对象 = 变量对象[路径];
        }

        for (const 变量路径名称 of this.#映射.keys()) {
            if (变量路径名称.startsWith(`${名称}.`)) {
                throw new 错误(`变量 ${名称} 会覆盖已有变量 ${变量路径名称} 的路径！`);
            }
        }

        this.#映射.set(名称, 初始值);
    }

    查询变量初始值(名称: 字符串) {
        const 初始值 = this.#映射.get(名称);
        if (初始值 === 未定义) throw new 错误(`变量 ${名称} 不存在！`);

        return 初始值;
    }

    查询变量值(名称: 字符串) {
        if (!this.#映射.has(名称)) throw new 错误(`变量 ${名称} 不存在！`);
        const 变量对象 = this.获取变量对象();
        return 获取(变量对象, 名称);
    }

    获取初始变量对象() {
        const 变量对象: 任意 = {};
        for (const [变量路径, 初始值] of this.#映射) {
            const 路径数组 = 变量路径.split(".");
            const 变量名称 = 路径数组.pop();
            if (变量名称 === 未定义) throw new 错误(`变量 ${变量路径} 不存在！`);
            const 变量容器 = 路径数组.reduce((容器, 名称) => {
                if (容器[名称] === 未定义) 容器[名称] = {};
                return 容器[名称];
            }, 变量对象);
            变量容器[变量名称] = 初始值;
        }
        return 变量对象;
    }

    /**
     * 根据选项记录器的选项状态执行对应的执行器。
     */
    获取变量对象() {
        const 执行器 = this.#选项记录器.获取执行器({ 选择状态: 已选择 });
        const 变量对象 = this.获取初始变量对象();
        return 执行器.reduce((变量对象, 执行器) => {
            执行器(变量对象);
            return 变量对象;
        }, 变量对象);
    }
}
