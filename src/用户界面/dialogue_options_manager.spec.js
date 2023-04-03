import { 人物管理器类 } from "./character_manager.js";
import { 对话选项管理器类 } from "./dialogue_options_manager.js";

const 人物管理器 = new 人物管理器类();
const 对话选项管理器 = new 对话选项管理器类(人物管理器);

const 选项1 = 对话选项管理器
    .创建对话选项()
    .设置对话选项内容("让阿斯托利亚看项链")
    .添加对话选项条件({
        需满足: () => 人物管理器.黛瑞雅.谦逊 > 10,
        当不满足时提示: "谦虚太低",
    })
    .设置对话选项执行结果(() => {
        人物管理器.黛瑞雅.谦逊 += 3;
    });

const 选项2 = 对话选项管理器.创建对话选项({
    选项内容: "婉拒阿斯托利亚",
    执行结果: () => (人物管理器.黛瑞雅.傲慢 += 1),
});

对话选项管理器.创建对话选项面板({
    编号: 1,
    描述: "阿斯托利亚想要看看你的项链",
    可选项: [选项1, 选项2],
});

await 对话选项管理器.显示对话选项面板(
    { 编号: 0 },
    /** 选项1 执行 */ () => {},
    /** 选项2 执行 */ () => {},
);

const 选项编号 = 对话选项管理器.查询对话选项面板结果({ 编号: 0 });

console.log(选项编号);
