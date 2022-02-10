export declare type ItemType = {
    key: string;
    src: string;
    originRef?: HTMLElement | null;
    intro?: string | null;
    downloadName?: string | null;
};
export declare type OriginRectType = {
    left: number;
    top: number;
    width: number;
    height: number;
} | null;
export declare type UpdateItemType = (item: ItemType) => void;
export declare type RemoveItemType = (key: string) => void;
export declare type HandleShowType = (key: string) => void;
export declare enum ShowAnimateEnum {
    None = 0,
    In = 1,
    Out = 2
}
export declare enum TouchTypeEnum {
    Normal = 0,
    X = 1,
    Y = 2,
    Scale = 3
}
export declare enum EdgeTypeEnum {
    Left = 0,
    Right = 1,
    Top = 2,
    Bottom = 3
}
