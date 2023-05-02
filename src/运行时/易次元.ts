import type { 填充模式, 字符串, 数值, 是否, 资源标识 } from "../全局常量.ts";
import { 假, 否, 垂直对齐方式, 无, 是, 最大填充, 水平对齐方式, 真 } from "../全局常量.ts";
import { 承诺 } from "./网络/承诺.ts";

interface 对象基础参数 {
    /** @默认值 0 */
    层级索引?: 数值;
    /** @默认值 'window' */
    所属图层?: 字符串;
    位置?: { 横: 数值; 纵: 数值 };
    锚点?: { 横: 数值; 纵: 数值 };
    /** @默认值 是 */
    是否可见?: 是否;
}

interface 创建无裁剪图层参数 extends 对象基础参数 {
    裁剪模式: 否;
    事件阻挡?: 是否;
}

interface 创建裁剪图层参数 extends 对象基础参数 {
    裁剪模式: 是;
    事件阻挡?: 是否;
    裁剪区域: {
        宽: 数值;
        高: 数值;
    };
}

type 创建图层参数 = 创建无裁剪图层参数 | 创建裁剪图层参数;

interface 创建图片基础参数 extends 对象基础参数 {
    资源标识: 资源标识;
    不透明度?: 数值;
    垂直翻转?: 是否;
    水平翻转?: 是否;
}

interface 创建静态缩放图片参数 extends 创建图片基础参数 {
    缩放百分比?: 数值;
}

interface 创建动态缩放图片参数 extends 创建图片基础参数 {
    /**
     * 自动缩放图像以适应容器。
     *
     * @remarks
     * - `最大填充` 意味着图像应该缩放以覆盖整个容器，
     *              即使这意味着失去一些图像的原始纵横比，
     *              将会对图片进行适当的剪裁。
     * - `最小填充` 意味着图像应该缩放以适合容器，同时保持其原始纵横比。
     *              如果容器的宽高比与图像的宽高比不匹配，
     *              这可能会导致图像周围出现空白区域。
     */
    动态缩放模式?: 填充模式;
}

type 创建图片参数 = 创建静态缩放图片参数 | 创建动态缩放图片参数;

enum 事件类型 {
    拖拽结束 = "onDragEnded",
    点触开始 = "onTouchBegan",
    点触结束 = "onTouchEnded",
    点触进入 = "onTouchEntered",
    点触离开 = "onTouchLeft",
    点触移动 = "onTouchMoved",
}

interface 播放音频基础参数 {
    资源标识: 资源标识;
    /** @默认值 100 */
    音量?: 数值;
    /** @默认值 否 */
    循环播放?: 是否;
}

enum 音频效果 {
    普通 = "normal",
    淡入 = "fadein",
}

enum 出现效果 {
    普通 = "normal",
    淡入 = "fadein",
}

enum 消失效果 {
    普通 = "normal",
    淡出 = "fadeout",
}

interface 播放普通效果音频参数 extends 播放音频基础参数 {
    效果?: 音频效果.普通;
}

interface 播放淡入效果音频参数 extends 播放音频基础参数 {
    效果: 音频效果.淡入;
    时长: 数值;
}

type 播放音频参数 = 播放普通效果音频参数 | 播放淡入效果音频参数;

interface 创建选项基础参数 extends 对象基础参数 {
    选项文字?: 字符串;
    文字样式?: 字符串;
    点击音效?:
        | {
              资源标识: 资源标识;
              音量?: 数值;
          }
        | typeof 无;
    缩放百分比?: 数值;
    当点触开始时?: () => void;
    当点触结束时?: () => void;
}

interface 创建选项单态参数 extends 创建选项基础参数 {
    资源标识: 资源标识;
}

interface 创建选项多态参数 extends 创建选项基础参数 {
    正常态资源标识: 资源标识;
    点击态资源标识: 资源标识;
}

type 创建选项参数 = 创建选项单态参数 | 创建选项多态参数;

interface 插入用户界面参数 {
    用户界面标识: 字符串;
}

interface 出现对象参数 {
    时长: 数值;
    可跳过?: 是否;
}

interface 消失对象参数 {
    时长: 数值;
    可跳过?: 是否;
}

enum 缓动渐变类型 {
    线性匀速 = "normal",
    加速 = "easeExponentialIn",
    减速 = "easeExponentialOut",
    加速减速 = "easeExponentialInOut",
}

interface 透明度变化参数 {
    /** @默认值 100 */
    不透明度?: 数值;
    /** @默认值 易次元.缓动渐变类型.线性匀速 */
    缓动渐变类型?: 缓动渐变类型;
    /** @默认值 0 */
    时长?: 数值;
    /** @默认值 否 */
    可跳过?: 是否;
}

interface 对象过渡参数 {
    通道图资源标识: 资源标识;
    /** @默认值 0 */
    时长?: 数值;
    /** @默认值 否 */
    可跳过?: 是否;
}

enum 文本方向 {
    水平 = "horizontal",
    垂直 = "vertical",
}

interface 创建文本参数 extends 对象基础参数 {
    /** @默认值 "" */
    文本内容?: 字符串;
    /** @默认值 易次元.文本方向.水平 */
    文本方向?: 文本方向;
    /** @默认值 易次元.水平对齐方式.靠左 */
    水平对齐方式?: 水平对齐方式;
    /** @默认值 易次元.垂直对齐方式.靠上 */
    垂直对齐方式?: 垂直对齐方式;
    文本框大小: 大小;
    /** @默认值 "" */
    文本样式?: 字符串;
}

enum 滤镜类型 {
    高斯模糊 = "gaussianblur",
    灰度变化 = "gray",
    明度变化 = "brightness",
}

interface 滤镜效果参数 {
    /**
     * @备注
     * 1. 对于高斯模糊，参数是半径值（必须是整数），单位是像素；
     * 2. 对于灰度变化，参数值为 0 时失效，为其他时正常；
     * 3. 对于明度变化，参数表示闭区间[-100,100]中的整数，默认为 0；
     */
    参数: 数值;
    /** @默认值 易次元.滤镜类型.高斯模糊 */
    类型?: 滤镜类型;
    /** @默认值 0 */
    时长?: 数值;
    /** @默认值 否 */
    可跳过?: 是否;
}

enum 预设对话框 {
    旁白框 = 1468221,
}

interface 创建文本样式参数 {
    字体?: 字符串;
    字号?: 数值;
    颜色?: 字符串;
    粗体?: 是否;
    斜体?: 是否;
    描边颜色?: 字符串;
    描边宽度?: 数值;
    阴影颜色?: 字符串;
    阴影偏移?: { 水平: 数值; 垂直: 数值 };
    对话语速?: 数值;
    可跳过?: 是否;
}

interface 停止音频参数 {
    /** @默认值 易次元.消失效果.普通 */
    效果?: 消失效果;
    /** @默认值 0 */
    时长?: 数值;
}

interface 创建滚动视图参数 extends 对象基础参数 {
    视图大小: 大小;
    内容大小: 大小;
    是否水平滚动: 是否;
    是否垂直滚动: 是否;
}

enum 切换效果 {
    淡出 = "crossfade",
    淡出后淡入 = "fade",
    右上到左下马赛克切换 = "fade-bl",
    左下到右上马赛克切换 = "fade-tr",
    从上到下百叶窗切换 = "fade-down",
    从下到上百叶窗切换 = "fade-up",
    白色闪光切换 = "fade-white",
    缩小跳跃向左退出后从右跳跃进入放大 = "jumpzoom",
    从下到上移入 = "movein-b",
    从左到右移入 = "movein-l",
    从右到左移入 = "movein-r",
    从上到下移入 = "movein-t",
    直接切换 = "normal",
    翻回上一页 = "page-backward",
    翻向下一页 = "page-forward",
    从左到右扫描 = "progress-horizontal",
    从上到下扫描 = "progress-vertical",
    中心矩形向外扫描 = "progress-inout",
    四周矩形向内扫描 = "progress-outin",
    逆时针扫描 = "radial-ccw",
    顺时针扫描 = "radial-cw",
    顺时针缩小退出后逆时针放大进入 = "rotozoom",
    缩小退出同时放大进入 = "shrinkgrow",
    从下到上推入 = "slidein-b",
    从左到右推入 = "slidein-l",
    从右到左推入 = "slidein-r",
    从上到下推入 = "slidein-t",
    三列分割交叉切换 = "splitcols",
    三行分割交叉切换 = "splitrows",
    随机马赛克切换 = "turnofftiles",
}

interface 切换剧情参数 {
    切换效果: 切换效果;
    时长: 数值;
}

export const 变量 = new (class 易次元变量 {
    日期时间 = ac.arr.日期时间 as [年: 数值, 月: 数值, 日: 数值, 时: 数值, 分: 数值];
    黛瑞雅性格属性 = ac.arr.黛瑞雅性格属性 as [谦逊: 数值, 傲慢: 数值, 荣誉: 数值];
    对话选项结果 = ac.arr.对话选项结果 as 数值[];
    日记记录 = ac.arr.日记记录 as 数值[];
    内存 = ac.arr.内存 as 数值[];
})();

export const 常量 = new (class 易次元常量 {
    预设对话框 = 预设对话框;
    音频效果 = 音频效果;
    出现效果 = 出现效果;
    消失效果 = 消失效果;
    切换效果 = 切换效果;
    事件类型 = 事件类型;
    滤镜类型 = 滤镜类型;
    文本方向 = 文本方向;
    水平对齐方式 = 水平对齐方式;
    垂直对齐方式 = 垂直对齐方式;
})();

export const 接口 = new (class 易次元接口 {
    async 创建图层(名称: 字符串, 参数: 创建图层参数) {
        // 将 创建图层参数 转换为 CreateLayerParams
        function 转换参数(参数: 创建图层参数): CreateLayerParams {
            const 基础对象参数: BaseObjectParams = {
                name: 名称,
            };
            if (参数.层级索引) 基础对象参数.index = 参数.层级索引;
            if (参数.所属图层) 基础对象参数.inlayer = 参数.所属图层;
            if (参数.位置) 基础对象参数.pos = { x: 参数.位置.横, y: 参数.位置.纵 };
            if (参数.锚点) 基础对象参数.anchor = { x: 参数.锚点.横, y: 参数.锚点.纵 };
            if (参数.是否可见) 基础对象参数.visible = 参数.是否可见 === 是;

            if (参数.裁剪模式 === 是) {
                return {
                    ...基础对象参数,
                    clipMode: 真,
                    size: { width: 参数.裁剪区域.宽, height: 参数.裁剪区域.高 },
                };
            } else {
                return {
                    ...基础对象参数,
                    clipMode: 假,
                };
            }
        }

        await ac.createLayer(转换参数(参数));

        if (参数.事件阻挡 === 是) {
            this.创建选项(`${名称}_事件阻挡`, {
                所属图层: 名称,
                资源标识: "$50834758", // resId: "$50834758"
                缩放百分比: 3000,
                位置:
                    参数.裁剪模式 === 是
                        ? { 横: 参数.裁剪区域.宽 / 2, 纵: 参数.裁剪区域.高 / 2 }
                        : { 横: 640, 纵: 320 },
                锚点: { 横: 50, 纵: 50 },
                点击音效: 无,
            });
        }
    }
    async 创建图片(名称: 字符串, 参数: 创建图片参数) {
        // 将 创建图片参数 转换为 CreateImageParams
        function 转换参数(参数: 创建图片参数): CreateImageParams {
            const 图片参数: CreateImageBaseParams = {
                name: 名称,
                resId: 参数.资源标识,
            };
            if (参数.层级索引) 图片参数.index = 参数.层级索引;
            if (参数.所属图层) 图片参数.inlayer = 参数.所属图层;
            if (参数.位置) 图片参数.pos = { x: 参数.位置.横, y: 参数.位置.纵 };
            if (参数.锚点) 图片参数.anchor = { x: 参数.锚点.横, y: 参数.锚点.纵 };
            if (参数.是否可见) 图片参数.visible = 参数.是否可见 === 是;
            if (参数.不透明度) 图片参数.opacity = 参数.不透明度;
            if (参数.垂直翻转) 图片参数.verticalFlip = 参数.垂直翻转 === 是;
            if (参数.水平翻转) 图片参数.horizontalFlip = 参数.水平翻转 === 是;

            if ("缩放百分比" in 参数) {
                return {
                    ...图片参数,
                    scale: 参数.缩放百分比,
                };
            } else if ("动态缩放模式" in 参数) {
                return {
                    ...图片参数,
                    dynaScale: 参数.动态缩放模式 === 最大填充 ? "cover" : "contain",
                };
            }

            return 图片参数;
        }

        return ac.createImage(转换参数(参数));
    }
    async 创建选项(名称: 字符串, 参数: 创建选项参数) {
        // 将 创建选项参数 转换为 CreateOptionParams
        function 转换参数(参数: 创建选项参数): CreateOptionParams {
            const 基础对象参数: BaseObjectParams = {
                name: 名称,
            };
            if (参数.层级索引) 基础对象参数.index = 参数.层级索引;
            if (参数.所属图层) 基础对象参数.inlayer = 参数.所属图层;
            if (参数.位置) 基础对象参数.pos = { x: 参数.位置.横, y: 参数.位置.纵 };
            if (参数.锚点) 基础对象参数.anchor = { x: 参数.锚点.横, y: 参数.锚点.纵 };
            if (参数.是否可见) 基础对象参数.visible = 参数.是否可见 === 是;

            // rome-ignore format: 关闭格式化
            const 选项参数: CreateOptionParams = "资源标识" in 参数 
                ? { ...基础对象参数, nResId: 参数.资源标识, sResId: 参数.资源标识 }
                : { ...基础对象参数, nResId: 参数.正常态资源标识, sResId: 参数.点击态资源标识 };

            if (参数.点击音效 !== 无) {
                if (参数.点击音效) {
                    选项参数.clickAudio = { resId: 参数.点击音效.资源标识 };
                    if (参数.点击音效.音量) 选项参数.clickAudio.vol = 参数.点击音效.音量;
                } else {
                    选项参数.clickAudio = { resId: "$51624", vol: 100 };
                }
            }

            if (参数.选项文字) 选项参数.content = 参数.选项文字;
            if (参数.文字样式) 选项参数.style = 参数.文字样式;
            if (参数.当点触开始时) 选项参数.onTouchBegan = 参数.当点触开始时;
            if (参数.当点触结束时) 选项参数.onTouchEnded = 参数.当点触结束时;
            if (参数.缩放百分比) 选项参数.scale = 参数.缩放百分比;

            return 选项参数;
        }

        return ac.createOption(转换参数(参数));
    }
    async 创建文本(名称: 字符串, 参数: 创建文本参数) {
        // 将 创建文本参数 转换为 CreateTextParams
        function 转换参数(参数: 创建文本参数): CreateTextParams {
            const 基础对象参数: BaseObjectParams = { name: 名称 };
            if (参数.层级索引) 基础对象参数.index = 参数.层级索引;
            if (参数.所属图层) 基础对象参数.inlayer = 参数.所属图层;
            if (参数.位置) 基础对象参数.pos = { x: 参数.位置.横, y: 参数.位置.纵 };
            if (参数.锚点) 基础对象参数.anchor = { x: 参数.锚点.横, y: 参数.锚点.纵 };
            if (参数.是否可见) 基础对象参数.visible = 参数.是否可见 === 是;

            const 文本参数: CreateTextParams = 基础对象参数;
            if (参数.文本内容) 文本参数.content = 参数.文本内容;
            if (参数.文本方向) 文本参数.direction = 参数.文本方向;
            if (参数.水平对齐方式) 文本参数.halign = 参数.水平对齐方式;
            if (参数.垂直对齐方式) 文本参数.valign = 参数.垂直对齐方式;
            if (参数.文本样式) 文本参数.style = 参数.文本样式;

            文本参数.size = { width: 参数.文本框大小.宽, height: 参数.文本框大小.高 };

            return 文本参数;
        }
        return ac.createText(转换参数(参数));
    }
    async 创建文本样式(名称: 字符串, 参数: 创建文本样式参数) {
        const 创建文本样式参数: CreateStyleParams = {
            name: 名称,
        };
        if (参数.字体) 创建文本样式参数.font = 参数.字体;
        if (参数.字号) 创建文本样式参数.fontSize = 参数.字号;
        if (参数.颜色) 创建文本样式参数.color = 参数.颜色;
        if (参数.粗体) 创建文本样式参数.bold = 参数.粗体 === 是;
        if (参数.斜体) 创建文本样式参数.italic = 参数.斜体 === 是;
        if (参数.描边颜色) 创建文本样式参数.strokeColor = 参数.描边颜色;
        if (参数.描边宽度) 创建文本样式参数.strokeWidth = 参数.描边宽度;
        if (参数.阴影颜色) 创建文本样式参数.shadowColor = 参数.阴影颜色;
        if (参数.阴影偏移) 创建文本样式参数.shadowPos = { x: 参数.阴影偏移.水平, y: 参数.阴影偏移.垂直 };
        if (参数.对话语速) 创建文本样式参数.speed = 参数.对话语速;
        if (参数.可跳过) 创建文本样式参数.canskip = 参数.可跳过 === 是;

        return ac.createStyle(创建文本样式参数);
    }
    async 创建滚动视图(名称: 字符串, 参数: 创建滚动视图参数) {
        // 将 创建滚动视图参数 转换为 CreateScrollViewParams
        function 转换参数(参数: 创建滚动视图参数): CreateScrollViewParams {
            const 基础对象参数: BaseObjectParams = { name: 名称 };
            if (参数.层级索引) 基础对象参数.index = 参数.层级索引;
            if (参数.所属图层) 基础对象参数.inlayer = 参数.所属图层;
            if (参数.位置) 基础对象参数.pos = { x: 参数.位置.横, y: 参数.位置.纵 };
            if (参数.锚点) 基础对象参数.anchor = { x: 参数.锚点.横, y: 参数.锚点.纵 };
            if (参数.是否可见) 基础对象参数.visible = 参数.是否可见 === 是;

            return {
                ...基础对象参数,
                size: { width: 参数.视图大小.宽, height: 参数.视图大小.高 },
                innerSize: { width: 参数.内容大小.宽, height: 参数.内容大小.高 },
                horizontalScroll: 参数.是否水平滚动 === 是,
                verticalScroll: 参数.是否垂直滚动 === 是,
            };
        }

        return ac.createScrollView(转换参数(参数));
    }
    async 插入用户界面(名称: 字符串, 参数: 插入用户界面参数) {
        return ac.callUI({
            name: 名称,
            uiId: 参数.用户界面标识,
        });
    }
    async 关闭当前用户界面() {
        return ac.removeCurrentUI();
    }
    async 添加事件侦听器(对象: 字符串, 事件类型: 事件类型, 回调: () => void) {
        return ac.addEventListener({
            target: 对象,
            type: 事件类型 as unknown as EventTypes,
            listener: 回调,
        });
    }
    async 播放音频(名称: 字符串, 参数: 播放音频参数) {
        // 将 播放音频参数 转换为 PlayAudioParams
        function 转换参数(参数: 播放音频参数): PlayAudioParams {
            const 音频参数: PlayAudioParams = {
                name: 名称,
                resId: 参数.资源标识,
            };
            if (参数.音量) 音频参数.vol = 参数.音量;
            if (参数.循环播放) 音频参数.loop = 参数.循环播放 === 是;
            if (参数.效果 === 音频效果.淡入) {
                return {
                    ...音频参数,
                    effect: 音频效果.淡入,
                    duration: 参数.时长,
                };
            }

            return 音频参数;
        }

        return ac.playAudio(转换参数(参数));
    }
    async 停止音频(名称: 字符串, 参数: 停止音频参数 = {}) {
        return ac.stopAudio({
            name: 名称,
            effect: 参数.效果,
            duration: 参数.时长,
        });
    }
    async 暂停音频(名称: 字符串) {
        return ac.pauseAudio({ name: 名称 });
    }
    async 恢复音频(名称: 字符串) {
        return ac.resumeAudio({ name: 名称 });
    }
    async 显示对象(名称: 字符串, 参数: 出现对象参数 = { 时长: 0 }) {
        return ac.show(
            参数.时长 > 0
                ? { name: 名称, effect: 出现效果.淡入, duration: 参数.时长, canskip: 参数.可跳过 === 是 }
                : { name: 名称 },
        );
    }
    async 隐藏对象(名称: 字符串, 参数: 消失对象参数 = { 时长: 0 }) {
        return ac.hide(
            参数.时长 > 0
                ? { name: 名称, effect: 消失效果.淡出, duration: 参数.时长, canskip: 参数.可跳过 === 是 }
                : { name: 名称 },
        );
    }
    async 移除对象(名称: 字符串, 参数: 消失对象参数 = { 时长: 0 }) {
        return ac.remove(
            参数.时长 > 0
                ? { name: 名称, effect: 消失效果.淡出, duration: 参数.时长, canskip: 参数.可跳过 === 是 }
                : { name: 名称 },
        );
    }
    async 对象过渡(对象名称一: 字符串, 对象名称二: 字符串, 参数: 对象过渡参数) {
        const 对象过渡参数: TransParams = {
            rule: 参数.通道图资源标识,
            group: [对象名称一, 对象名称二],
        };

        if (参数.时长 !== undefined) 对象过渡参数.duration = 参数.时长;
        if (参数.可跳过 !== undefined) 对象过渡参数.canskip = 参数.可跳过 === 是;

        return ac.trans(对象过渡参数);
    }
    async 滤镜效果(名称: 字符串, 参数: 滤镜效果参数) {
        // 将 滤镜效果参数 转换为 FilterParams
        function 转换参数(参数: 滤镜效果参数): FilterParams {
            const 对象参数: FilterParams = {
                name: 名称,
                args: 参数.参数,
            };

            if (参数.类型 !== undefined) 对象参数.type = 参数.类型 as unknown as FilterTypes;
            if (参数.时长 !== undefined) 对象参数.duration = 参数.时长;
            if (参数.可跳过 !== undefined) 对象参数.canskip = 参数.可跳过 === 是;
            return 对象参数;
        }

        return ac.filter(转换参数(参数));
    }
    async 透明度变化(名称: 字符串, 参数: 透明度变化参数) {
        // 将 透明度变化参数 转换为 FadeParams
        function 转换参数(参数: 透明度变化参数): FadeToParams {
            const 对象参数: FadeToParams = {
                name: 名称,
            };

            if (参数.不透明度 !== undefined) 对象参数.opacity = 参数.不透明度;
            if (参数.时长 !== undefined) 对象参数.duration = 参数.时长;
            if (参数.缓动渐变类型 !== undefined) 对象参数.ease = 参数.缓动渐变类型 as unknown as EaseTypes;
            if (参数.可跳过 !== undefined) 对象参数.canskip = 参数.可跳过 === 是;
            return 对象参数;
        }

        return ac.fadeTo(转换参数(参数));
    }
    async 打开对话框(预设: 预设对话框, 内容: 字符串) {
        return ac.sysDialogOn({ id: 预设, content: 内容 });
    }
    async 关闭对话框() {
        return ac.sysDialogOff();
    }
    async 延迟(毫秒: 数值) {
        return ac.delay({ time: 毫秒 });
    }
    async 获取画布大小() {
        const [宽, 高] = await 承诺.全部([ac.getCanvasWidth(), ac.getCanvasHeight()]);
        return { 宽, 高 } as 大小;
    }
    async 跳转剧情(剧情标识: 数值, 参数?: 切换剧情参数) {
        if (参数) return ac.jump({ plotId: 剧情标识, transition: 参数.切换效果, duration: 参数.时长 });
        return ac.jump({ plotId: 剧情标识 });
    }
    async 插播剧情(剧情标识: 数值, 参数?: 切换剧情参数) {
        if (参数) return ac.display({ plotId: 剧情标识, transition: 参数.切换效果, duration: 参数.时长 });
        return ac.display({ plotId: 剧情标识 });
    }
})();
