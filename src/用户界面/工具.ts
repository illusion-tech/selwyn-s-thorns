export function 坐标转坐标对象(坐标: 坐标): 坐标对象 {
    return {
        x: 坐标[0],
        y: 坐标[1],
    };
}

export function 中文坐标对象转坐标对象(坐标: 中文坐标对象): 坐标对象 {
    return {
        x: 坐标.横,
        y: 坐标.纵,
    };
}
