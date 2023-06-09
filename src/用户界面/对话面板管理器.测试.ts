import { 对话面板管理器类 } from "./对话面板管理器.ts";
import { 变量容器类, 选项记录器类 } from "./选项记录器.ts";

const 选项记录器 = new 选项记录器类();
const 变量容器 = new 变量容器类(选项记录器);
const 对话面板管理器 = new 对话面板管理器类(选项记录器, 变量容器);

对话面板管理器.配置面板蔷薇徽章动画((前值, 现值) => {
    const 之前是灰蔷薇 = Math.abs(前值.黛瑞雅.谦逊 - 前值.黛瑞雅.傲慢) <= 10;
    const 之前是红蔷薇 = 前值.黛瑞雅.傲慢 - 前值.黛瑞雅.谦逊 > 10;
    const 之前是白蔷薇 = 前值.黛瑞雅.谦逊 - 前值.黛瑞雅.傲慢 > 10;

    const 发火光 = 现值.黛瑞雅.傲慢 - 前值.黛瑞雅.傲慢 > 0;
    const 发金光 = 现值.黛瑞雅.谦逊 - 前值.黛瑞雅.谦逊 > 0;
    const 发蓝光 = !(发火光 || 发金光);

    const 之后是灰蔷薇 = Math.abs(现值.黛瑞雅.谦逊 - 现值.黛瑞雅.傲慢) <= 10;
    const 之后是红蔷薇 = 现值.黛瑞雅.傲慢 - 现值.黛瑞雅.谦逊 > 10;
    const 之后是白蔷薇 = 现值.黛瑞雅.谦逊 - 现值.黛瑞雅.傲慢 > 10;

    let 动画序列 = [{ resId: "$0", time: 0 }];

    // 灰蔷薇->蓝光:
    if (之前是灰蔷薇 && 发蓝光) {
        动画序列 = [
            { resId: "$54010987", time: 14 },
            { resId: "$54010469", time: 14 },
            { resId: "$54010470", time: 14 },
            { resId: "$54010471", time: 14 },
            { resId: "$54010472", time: 14 },
            { resId: "$54010473", time: 14 },
            { resId: "$54010474", time: 14 },
            { resId: "$54010475", time: 14 },
            { resId: "$54010476", time: 14 },
            { resId: "$54010477", time: 14 },
            { resId: "$54010478", time: 14 },
            { resId: "$54010479", time: 14 },
            { resId: "$54010480", time: 14 },
            { resId: "$54010481", time: 14 },
            { resId: "$54010482", time: 14 },
            { resId: "$54010483", time: 14 },
            { resId: "$54010484", time: 14 },
            { resId: "$54010485", time: 14 },
            { resId: "$54010486", time: 14 },
            { resId: "$54010487", time: 14 },
            { resId: "$54010488", time: 14 },
            { resId: "$54010489", time: 14 },
            { resId: "$54010490", time: 14 },
            { resId: "$54010491", time: 14 },
            { resId: "$54010492", time: 14 },
            { resId: "$54010493", time: 14 },
            { resId: "$54010494", time: 14 },
            { resId: "$54010495", time: 14 },
            { resId: "$54010496", time: 14 },
            { resId: "$54010497", time: 14 },
            { resId: "$54010498", time: 14 },
            { resId: "$54010499", time: 14 },
            { resId: "$54010500", time: 14 },
            { resId: "$54010501", time: 14 },
            { resId: "$54010502", time: 14 },
            { resId: "$54010503", time: 14 },
            { resId: "$54010504", time: 14 },
            { resId: "$54010505", time: 14 },
            { resId: "$54010506", time: 14 },
            { resId: "$54010507", time: 14 },
            { resId: "$54010508", time: 14 },
            { resId: "$54010509", time: 14 },
            { resId: "$54010510", time: 14 },
            { resId: "$54010511", time: 14 },
            { resId: "$54010512", time: 14 },
            { resId: "$54010513", time: 14 },
            { resId: "$54010514", time: 14 },
            { resId: "$54010515", time: 14 },
            { resId: "$54010516", time: 14 },
            { resId: "$54010987", time: 14 },
        ];
    }
    // 灰蔷薇->火光: 傲慢++
    if (之前是灰蔷薇 && 发火光) {
        动画序列 = [
            { resId: "$51533657", time: 18 },
            { resId: "$51541582", time: 18 },
            { resId: "$51541583", time: 18 },
            { resId: "$51541584", time: 18 },
            { resId: "$51541585", time: 18 },
            { resId: "$51541586", time: 18 },
            { resId: "$51541587", time: 18 },
            { resId: "$51541588", time: 18 },
            { resId: "$51541589", time: 18 },
            { resId: "$51541590", time: 18 },
            { resId: "$51541591", time: 18 },
            { resId: "$51541592", time: 18 },
            { resId: "$51541593", time: 18 },
            { resId: "$51541594", time: 18 },
            { resId: "$51541595", time: 18 },
            { resId: "$51541596", time: 18 },
            { resId: "$51541597", time: 18 },
            { resId: "$51541598", time: 18 },
            { resId: "$51541599", time: 18 },
            { resId: "$51541600", time: 18 },
            { resId: "$51541601", time: 18 },
            { resId: "$51541602", time: 18 },
            { resId: "$51541603", time: 18 },
            { resId: "$51541604", time: 18 },
            { resId: "$51541605", time: 18 },
            { resId: "$51541606", time: 18 },
            { resId: "$51541607", time: 18 },
            { resId: "$51541608", time: 18 },
            { resId: "$51541609", time: 18 },
            { resId: "$51541610", time: 18 },
            { resId: "$51541611", time: 18 },
            { resId: "$51541612", time: 18 },
            { resId: "$51541613", time: 18 },
            { resId: "$51541614", time: 18 },
            { resId: "$51541615", time: 18 },
            { resId: "$51533657", time: 18 },
        ];
    }
    // 灰蔷薇->金光: 谦逊++
    if (之前是灰蔷薇 && 发金光) {
        动画序列 = [
            { resId: "$51533657", time: 18 },
            { resId: "$51533428", time: 18 },
            { resId: "$51533429", time: 18 },
            { resId: "$51533430", time: 18 },
            { resId: "$51533431", time: 18 },
            { resId: "$51533433", time: 18 },
            { resId: "$51533434", time: 18 },
            { resId: "$51533435", time: 18 },
            { resId: "$51533436", time: 18 },
            { resId: "$51533437", time: 18 },
            { resId: "$51533438", time: 18 },
            { resId: "$51533439", time: 18 },
            { resId: "$51533440", time: 18 },
            { resId: "$51533441", time: 18 },
            { resId: "$51533442", time: 18 },
            { resId: "$51533443", time: 18 },
            { resId: "$51533444", time: 18 },
            { resId: "$51533445", time: 18 },
            { resId: "$51533446", time: 18 },
            { resId: "$51533447", time: 18 },
            { resId: "$51533448", time: 18 },
            { resId: "$51533449", time: 18 },
            { resId: "$51533450", time: 18 },
            { resId: "$51533451", time: 18 },
            { resId: "$51533452", time: 18 },
            { resId: "$51533453", time: 18 },
            { resId: "$51533454", time: 18 },
            { resId: "$51533455", time: 18 },
            { resId: "$51533657", time: 18 },
        ];
    }

    // 红蔷薇->蓝光: 傲慢 > 谦逊 + 10;
    if (之前是红蔷薇 && 发蓝光) {
        动画序列 = [];
    }
    // 红蔷薇->火光: 傲慢 > 谦逊 + 10; 傲慢++
    if (之前是红蔷薇 && 发火光) {
        动画序列 = [];
    }
    // 红蔷薇->金光: 傲慢 > 谦逊 + 10; 谦逊++
    if (之前是红蔷薇 && 发金光) {
        动画序列 = [];
    }

    // 白蔷薇->蓝光: 谦逊 > 傲慢 + 10;
    if (之前是白蔷薇 && 发蓝光) {
        动画序列 = [];
    }
    // 白蔷薇->火光: 谦逊 > 傲慢 + 10; 傲慢++
    if (之前是白蔷薇 && 发火光) {
        动画序列 = [];
    }
    // 白蔷薇->金光: 谦逊 > 傲慢 + 10; 谦逊++
    if (之前是白蔷薇 && 发金光) {
        动画序列 = [];
    }

    // 灰蔷薇->红蔷薇
    if (之前是灰蔷薇 && 之后是红蔷薇) {
        动画序列.concat([]);
    }
    // 灰蔷薇->白蔷薇
    if (之前是灰蔷薇 && 之后是白蔷薇) {
        动画序列.concat([]);
    }
    // 红蔷薇->灰蔷薇
    if (之前是红蔷薇 && 之后是灰蔷薇) {
        动画序列.concat([]);
    }
    // 白蔷薇->灰蔷薇
    if (之前是白蔷薇 && 之后是灰蔷薇) {
        动画序列.concat([]);
    }
    // 红蔷薇->白蔷薇
    if (之前是红蔷薇 && 之后是白蔷薇) {
        动画序列.concat([]);
    }
    // 白蔷薇->红蔷薇
    if (之前是白蔷薇 && 之后是红蔷薇) {
        动画序列.concat([]);
    }

    return 动画序列;
});

const 选项0_1 = 对话面板管理器.创建对话选项({
    选项内容: "让阿斯托利亚看项链",
    执行结果: ({ 黛瑞雅 }) => (黛瑞雅.谦逊 += 3),
});
const 选项0_2 = 对话面板管理器.创建对话选项({
    选项内容: "婉拒阿斯托利亚",
    条件集: [
        { 
            需满足: () => 对话面板管理器.查询对话选项面板结果({编号: 0}) === 1,
            当不满足时: () => {},
        },
        
    ],
    执行结果: ({ 黛瑞雅 }) => (黛瑞雅.傲慢 += 1),
});
对话面板管理器.创建对话选项面板({
    编号: 0,
    日期: "1991-06-05",
    描述: "阿斯托利亚想要看看你的项链",
    可选项: [选项0_1, 选项0_2],
});

const 选项1_1 = 对话面板管理器.创建对话选项({
    选项内容: "（找借口）“是潘西……”",
    执行结果: ({ 黛瑞雅 }) => ((黛瑞雅.傲慢 += 3), (黛瑞雅.荣誉 -= 1)),
});
const 选项1_2 = 对话面板管理器.创建对话选项({
    选项内容: "（解释）“突发状况……”",
    执行结果: ({ 黛瑞雅 }) => (黛瑞雅.谦逊 += 1),
});
const 选项1_3 = 对话面板管理器.创建对话选项({
    选项内容: "（撒谎）“我生病了……”",
    执行结果: ({ 黛瑞雅 }) => ((黛瑞雅.傲慢 += 5), (黛瑞雅.荣誉 -= 2)),
});
const 选项1_4 = 对话面板管理器.创建对话选项({
    选项内容: "（坦诚自己背叛了友谊）",
    执行结果: ({ 黛瑞雅 }) => ((黛瑞雅.谦逊 += 5), (黛瑞雅.荣誉 += 2)),
});
对话面板管理器.创建对话选项面板({
    编号: 1,
    日期: "1991-06-05",
    描述: "回答德拉科的问话",
    可选项: [选项1_1, 选项1_2, 选项1_3, 选项1_4],
});

const 选项2_1 = 对话面板管理器.创建对话选项({
    选项内容: "（跟亚纶寒暄）",
    执行结果: () => {},
});
const 选项2_2 = 对话面板管理器.创建对话选项({
    选项内容: "（跟母亲寒暄）",
    执行结果: ({ 黛瑞雅 }) => (黛瑞雅.荣誉 += 1),
});
const 选项2_3 = 对话面板管理器.创建对话选项({
    选项内容: "（拥抱亚纶）",
    执行结果: () => {},
});
对话面板管理器.创建对话选项面板({
    编号: 2,
    日期: "1991-06-23",
    描述: "在火车站，亚纶走了过来——",
    可选项: [选项2_1, 选项2_2, 选项2_3],
});
const 选项3_1 = 对话面板管理器.创建对话选项({
    选项内容: "（伸手去接金加隆）",
    执行结果: ({ 黛瑞雅 }) => ((黛瑞雅.谦逊 += 2), (黛瑞雅.荣誉 -= 1)),
});
const 选项3_2 = 对话面板管理器.创建对话选项({
    选项内容: "（不去接金加隆）",
    执行结果: ({ 黛瑞雅 }) => (黛瑞雅.傲慢 += 1),
});
对话面板管理器.创建对话选项面板({
    编号: 3,
    日期: "1991-06-23",
    描述: "亚纶送了我一对金钱鸟，并演示它们的‘用法’——",
    可选项: [选项3_1, 选项3_2],
});
