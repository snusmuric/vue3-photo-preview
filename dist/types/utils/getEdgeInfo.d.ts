import { EdgeTypeEnum } from '../types';
/**
 * 获取图片拖拽到边缘需要的值
 */
export declare function getEdgeInfo({ width, height, scale, rotate, }: {
    width: number;
    height: number;
    scale: number;
    rotate: number;
}): {
    edgeLeft: number;
    edgeRight: number;
    edgeTop: number;
    edgeBottom: number;
};
/**
 * 获取边缘类型
 */
export declare function getEdgeTypes({ width, height, scale, rotate, x, y, }: {
    width: number;
    height: number;
    scale: number;
    rotate: number;
    x: number;
    y: number;
}): EdgeTypeEnum[];
/**
 * 获取标准值
 */
export declare function getStandardPosition({ width, height, scale, rotate, x, y, }: {
    width: number;
    height: number;
    scale: number;
    rotate: number;
    x: number;
    y: number;
}): {
    x: number;
    y: number;
    scale: number;
};
