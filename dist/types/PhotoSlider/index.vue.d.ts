import { PropType } from "vue";
import PhotoView from "../PhotoView/index.vue";
import { ItemType, ShowAnimateEnum, TouchTypeEnum, EdgeTypeEnum } from "../types";
declare const _default: import("vue").DefineComponent<{
    /**
     * 图片列表
     */
    items: {
        type: PropType<ItemType[]>;
        required: true;
    };
    /**
     * 图片当前索引
     */
    index: {
        type: NumberConstructor;
        required: true;
    };
    /**
     * 是否显示模态框
     */
    visible: {
        type: BooleanConstructor;
        required: true;
    };
    /**
     * 箭头切换是否需要过渡
     */
    shouldTransition: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 是否切换显隐覆盖物
     */
    toggleOverlay: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 默认背景透明度
     */
    defaultBackdropOpacity: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * Specifies a place in a DOM (target container) where PhotoSlider will be injected
     * Could bequery selector or HtmlElement
     */
    teleportTo: {
        type: (StringConstructor | {
            new (): HTMLElement;
            prototype: HTMLElement;
        })[];
        default: string;
    };
}, {
    innerWidth: import("vue").Ref<number>;
    currentItem: import("vue").ComputedRef<ItemType>;
    photoVisible: import("vue").Ref<boolean>;
    showAnimateType: import("vue").Ref<ShowAnimateEnum>;
    originRect: import("vue").Ref<import("../types").OriginRectType>;
    onShowAnimateEnd: () => void;
}, {
    horizontalOffset: number;
    ShowAnimateEnum: typeof ShowAnimateEnum;
    isTouchDevice: boolean;
    touched: boolean;
    hasMove: boolean;
    needTransition: boolean;
    clientX: number;
    clientY: number;
    touchMoveX: number;
    backdropOpacity: number;
    overlayVisible: boolean;
    photoViewRefs: any[];
}, {}, {
    handleDownload(): void;
    toggleFlipHorizontal(): void;
    toggleFlipVertical(): void;
    handleRotateLeft(): void;
    handleRotateRight(): void;
    setPhotoViewRef(ref: InstanceType<typeof PhotoView>): void;
    handleKeyDown(e: KeyboardEvent): void;
    handleSingleTap(): void;
    handleTouchStart(clientX: number, clientY: number): void;
    handleTouchMove(touchType: TouchTypeEnum, clientX: number, clientY: number, edgeTypes: EdgeTypeEnum[]): void;
    handleTouchScaleMove(clientX: number, edgeTypes: EdgeTypeEnum[]): void;
    handleTouchHorizontalMove(clientX: number): void;
    handleTouchVerticalMove(clientX: number, clientY: number): void;
    handleTouchEnd(touchType: TouchTypeEnum, clientX: number, clientY: number, edgeTypes: EdgeTypeEnum[]): void;
    handleTouchScaleEnd(clientX: number, edgeTypes: EdgeTypeEnum[]): void;
    handleTouchHorizontalEnd(clientX: number): void;
    handleTouchVerticalEnd(clientY: number): void;
    resetBackdropOpacity(): void;
    resetNeedTransition(): void;
    getItemIndex(item: ItemType): number;
    handlePrevious(): void;
    handleNext(): void;
    handleClickPhoto(e: MouseEvent): void;
    handleClickMask(e: MouseEvent): void;
    handleClickClose(): void;
    getTransition(): "transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)" | undefined;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("clickPhoto" | "clickMask" | "changeIndex" | "closeModal" | "singleTap")[], "clickPhoto" | "clickMask" | "changeIndex" | "closeModal" | "singleTap", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    items?: unknown;
    index?: unknown;
    visible?: unknown;
    shouldTransition?: unknown;
    toggleOverlay?: unknown;
    defaultBackdropOpacity?: unknown;
    teleportTo?: unknown;
} & {
    items: ItemType[];
    index: number;
    visible: boolean;
    shouldTransition: boolean;
    toggleOverlay: boolean;
    defaultBackdropOpacity: number;
    teleportTo: string | HTMLElement;
} & {}> & {
    onClickPhoto?: ((...args: any[]) => any) | undefined;
    onClickMask?: ((...args: any[]) => any) | undefined;
    onChangeIndex?: ((...args: any[]) => any) | undefined;
    onCloseModal?: ((...args: any[]) => any) | undefined;
    onSingleTap?: ((...args: any[]) => any) | undefined;
}, {
    shouldTransition: boolean;
    toggleOverlay: boolean;
    defaultBackdropOpacity: number;
    teleportTo: string | HTMLElement;
}>;
export default _default;
