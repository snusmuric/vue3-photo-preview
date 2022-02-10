import { Ref } from 'vue';
import { ItemType, UpdateItemType, RemoveItemType } from '../types';
declare type useItemsReturn = {
    items: Ref<ItemType[]>;
    updateItem: UpdateItemType;
    removeItem: RemoveItemType;
};
export default function useItems(index: Ref<number>): useItemsReturn;
export {};
