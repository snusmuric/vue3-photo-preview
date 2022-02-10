import { App } from 'vue';
import PhotoProvider from './PhotoProvider/index.vue';
import PhotoConsumer from './PhotoConsumer/index.vue';
import PhotoSlider from './PhotoSlider/index.vue';
export * from './types';
export { PhotoProvider, PhotoConsumer, PhotoSlider };
declare const _default: {
    install: (app: App<any>) => void;
};
export default _default;
