interface BaseObjectParams {
    /**
     * 对象名称。
     */
    name: string;
    /**
     * 对象层级索引。
     * @default 0
     */
    index?: number;
    /**
     * 对象所属图层。
     * @default 'window'
     */
    inlayer?: string;
    /**
     * 对象位置。
     */
    pos?: {
        /**
         * 水平方向位置。
         * @default 0
         */
        x?: number;
        /**
         * 垂直方向位置。
         * @default 0
         */
        y?: number;
    };
    /**
     * 对象锚点。
     */
    anchor?: {
        /**
         * 水平方向锚点位置百分比。
         * @default 0
         */
        x?: number;
        /**
         * 垂直方向锚点位置百分比。
         * @default 0
         */
        y: number;
    };
    /**
     * 对象是否可见。
     * @default true
     */
    visible?: boolean;
}
interface CreateImageParams extends BaseObjectParams {
    /**
     * 图片对象资源 ID。
     */
    resId: string;
    /**
     * 不透明度百分比。
     * @default 100
     */
    opacity?: number;
    /**
     * 缩放百分比。
     * @default 100
     */
    scale?: number;

    /**
     * 是否垂直上下翻转。
     * @default false
     */
    verticalFlip?: boolean;
    /**
     * 是否水平左右翻转。
     * @default false
     */
    horizontalFlip?: boolean;
}

interface CreateNoClippedLayerParams extends BaseObjectParams {
    /**
     * 是否裁剪图层。
     */
    clipMode: false;
}

interface CreateClippedLayerParams extends BaseObjectParams {
    /**
     * 是否裁剪图层。
     */
    clipMode: true;
    /**
     * 裁剪区域。
     */
    size: {
        width: number;
        height: number;
    };
}

type CreateLayerParams = CreateNoClippedLayerParams | CreateClippedLayerParams;

interface CreateOptionParams extends BaseObjectParams {
    /**
     * 正常态资源 ID。
     */
    nResId: string;
    /**
     * 点击态资源 ID。
     */
    sResId: string;
    /**
     * 选项文字内容。
     */
    content: string;
    /**
     * 点击音效。
     */
    clickAudio: {
        /**
         * 音效资源 ID。
         */
        resId: string;
        /**
         * 音量百分比。
         */
        vol: number;
    };
    onTouchBegan: () => void;
    onTouchEnded: () => void;
}

enum EffectTypes {
    /** 正常效果 */ normal = "normal",
    /** 渐入效果 */ fadein = "fadein",
    /** 渐出效果 */ fadeout = "fadeout",
    /** 由上移入 */ moveinTop = "moveinTop",
    /** 由左移入 */ moveinLeft = "moveinLeft",
    /** 由右移入 */ moveinRight = "moveinRight",
    /** 由下移入 */ moveinBottom = "moveinBottom",
}

interface BaseRemoveParams {
    /**
     * 对象名称。
     */
    name: string;
    /**
     * 可跳过。
     */
    canskip: boolean;
}

interface NormalRemoveParams extends BaseRemoveParams {
    /**
     * 消失效果。
     */
    effect: EffectTypes.normal;
}

interface FadeoutRemoveParams extends BaseRemoveParams {
    /**
     * 消失效果。
     */
    effect: EffectTypes.fadeout;
    /**
     * 效果时长。
     */
    duration: number;
}

type RemoveParams = NormalRemoveParams | FadeoutRemoveParams;

interface ArrayVariables {
    对话选项结果: number[];
}

interface AC {
    /** 数组变量 */ arr: ArrayVariables;
    /** 特效类型 */ EFFECT_TYPES: typeof EffectTypes;
    /** 创建图片 */ createImage(params: CreateImageParams): Promise<void>;
    /** 创建图层 */ createLayer(params: CreateLayerParams): Promise<void>;
    /** 创建选项 */ createOption(params: CreateOptionParams): Promise<void>;
    /** 移除对象 */ remove(params: RemoveParams): Promise<void>;
}

declare const ac: AC;

declare const 记号: {
    对话选项管理器: symbol;
    人物管理器: symbol;
};

declare const 容器: Map<symbol, 对话选项管理器类 | 人物管理器类>;
