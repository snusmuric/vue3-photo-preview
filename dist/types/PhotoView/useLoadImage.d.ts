import { Ref } from 'vue';
export default function useLoadImage(src: Ref<string>): {
    width: Ref<number>;
    height: Ref<number>;
    loaded: Ref<boolean>;
    naturalWidth: Ref<number>;
    naturalHeight: Ref<number>;
    setSuitableImageSize: (actualWidth: number, actualHeight: number, rotate: number) => void;
};
