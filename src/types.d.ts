type 坐标 = [x: number, y: number];
type 坐标对象 = { x: number; y: number };
type 中文坐标对象 = { 横: number; 纵: number };
type 中文大小对象 = { 宽: number; 高: number };

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
    pos?: 坐标对象;
    /**
     * 对象锚点。
     * @remarks
     * 锚点指从文本框左下角出发，相对于文本框的位置百分比。
     * 锚点可以在文本框外。（0,0）表示在文本框左下角。
     * （50,50）表示在文本框正中心。
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
interface CreateImageBaseParams extends BaseObjectParams {
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

interface CreateImageWithStaticScaleParams extends CreateImageBaseParams {
    /**
     * 缩放百分比。
     * @default 100
     */
    scale?: number;
}

interface CreateImageWithDynamicScaleParams extends CreateImageBaseParams {
    /**
     * 是否自动缩放图像以适应容器。
     *
     * @remarks
     * - `"cover"` 意味着图像应该缩放以覆盖整个容器，
     *             即使这意味着失去一些图像的原始纵横比，
     *             将会对图片进行适当的剪裁。
     * - `"contain"` 意味着图像应该缩放以适合容器，同时保持其原始纵横比。
     *               如果容器的宽高比与图像的宽高比不匹配，
     *               这可能会导致图像周围出现空白区域。
     */
    dynaScale?: "cover" | "contain";
}

type CreateImageParams = CreateImageWithStaticScaleParams | CreateImageWithDynamicScaleParams;

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
     * 选项文字样式。
     */
    style?: string;
    /**
     * 点击音效。
     */
    clickAudio?: {
        /**
         * 音效资源 ID。
         */
        resId: string;
        /**
         * 音量百分比。
         */
        vol?: number;
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
    effect?: "normal";
}

interface FadeoutRemoveParams extends BaseRemoveParams {
    /**
     * 消失效果。
     */
    effect: "fadeout";
    /**
     * 效果时长。
     */
    duration: number;
}

type RemoveParams = NormalRemoveParams | FadeoutRemoveParams;

interface ArrayVariables {
    日记记录: number[];
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
     * @default 100
     */
    vol?: number;
    /**
     * 播放效果
     * @default "normal"
     */
    effect?: "normal" | "fadein";
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
     * @default ""
     */
    content?: string;
    /**
     * 文本方向。
     * @default ac.TEXT_DIRECTION_TYPES.horizontal
     */
    direction?: "horizontal" | "vertical";
    /**
     * 水平对齐类型。
     * @default ac.HALIGN_TYPES.left
     */
    halign?: "left" | "middle" | "right";
    /**
     * 垂直对齐类型。
     * @default ac.VALIGN_TYPES.top
     */
    valign?: "bottom" | "center" | "top";
    /**
     * 文本框大小。
     * @default { width: 0, height: 0 }
     */
    size?: { width: number; height: number };
    /**
     * 文字样式。
     * @default ""
     * @remarks 填入创建好的 style 唯一标识
     */
    style?: string;
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
    effect?: "normal" | "fadeout";
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

interface ShowParams {
    /**
     * 对象名称。
     */
    name: string;
    /**
     * 出现效果。
     * @default ac.EFFECT_TYPES.normal
     */
    effect?: "fadein" | "normal";
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

declare enum FilterTypes {
    brightness = "brightness",
    gaussianblur = "gaussianblur",
    gray = "gray",
}

interface FilterParams {
    /**
     * 对象名称。
     */
    name: string;
    /**
     * 参数。
     * @remarks
     * 1. 对于高斯模糊效果，参数是半径值（必须是整数），单位是像素；
     * 2. 对于灰度化，参数值为 0 时失效，为其他时正常；
     * 3. 对于明度效果，参数表示闭区间[-100,100]中的整数，默认为 0；
     */
    args: number;
    /**
     * 滤镜类型。
     * @default ac.FILTER_TYPES.gaussianblur
     */
    type?: FilterTypes;
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

interface CreateStyleParams {
    /**
     * 文字样式唯一标识。
     */
    name: string;
    font?: string;
    bold?: boolean;
    italic?: boolean;
    fontSize?: number;
    color?: string;
    speed?: number;
    strokeColor?: string;
    strokeWidth?: number;
    shadowColor?: string;
    shadowPos?: { x: number; y: number };
    canskip?: boolean;
}

interface CallUIParams {
    name: string;
    uiId: string;
}

interface FadeToParams {
    name: string;
    /**
     * 目标透明度。
     * @default 100
     */
    opacity?: number;
    ease?: EaseTypes;
    duration?: number;
    canskip?: boolean;
}

interface TransParams {
    /**
     * 通道图资源标识。
     */
    rule: string;
    /**
     * 过渡时间，单位：毫秒。
     * @default 0
     */
    duration?: number;
    /**
     * 切换对象的名称。
     */
    group: [first: string, second: string];
    /**
     * 是否可跳过。
     * @default false
     */
    canskip?: boolean;
}

interface SysDialogOnParams {
    roleName?: string;
    content?: string;
    id?: number;
    hasRoleName?: boolean;
    hasBg?: boolean;
    hasRoleAvatar?: boolean;
}

interface StopAudioParams {
    name: string;
    effect?: "fadeout" | "normal";
    duration?: number;
}

interface PauseAudioParams {
    name: string;
}

interface ResumeAudioParams {
    name: string;
}

interface AC {
    /** 数组变量     */ arr: ArrayVariables;
    /** 缓动渐变类型 */ EASE_TYPES: typeof EaseTypes;
    /** 特效类型     */ EFFECT_TYPES: typeof EffectTypes;
    /** 事件类型     */ EVENT_TYPES: typeof EventTypes;
    /** 滤镜类型     */ FILTER_TYPES: typeof FilterTypes;
    /** 场景切换类型 */ SCENE_TRANSITION_TYPES: typeof SceneTransitionTypes;
    /** 文本方向类型 */ TEXT_DIRECTION_TYPES: typeof TextDirectionTypes;
    /** 水平对齐类型 */ HALIGN_TYPES: typeof HAlignTypes;
    /** 垂直对齐类型 */ VALIGN_TYPES: typeof VAlignTypes;
    /** 添加事件侦听 */ addEventListener(params: AddEventListenerParams): Promise<void>;
    /** 插入 UI      */ callUI(params: CallUIParams): Promise<void>;
    /** 关闭当前 UI  */ removeCurrentUI(): Promise<void>;
    /** 创建图片     */ createImage(params: CreateImageParams): Promise<void>;
    /** 创建图层     */ createLayer(params: CreateLayerParams): Promise<void>;
    /** 创建选项     */ createOption(params: CreateOptionParams): Promise<void>;
    /** 创建序列动画 */ createSequence(params: CreateSequenceParams): Promise<void>;
    /** 创建文本样式 */ createStyle(params: CreateStyleParams): Promise<void>;
    /** 创建文本     */ createText(params: CreateTextParams): Promise<void>;
    /** 延迟         */ delay(params: DelayParams): Promise<void>;
    /** 插播剧情     */ display(params: DisplayParams): Promise<void>;
    /** 滤镜效果     */ filter(params: FilterParams): Promise<void>;
    /** 透明化       */ fadeTo(params: FadeToParams): Promise<void>;
    /** 获取实体坐标 */ getPos(params: GetPosParams): Promise<坐标对象>;
    /** 显示对象     */ show(params: ShowParams): Promise<void>;
    /** 隐藏对象     */ hide(params: HideParams): Promise<void>;
    /** 对象过渡     */ trans(params: TransParams): Promise<void>;
    /** 移到指定位置 */ moveTo(params: MoveToParams): Promise<void>;
    /** 移动指定距离 */ moveBy(params: MoveByParams): Promise<void>;
    /** 播放音效     */ playAudio(params: PlayAudioParams): Promise<void>;
    /** 停止音效     */ stopAudio(params: StopAudioParams): Promise<void>;
    /** 暂停音效     */ pauseAudio(params: PauseAudioParams): Promise<void>;
    /** 恢复音效     */ resumeAudio(params: ResumeAudioParams): Promise<void>;
    /** 移除对象     */ remove(params: RemoveParams): Promise<void>;
    /** 打开对话框   */ sysDialogOn(params: SysDialogOnParams): Promise<void>;
    /** 关闭对话框   */ sysDialogOff(): Promise<void>;
}

declare const ac: AC;
