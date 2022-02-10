/**
 * 从 Touch 事件中获取两个触控中心的位置
 * @param e TouchEvent
 */
export default function getMultipleTouchPosition(e: TouchEvent): {
    clientX: number;
    clientY: number;
    touchLength: number;
};
