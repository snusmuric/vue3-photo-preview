import { Ref } from 'vue';
import { ItemType, ShowAnimateEnum, OriginRectType } from '../types';
declare type useAnimationHandleReturn = {
    photoVisible: Ref<boolean>;
    showAnimateType: Ref<ShowAnimateEnum>;
    originRect: Ref<OriginRectType>;
    onShowAnimateEnd: () => void;
};
export default function useAnimationHandle(visible: Ref<boolean>, currentItem: Ref<ItemType>): useAnimationHandleReturn;
export {};
