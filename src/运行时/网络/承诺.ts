import type { 无, 未知, 永不 } from "../全局常量.ts";
import { 未定义 } from "../全局常量.ts";

type 等待<类型> = Awaited<类型>;
type 类承诺<类型> = PromiseLike<类型>;
type 可迭代<类型> = Iterable<类型>;

// all<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>;

export class 承诺<类型> extends Promise<类型> {
    // static 全部<类型 extends []>(一组值: 类型): 承诺<{ [键 in keyof 类型]: 等待<类型[键]> }>;
    // static 全部<类型>(一组值: 可迭代<类型 | 类承诺<类型>>): 承诺<等待<类型>[]>;
    /**
     * 创建一个承诺，该承诺在所有提供的承诺都履行或拒绝后履行或拒绝。
     * @param 一组值 - 一个可迭代的对象，如数组，其中包含要等待的值或承诺。
     * @returns 一个新的承诺
     */
    static 全部<类型>(一组值: 可迭代<类型 | 类承诺<类型>>): 承诺<等待<类型>[]> {
        return new 承诺((履行, 拒绝) => Promise.all(一组值).then(履行, 拒绝));
    }

    /**
     * 创建一个承诺，该承诺在任何提供的承诺履行或拒绝时履行或拒绝。
     * @param 一组值 - 一个可迭代的对象，如数组，其中包含要等待的值或承诺。
     * @returns 一个新的承诺
     */
    static 竞争<类型>(一组值: 可迭代<类型 | 类承诺<类型>>): 承诺<等待<类型>> {
        return new 承诺((履行, 拒绝) => Promise.race(一组值).then(履行, 拒绝));
    }

    /**
     * 使用提供的原因创建一个新的被拒绝的承诺。
     * @param 原因 - 可选的原因，为什么承诺被拒绝。
     * @returns 一个新的被拒绝的承诺
     */
    static 拒绝<类型 = 永不>(原因?: 未知): 承诺<类型> {
        return new 承诺((_, 拒绝) => 拒绝(原因));
    }

    /**
     * 创建一个新的履行的承诺。
     * @returns 一个履行的承诺
     */
    static 履行(): 承诺<无>;
    /**
     * 使用提供的值创建一个新的履行的承诺。
     * @param 值 - 一个值，用于履行承诺。
     */
    static 履行<类型>(值: 类型): 承诺<等待<类型>>;
    /**
     * 使用提供的承诺创建一个新的履行的承诺。
     * @param 值 - 一个承诺
     */
    static 履行<类型>(值: 类型 | 类承诺<类型>): 承诺<等待<类型>>;
    static 履行<类型>(值?: 类型 | 类承诺<类型>): 承诺<等待<类型>> | 承诺<无> {
        if (值 === 未定义) return new 承诺<无>((履行) => 履行());
        return new 承诺<等待<类型>>(async (履行) => 履行(await 值));
    }

    /**
     * 创建一个新的承诺。
     * @param 执行器 - 一个用于初始化承诺的回调。此回调传递两个参数：
     * 一个是用于使用值或另一个承诺的结果来履行承诺的履行回调，
     * 另一个是用于使用提供的原因或错误来拒绝承诺的拒绝回调。
     */
    constructor(执行器: (履行: (值: 类型 | 类承诺<类型>) => void, 拒绝: (原因?: 未知) => void) => void) {
        super(执行器);
    }

    /**
     * 为承诺添加履行和拒绝回调。
     * @param 成功回调 - 一个用于处理履行值的函数。
     * @param 失败回调 - 一个用于处理拒绝原因的函数。
     */
    然后<结果类型1 = 类型, 结果类型2 = 永不>(
        成功回调?: ((值: 类型) => 结果类型1 | 类承诺<结果类型1>) | null,
        失败回调?: ((原因: 未知) => 结果类型2 | 类承诺<结果类型2>) | null,
    ): 承诺<结果类型1 | 结果类型2> {
        return new 承诺((履行, 拒绝) => this.then(成功回调, 失败回调).then(履行, 拒绝));
    }

    /**
     * 为承诺添加拒绝回调。
     * @param 失败回调 - 一个用于处理拒绝原因的函数。
     */
    捕获<结果类型 = 永不>(失败回调?: ((原因: 未知) => 结果类型 | 类承诺<结果类型>) | null): 承诺<类型 | 结果类型> {
        return new 承诺((履行, 拒绝) => this.then(履行, 失败回调).catch(拒绝));
    }

    /**
     * 附加一个回调，当承诺被了结（履行或拒绝）时被调用。履行的值不能从回调中修改。
     * @param 最终回调 - 当承诺被了结（被履行或被拒绝）时要执行的回调。
     */
    最终(最终回调?: (() => void) | null): 承诺<类型> {
        return new 承诺((履行, 拒绝) => this.then(履行, 拒绝).finally(最终回调));
    }
}
