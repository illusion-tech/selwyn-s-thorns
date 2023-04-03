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
    content?: string;
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
    onTouchBegan?: () => void;
    onTouchEnded?: () => void;
}

declare enum EffectTypes {
    /** 正常效果 */ normal = "normal",
    /** 渐入效果 */ fadein = "fadein",
    /** 渐出效果 */ fadeout = "fadeout",
    /** 由上移入 */ moveinTop = "movein-t",
    /** 由左移入 */ moveinLeft = "movein-l",
    /** 由右移入 */ moveinRight = "movein-r",
    /** 由下移入 */ moveinBottom = "movein-b",
}

declare enum SceneTransitionTypes {
    crossfade = "crossfade",
    fade = "fade",
    fadeBl = "fade-bl",
    fadeDown = "fade-down",
    fadeTr = "fade-tr",
    fadeUp = "fade-up",
    fadeWhite = "fade-white",
    jumpzoom = "jumpzoom",
    moveinB = "movein-b",
    moveinL = "movein-l",
    moveinR = "movein-r",
    moveinT = "movein-t",
    normal = "normal",
    pageBackward = "page-backward",
    pageForward = "page-forward",
    progressHorizontal = "progress-horizontal",
    progressInout = "progress-inout",
    progressOutin = "progress-outin",
    progressVertical = "progress-vertical",
    radialCcw = "radial-ccw",
    radialCw = "radial-cw",
    rotozoom = "rotozoom",
    shrinkgrow = "shrinkgrow",
    slideinB = "slidein-b",
    slideinL = "slidein-l",
    slideinR = "slidein-r",
    slideinT = "slidein-t",
    splitcols = "splitcols",
    splitrows = "splitrows",
    turnofftiles = "turnofftiles",
}

interface DisplayParams {
    /**
     * 剧情唯一标识。
     */
    plotId: number;
    /**
     * 切换效果。
     */
    transition: SceneTransitionTypes;
    /**
     * 效果时长。
     */
    duration?: number;
}

interface BaseRemoveParams {
    /**
     * 对象名称。
     */
    name: string;
    /**
     * 可跳过。
     */
    canskip?: boolean;
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
    黛瑞雅性格属性: [谦逊: number, 傲慢: number, 荣誉: number];
}

interface DelayParams {
    /**
     * 延迟时间。
     */
    time: number;
}

interface PlayAudioParams {
    /**
     * 对象名称。
     */
    name: string;
    /**
     * 音效资源唯一标识。
     */
    resId: string;
    /**
     * 音量百分比。
     */
    vol: number;
    /**
     * 播放效果
     */
    effect: "normal" | "fadein";
    /**
     * 淡入播放效果时长。
     */
    duration?: number;
    /**
     * 是否循环播放。
     * @default false
     */
    loop?: boolean;
}

interface CreateSequenceParams extends BaseObjectParams {
    /**
     * 动画序列资源组。
     */
    resGroup: {
        /**
         * 资源 ID。
         */
        resId: string;
        /**
         * 持续时间，单位：毫秒。
         */
        time: number;
    }[];
}

declare enum TextDirectionTypes {
    horizontal = "horizontal",
    vertical = "vertical",
}

declare enum HAlignTypes {
    left = "left",
    middle = "middle",
    right = "right",
}

declare enum VAlignTypes {
    bottom = "bottom",
    center = "center",
    top = "top",
}

interface CreateTextParams extends BaseObjectParams {
    /**
     * 文本内容。
     */
    content: string;
    /**
     * 文本方向。
     */
    direction?: TextDirectionTypes;
    /**
     * 水平对齐类型。
     */
    halign?: HAlignTypes;
    /**
     * 垂直对齐类型。
     */
    valign?: VAlignTypes;
    /**
     * 文本框大小。
     */
    size: { width: number; height: number };
}

declare enum EventTypes {
    onDragEnded = "onDragEnded",
    onTouchBegan = "onTouchBegan",
    onTouchEnded = "onTouchEnded",
    onTouchEntered = "onTouchEntered",
    onTouchLeft = "onTouchLeft",
    onTouchMoved = "onTouchMoved",
}

interface AddEventListenerParams {
    /**
     * 事件类型。
     */
    type: EventTypes;
    /**
     * 事件侦听器。
     */
    listener: () => void | Promise<void>;
    /**
     * 事件侦听器作用目标。
     */
    target: string;
}

declare enum EaseTypes {
    easeExponentialIn = "easeExponentialIn",
    easeExponentialInOut = "easeExponentialInOut",
    easeExponentialOut = "easeExponentialOut",
    normal = "normal",
}

interface HideParams {
    /**
     * 对象名称。
     */
    name: string;
    /**
     * 消失效果。
     * @default ac.EFFECT_TYPES.normal
     */
    effect?: EffectTypes;
    /**
     * 效果时长。
     * @default 0
     */
    duration?: number;
    /**
     * 是否可跳过。
     * @default true
     */
    canskip?: boolean;
}

interface MoveToParams {
    /**
     * 对象名称。
     */
    name: string;
    /**
     * 目标位置 x 坐标。
     * @default 0
     */
    x?: number;
    /**
     * 目标位置 y 坐标。
     * @default 0
     */
    y?: number;
    /**
     * 持续时间，单位：毫秒。
     * @default 0
     */
    duration?: number;
    /**
     * 是否可跳过。
     * @default true
     */
    canskip?: boolean;
    /**
     * 缓冲类型。
     * @default ac.EASE_TYPES.normal
     */
    ease?: EaseTypes;
}

interface MoveByParams {
    /**
     * 对象名称。
     */
    name: string;
    /**
     * x 坐标偏移量。
     * @default 0
     */
    x?: number;
    /**
     * y 坐标偏移量。
     * @default 0
     */
    y?: number;
    /**
     * 持续时间，单位：毫秒。
     * @default 0
     */
    duration?: number;
    /**
     * 是否可跳过。
     * @default true
     */
    canskip?: boolean;
    /**
     * 缓冲类型。
     * @default ac.EASE_TYPES.normal
     */
    ease?: EaseTypes;
}

interface GetPosParams {
    /**
     * 对象名称。
     */
    name: string;
}

type 坐标 = [x: number, y: number];

interface 坐标对象 {
    /**
     * x 坐标。
     */
    x: number;
    /**
     * y 坐标。
     */
    y: number;
}

interface ShowParams {
    /**
     * 对象名称。
     */
    name: string;
    /**
     * 出现效果。
     * @default ac.EFFECT_TYPES.normal
     */
    effect?: EffectTypes.fadein | EaseTypes.normal;
    /**
     * 效果持续时长，单位：毫秒。
     * @default 0
     */
    duration?: number;
    /**
     * 是否可跳过。
     * @default true
     */
    canskip?: boolean;
}

interface AC {
    /** 数组变量     */ arr: ArrayVariables;
    /** 缓动渐变类型 */ EASE_TYPES: typeof EaseTypes;
    /** 特效类型     */ EFFECT_TYPES: typeof EffectTypes;
    /** 事件类型     */ EVENT_TYPES: typeof EventTypes;
    /** 场景切换类型 */ SCENE_TRANSITION_TYPES: typeof SceneTransitionTypes;
    /** 文本方向类型 */ TEXT_DIRECTION_TYPES: typeof TextDirectionTypes;
    /** 水平对齐类型 */ HALIGN_TYPES: typeof HAlignTypes;
    /** 垂直对齐类型 */ VALIGN_TYPES: typeof VAlignTypes;
    /** 添加事件侦听 */ addEventListener(params: AddEventListenerParams): Promise<void>;
    /** 创建图片     */ createImage(params: CreateImageParams): Promise<void>;
    /** 创建图层     */ createLayer(params: CreateLayerParams): Promise<void>;
    /** 创建选项     */ createOption(params: CreateOptionParams): Promise<void>;
    /** 创建序列动画 */ createSequence(params: CreateSequenceParams): Promise<void>;
    /** 创建文本     */ createText(params: CreateTextParams): Promise<void>;
    /** 延迟         */ delay(params: DelayParams): Promise<void>;
    /** 插播剧情     */ display(params: DisplayParams): Promise<void>;
    /** 获取实体坐标 */ getPos(params: GetPosParams): Promise<坐标对象>;
    /** 显示对象     */ show(params: ShowParams): Promise<void>;
    /** 隐藏对象     */ hide(params: HideParams): Promise<void>;
    /** 移到指定位置 */ moveTo(params: MoveToParams): Promise<void>;
    /** 移动指定距离 */ moveBy(params: MoveByParams): Promise<void>;
    /** 播放音效     */ playAudio(params: PlayAudioParams): Promise<void>;
    /** 移除对象     */ remove(params: RemoveParams): Promise<void>;
}

declare const ac: AC;
