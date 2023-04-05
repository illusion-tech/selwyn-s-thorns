interface 对象基础参数 {
    名称: 字符串;
    /**
     * @默认值 0
     */
    层级索引?: 数值;
    /**
     * @默认值 'window'
     */
    所属图层?: 字符串;
    位置?: { 横: 数值; 纵: 数值 };
    锚点?: { 横: 数值; 纵: 数值 };
    /**
     * @默认值 是
     */
    是否可见?: 是否;
}

interface 创建无裁剪图层参数 extends 对象基础参数 {
    裁剪模式: 否;
}

interface 创建裁剪图层参数 extends 对象基础参数 {
    裁剪模式: 是;
    裁剪区域: {
        宽: 数值;
        高: 数值;
    };
}

type 创建图层参数 = 创建无裁剪图层参数 | 创建裁剪图层参数;

interface 创建图片基础参数 extends 对象基础参数 {
    资源标识: 字符串;
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
    名称: 字符串;
    资源标识: 字符串;
    /**
     * @默认值 100
     */
    音量?: 数值;
    /**
     * @默认值 否
     */
    循环播放?: 是否;
}

enum 音频效果 {
    普通 = "normal",
    淡入 = "fadein",
}

enum 显示效果 {
    普通 = "normal",
    淡入 = "fadein",
}

interface 播放普通效果音频参数 extends 播放音频基础参数 {
    效果?: 音频效果.普通;
}

interface 播放淡入效果音频参数 extends 播放音频基础参数 {
    效果: 音频效果.淡入;
    时间: 数值;
}

type 播放音频参数 = 播放普通效果音频参数 | 播放淡入效果音频参数;

interface 显示对象普通效果参数 {
    名称: 字符串;
    效果?: 显示效果.普通;
}

interface 显示对象淡入效果参数 {
    名称: 字符串;
    效果: 显示效果.淡入;
    时间: 数值;
    可跳过?: 是否;
}

type 显示对象参数 = 显示对象普通效果参数 | 显示对象淡入效果参数;

export const 易次元 = {
    音频效果,
    显示效果,
    事件类型,
    async 创建图层(参数: 创建图层参数) {
        // 将 创建图层参数 转换为 CreateLayerParams
        function 转换参数(参数: 创建图层参数): CreateLayerParams {
            const 基础对象参数: BaseObjectParams = {
                name: 参数.名称,
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
        return ac.createLayer(转换参数(参数));
    },
    async 创建图片(参数: 创建图片参数) {
        // 将 创建图片参数 转换为 CreateImageParams
        function 转换参数(参数: 创建图片参数): CreateImageParams {
            const 图片参数: CreateImageBaseParams = {
                name: 参数.名称,
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
    },
    async 添加事件侦听器(对象: 字符串, 事件类型: 事件类型, 回调: () => void): Promise<void> {
        return ac.addEventListener({
            target: 对象,
            type: 事件类型 as unknown as EventTypes,
            listener: 回调,
        });
    },
    async 播放音频(参数: 播放音频参数) {
        // 将 播放音频参数 转换为 PlayAudioParams
        function 转换参数(参数: 播放音频参数): PlayAudioParams {
            const 音频参数: PlayAudioParams = {
                name: 参数.名称,
                resId: 参数.资源标识,
            };
            if (参数.音量) 音频参数.vol = 参数.音量;
            if (参数.循环播放) 音频参数.loop = 参数.循环播放 === 是;
            if (参数.效果 === 音频效果.淡入) {
                return {
                    ...音频参数,
                    effect: 音频效果.淡入,
                    duration: 参数.时间,
                };
            }

            return 音频参数;
        }

        return ac.playAudio(转换参数(参数));
    },
    async 显示对象(参数: 显示对象参数) {
        // 将 显示对象参数 转换为 ShowParams
        function 转换参数(参数: 显示对象参数): ShowParams {
            const 对象参数: ShowParams = {
                name: 参数.名称,
            };
            if (参数.效果 === 显示效果.普通) return 对象参数;
            if (参数.效果 === 显示效果.淡入) {
                return {
                    ...对象参数,
                    effect: 显示效果.淡入,
                    duration: 参数.时间,
                    canskip: 参数.可跳过 === 是,
                };
            }

            return 对象参数;
        }

        return ac.show(转换参数(参数));
    },
};
