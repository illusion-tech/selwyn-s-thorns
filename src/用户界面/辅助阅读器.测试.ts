import { 垂直对齐方式, 是, 最大填充, 水平对齐方式 } from '../运行时/全局常量.ts';
import { 祛缩进 } from "../运行时/工具.ts";
import { 辅助阅读器类 } from "./辅助阅读器.ts";

/**
 * ```
 * ┌────────────────────┬───────────┐
 * │                    │           │
 * │        阅读        │           │
 * │        区域        │           │
 * │                    │           │
 * └────────────────────┴───────────┘
 * ```
 */
const 辅助阅读器1 = new 辅助阅读器类({
    文本内容: 祛缩进`
       《回到现实》
        ……奇怪，今天我似乎在马尔福庄园的洗漱间里晕了过于，还产生了项链被毁的幻象。
        这也许是一种预兆，我的第六感告诉我有不好的事即将发生。
        果然，在德拉科生日宴的后半段，一切都有点失控。
    `,
    背景图资源标识: "$53062945", // resId: $53062945
    容器宽度: 720,
    容器高度: 最大填充,
    容器水平对齐方式: 水平对齐方式.靠左,
});

/**
 * ```
 * ┌───────────┬────────────────────┐
 * │           │                    │
 * │           │        阅读        │
 * │           │        区域        │
 * │           │                    │
 * └───────────┴────────────────────┘
 * ```
 */
const 辅助阅读器2 = new 辅助阅读器类({
    文本内容: 祛缩进`
       《回到现实》
        ……奇怪，今天我似乎在马尔福庄园的洗漱间里晕了过于，还产生了项链被毁的幻象。
        这也许是一种预兆，我的第六感告诉我有不好的事即将发生。
        果然，在德拉科生日宴的后半段，一切都有点失控。
    `,
    背景图资源标识: "$53062945", // resId: $53062945
    背景图水平翻转: 是,
    容器宽度: 720, // 0.5625
    容器高度: 最大填充,
    容器水平对齐方式: 水平对齐方式.靠右,
});

/**
 * ```
 * ┌────────────────────────────────┐
 * │              阅读              │
 * │              区域              │
 * ├────────────────────────────────┤
 * │                                │
 * └────────────────────────────────┘
 * ```
 */
const 辅助阅读器3 = new 辅助阅读器类({
    文本内容: 祛缩进`
       《回到现实》
        ……奇怪，今天我似乎在马尔福庄园的洗漱间里晕了过于，还产生了项链被毁的幻象。
        这也许是一种预兆，我的第六感告诉我有不好的事即将发生。
        果然，在德拉科生日宴的后半段，一切都有点失控。
    `,
    背景图资源标识: "$53062945", // resId: $53062945
    容器宽度: 最大填充,
    容器高度: 400,
    容器垂直对齐方式: 垂直对齐方式.靠上,
});

/**
 * ```
 * ┌────────────────────────────────┐
 * │                                │
 * ├────────────────────────────────┤
 * │              阅读              │
 * │              区域              │
 * └────────────────────────────────┘
 * ```
 */
const 辅助阅读器4 = new 辅助阅读器类({
    文本内容: 祛缩进`
       《回到现实》
        ……奇怪，今天我似乎在马尔福庄园的洗漱间里晕了过于，还产生了项链被毁的幻象。
        这也许是一种预兆，我的第六感告诉我有不好的事即将发生。
        果然，在德拉科生日宴的后半段，一切都有点失控。
    `,
    背景图资源标识: "$53062945", // resId: $53062945
    容器宽度: 最大填充,
    容器高度: 400,
    容器垂直对齐方式: 垂直对齐方式.靠下,
});

/**
 * ```
 * ┌────────────────────────────────┐
 * │          ┌──────────┐          │
 * │          │   阅读   │          │
 * │          │   区域   │          │
 * │          └──────────┘          │
 * └────────────────────────────────┘
 * ```
 */
const 辅助阅读器5 = new 辅助阅读器类({
    文本内容: 祛缩进`
       《回到现实》
        ……奇怪，今天我似乎在马尔福庄园的洗漱间里晕了过于，还产生了项链被毁的幻象。
        这也许是一种预兆，我的第六感告诉我有不好的事即将发生。
        果然，在德拉科生日宴的后半段，一切都有点失控。
    `,
    背景图资源标识: "$53062945", // resId: $53062945
    容器宽度: 550,
    容器高度: 450,
    容器水平对齐方式: 水平对齐方式.居中,
    容器垂直对齐方式: 垂直对齐方式.居中,
});
