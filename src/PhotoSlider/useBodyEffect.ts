import { Ref, watch } from "vue";

export default function useBodyEffect(
  visible: Ref<boolean>,
  rootElement?: string | HTMLElement
): void {
  const root =
    rootElement && typeof rootElement === "string"
      ? (document.querySelector(rootElement) as HTMLElement)
      : (rootElement as HTMLElement);
  const { style } = root ? root : document.body;
  const originalOverflow = style.overflow;

  watch(visible, () => {
    if (visible.value) {
      style.overflow = "hidden";
    } else {
      style.overflow = originalOverflow;
    }
  });
}
