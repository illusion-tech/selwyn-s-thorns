interface CreateImageParams {
	/**
	 * 图片资源名称。
	 */
	name: string;
	/**
	 * 图片层级索引。
	 * @default 0
	 */
	index?: number;
	/**
	 * 图片所在图层。
	 */
	inlayer: string;
	/**
	 * 图片资源 ID。
	 */
	resId: string;
	/**
	 * 图片位置。
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
	 * 锚点。
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
	 * 是否可见。
	 * @default true
	 */
	visible?: boolean;
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

declare const ac = {
	/** 创建图片 */
	createImage: async (params: CreateImageParams) => Promise<void>,
};

declare const 记号: {
	对话选项管理器: symbol;
	人物管理器: symbol;
};

declare const 容器: Map<symbol, 对话选项管理器类 | 人物管理器类>;
