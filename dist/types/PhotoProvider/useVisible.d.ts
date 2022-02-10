import { Ref } from 'vue';
import { HandleShowType, ItemType } from '../types';
declare type useVisibleReturn = {
    visible: Ref<boolean>;
    handleHide: () => void;
    handleShow: HandleShowType;
};
export default function useVisible(items: Ref<ItemType[]>, index: Ref<number>, onVisibleChange: () => void): useVisibleReturn;
export {};
