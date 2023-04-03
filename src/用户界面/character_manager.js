export class 人物管理器类 {
    黛瑞雅 = {
        get 谦逊() {
            return ac.arr["黛瑞雅性格属性"][0];
        },
        set 谦逊(数值) {
            ac.arr["黛瑞雅性格属性"][0] = 数值;
        },
        get 荣誉() {
            return ac.arr["黛瑞雅性格属性"][2];
        },
        set 荣誉(数值) {
            ac.arr["黛瑞雅性格属性"][2] = 数值;
        },
        get 傲慢() {
            return ac.arr["黛瑞雅性格属性"][1];
        },
        set 傲慢(数值) {
            ac.arr["黛瑞雅性格属性"][1] = 数值;
        },
        get 是傲慢性格() {
            return this.傲慢 >= this.谦逊;
        },
        get 是强傲慢性格() {
            return this.傲慢 - this.谦逊 >= 10;
        },
        get 是谦逊性格() {
            return this.谦逊 > this.傲慢;
        },
        get 是强谦逊性格() {
            return this.谦逊 - this.傲慢 >= 10;
        },
        get 没有强性格偏向() {
            return Math.abs(this.傲慢 - this.谦逊) < 10;
        },
        获取属性探针() {
            const that = this;
            return {
                谦逊: this.谦逊,
                傲慢: this.傲慢,
                荣誉: this.荣誉,
                /**
                 * 检测探针属性值的变化。
                 * @typedef {object} 属性探针检测结果
                 * @property {string} 属性 - 变化的属性
                 * @property {number} 变化 - 变化的数值
                 * @property {number} 旧值 - 变化前的数值
                 * @property {number} 新值 - 变化后的数值
                 * @returns {属性探针检测结果[]}
                 */
                检测() {
                    const 属性探测结果 = [];
                    if (Math.abs(that.谦逊 - this.谦逊))
                        属性探测结果.push({
                            属性: "谦逊",
                            变化: that.谦逊 - this.谦逊,
                            旧值: this.谦逊,
                            新值: that.谦逊,
                        });
                    if (Math.abs(that.傲慢 - this.傲慢))
                        属性探测结果.push({
                            属性: "傲慢",
                            变化: that.傲慢 - this.傲慢,
                            旧值: this.傲慢,
                            新值: that.傲慢,
                        });
                    if (Math.abs(that.荣誉 - this.荣誉))
                        属性探测结果.push({
                            属性: "荣誉",
                            变化: that.荣誉 - this.荣誉,
                            旧值: this.荣誉,
                            新值: that.荣誉,
                        });
                    if (属性探测结果.length === 0) throw alert("属性探针没有检测到属性值的变化");

                    console.log({ 属性探测结果 });
                    return 属性探测结果;
                },
            };
        },
    };
}
