import { inject } from "@vue/runtime-core";
import { computed, ref } from "vue";
import type { InjectionKey } from "vue";

export const modalStoreSymbol = <InjectionKey<string>> Symbol('modalStore')

export const createModalStore = () => {
    const isVisible = ref(false)
    const isShown = computed(() => isVisible.value)

    const setVisibility = (value: boolean) => {
        isVisible.value = value
    }

    return { isShown, setVisibility }
}

export const useModalStore = () => inject(modalStoreSymbol)