declare const _default: import("vue").DefineComponent<{
    /**
     * 图片点击是否关闭
     */
    photoClosable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 背景点击是否关闭
     */
    maskClosable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 箭头切换是否需要过渡
     */
    shouldTransition: {
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
}, {
    items: import("vue").Ref<import("..").ItemType[]>;
    updateItem: import("..").UpdateItemType;
    removeItem: import("..").RemoveItemType;
    visible: import("vue").Ref<boolean>;
    handleHide: () => void;
    handleShow: import("..").HandleShowType;
    index: import("vue").Ref<number>;
    updateIndex: (newIndex: number) => void;
}, unknown, {}, {
    handleClickPhoto(): void;
    handleClickMask(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("indexChange" | "visibleChange")[], "indexChange" | "visibleChange", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    photoClosable?: unknown;
    maskClosable?: unknown;
    shouldTransition?: unknown;
    defaultBackdropOpacity?: unknown;
} & {
    photoClosable: boolean;
    maskClosable: boolean;
    shouldTransition: boolean;
    defaultBackdropOpacity: number;
} & {}> & {
    onIndexChange?: ((...args: any[]) => any) | undefined;
    onVisibleChange?: ((...args: any[]) => any) | undefined;
}, {
    photoClosable: boolean;
    maskClosable: boolean;
    shouldTransition: boolean;
    defaultBackdropOpacity: number;
}>;
export default _default;
