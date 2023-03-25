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

declare const ac = {
    /** 创建图片 */ createImage: (params: CreateImageParams) => Promise<void>,
    /** 创建图层 */ createLayer: (params: CreateLayerParams) => Promise<void>,
};

declare const 记号: {
    对话选项管理器: symbol;
    人物管理器: symbol;
};

declare const 容器: Map<symbol, 对话选项管理器类 | 人物管理器类>;
