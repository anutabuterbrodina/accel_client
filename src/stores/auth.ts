import { inject } from "@vue/runtime-core";
import type { InjectionKey } from "vue";
import { reactive, ref } from "vue";
import { UserApi } from "@/api/user.api";

export const authStoreSymbol = <InjectionKey<string>> Symbol('authStore')

export const createAuthStore = () => {
    const api = new UserApi();

    const authToken = ref( api.getAuthToken() )
    const isLoggedIn = ref( !!authToken.value );
    const userId = ref( api.getUserId() )

    const login = async () => {
        await api.login( {
            email: payload.email,
            password: payload.password
        })
        authToken.value = api.getAuthToken()
        isLoggedIn.value = true
    }

    const logout = () => {
        api._clearAuthToken()
        isLoggedIn.value = false
        payload.name = ''
        payload.surname = ''
        payload.email = ''
        payload.phone = ''
        payload.password = ''
        payload.passwordCheck = ''
    }

    const payload = reactive({
        name: '',
        surname: '',
        email: '',
        phone: '',
        password: '',
        passwordCheck: '',
    })

    const signup = async () => {
        await api.signup({
            name: payload.name,
            surname: payload.surname,
            email: payload.email,
            phone: payload.phone,
            password: payload.password,
        })

        authToken.value = api.getAuthToken()
        isLoggedIn.value = true
    }

    return { payload, signup, isLoggedIn, logout, login, userId }
}

export const useAuthStore = () => inject(authStoreSymbol)