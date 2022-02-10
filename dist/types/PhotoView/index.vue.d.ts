import { PropType } from 'vue';
import { OriginRectType, ShowAnimateEnum } from '../types';
import getAnimateOrigin from '../utils/getAnimateOrigin';
declare const _default: import("vue").DefineComponent<{
    /**
     * 图片地址
     */
    src: {
        type: StringConstructor;
        required: true;
    };
    /**
     * 触发打开模态框的位置信息
     */
    originRect: {
        type: PropType<OriginRectType>;
        default: null;
    };
    /**
     * 动画类型
     */
    showAnimateType: {
        type: PropType<ShowAnimateEnum>;
        default: null;
    };
}, {
    width: import("vue").Ref<number>;
    height: import("vue").Ref<number>;
    loaded: import("vue").Ref<boolean>;
    x: import("vue").Ref<number>;
    y: import("vue").Ref<number>;
    scale: import("vue").Ref<number>;
    touched: import("vue").Ref<boolean>;
    handleMouseDown: (e: MouseEvent) => void;
    handleTouchStart: (e: TouchEvent) => void;
    handleWheel: (e: WheelEvent) => void;
    rotate: import("vue").Ref<number>;
    handleRotateLeft: () => void;
    handleRotateRight: () => void;
}, {
    ShowAnimateEnum: typeof ShowAnimateEnum;
    isFlipHorizontal: boolean;
    isFlipVertical: boolean;
}, {}, {
    getAnimateOrigin: typeof getAnimateOrigin;
    toggleFlipHorizontal(): void;
    toggleFlipVertical(): void;
    getTransform(): string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("touchStart" | "touchMove" | "touchEnd" | "singleTap")[], "touchStart" | "touchMove" | "touchEnd" | "singleTap", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    src?: unknown;
    originRect?: unknown;
    showAnimateType?: unknown;
} & {
    src: string;
    originRect: OriginRectType;
    showAnimateType: ShowAnimateEnum;
} & {}> & {
    onTouchStart?: ((...args: any[]) => any) | undefined;
    onTouchMove?: ((...args: any[]) => any) | undefined;
    onTouchEnd?: ((...args: any[]) => any) | undefined;
    onSingleTap?: ((...args: any[]) => any) | undefined;
}, {
    originRect: OriginRectType;
    showAnimateType: ShowAnimateEnum;
}>;
export default _default;
