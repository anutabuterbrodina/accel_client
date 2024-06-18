import { inject } from "@vue/runtime-core";
import { computed, ref } from "vue";
import type { ComputedRef, InjectionKey } from "vue";

interface IModalStore {
    isShown: ComputedRef<boolean>,
    setVisibility: (value: boolean) => void,
    refreshStore: () => void,
}

export const modalStoreSymbol = <InjectionKey<string>> Symbol('modalStore')

export const createModalStore = () => {
    const isVisible = ref(false)
    const isShown = computed(() => isVisible.value)

    const setVisibility = (value: boolean) => {
        isVisible.value = value
    }

    const refreshStore = () => {
        isVisible.value = false
    }

    return { isShown, setVisibility, refreshStore }
}

export const useModalStore = () => <IModalStore> inject(modalStoreSymbol)