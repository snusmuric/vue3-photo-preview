/**
 * 获取移动或缩放之后的中心点
 */
export default function getPositionOnMoveOrScale({ x, y, clientX, clientY, fromScale, toScale }: {
    x: number;
    y: number;
    clientX: number;
    clientY: number;
    fromScale: number;
    toScale: number;
}): {
    x: number;
    y: number;
    scale: number;
};
