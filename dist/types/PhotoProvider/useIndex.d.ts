import { Ref } from 'vue';
declare type useIndexReturn = {
    index: Ref<number>;
    updateIndex: (newIndex: number) => void;
};
export default function useIndex(onIndexChange: () => void): useIndexReturn;
export {};
