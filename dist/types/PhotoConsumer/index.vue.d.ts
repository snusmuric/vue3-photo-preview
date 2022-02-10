declare const _default: import("vue").DefineComponent<{
    /**
     * 图片地址
     */
    src: {
        type: StringConstructor;
        required: true;
    };
    /**
     * 图片介绍
     */
    intro: {
        type: StringConstructor;
        default: null;
    };
    /**
     * 图片下载名称，默认图片名称
     */
    downloadName: {
        type: StringConstructor;
        default: null;
    };
}, {
    root: import("vue").Ref<HTMLElement | null>;
    handleClick: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    src?: unknown;
    intro?: unknown;
    downloadName?: unknown;
} & {
    src: string;
    intro: string;
    downloadName: string;
} & {}>, {
    intro: string;
    downloadName: string;
}>;
export default _default;
