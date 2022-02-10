import { Ref } from 'vue';
export default function useWindowResize(naturalWidth: Ref<number>, naturalHeight: Ref<number>, rotate: Ref<number>, setSuitableImageSize: (actualWidth: number, actualHeight: number, rotate: number) => void): void;
