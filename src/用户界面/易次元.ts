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
     * @默认值 真
     */
    可见性?: 真假;
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

export const 易次元 = {
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
            if (参数.可见性) 基础对象参数.visible = 参数.可见性;

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
            if (参数.可见性) 图片参数.visible = 参数.可见性;
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
};
