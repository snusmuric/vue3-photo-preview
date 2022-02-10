import { Ref } from 'vue';
import { TouchTypeEnum, EdgeTypeEnum } from '../types';
declare type useMoveImageReturn = {
    x: Ref<number>;
    y: Ref<number>;
    scale: Ref<number>;
    rotate: Ref<number>;
    touched: Ref<boolean>;
    handleMouseDown: (e: MouseEvent) => void;
    handleTouchStart: (e: TouchEvent) => void;
    handleWheel: (e: WheelEvent) => void;
    handleRotateLeft: () => void;
    handleRotateRight: () => void;
};
export default function useMoveImage(width: Ref<number>, height: Ref<number>, naturalWidth: Ref<number>, naturalHeight: Ref<number>, setSuitableImageSize: (actualWidth: number, actualHeight: number, rotate: number) => void, onTouchStart: (clientX: number, clientY: number) => void, onTouchMove: (touchType: TouchTypeEnum, clientX: number, clientY: number, edgeTypes: EdgeTypeEnum[]) => void, onTouchEnd: (touchType: TouchTypeEnum, clientX: number, clientY: number, edgeTypes: EdgeTypeEnum[]) => void, onSingleTap: (clientX: number, clientY: number) => void): useMoveImageReturn;
export {};
