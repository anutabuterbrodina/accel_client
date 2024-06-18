import { inject } from "@vue/runtime-core";
import type { InjectionKey, UnwrapNestedRefs, ComputedRef } from "vue";
import { computed, reactive, ref } from "vue";
import { AuthAPI } from "@/api/auth/auth.api";
import type { IPayload } from "@/core/helpers/payload.interface";

interface IAuthStore {
    currentUser: UnwrapNestedRefs<IPayload>,
    isLoggedIn: ComputedRef<boolean>,
    refreshStore: () => void,
}

export const authStoreSymbol = <InjectionKey<string>> Symbol('authStore')

export const createAuthStore = () => {
    const authToken = ref(AuthAPI.getAuthToken())
    const isLoggedIn = computed(() => !!authToken.value)
    const currentUser = reactive(AuthAPI.getPayload())

    const refreshStore = () => {
        const payload = AuthAPI.getPayload()

        currentUser.id = payload.id
        currentUser.email = payload.email
        currentUser.role = payload.role
        currentUser.type = payload.type

        authToken.value = AuthAPI.getAuthToken()
    }

    return { currentUser, isLoggedIn, refreshStore }
}

export const useAuthStore = () => <IAuthStore> inject(authStoreSymbol)