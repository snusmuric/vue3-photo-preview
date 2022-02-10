export declare type TapFuncType<T> = (...args: T[]) => void;
export default function withContinuousTap<T>(singleTap: TapFuncType<T>, doubleTap: TapFuncType<T>): TapFuncType<T>;
