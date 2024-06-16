import { inject } from "@vue/runtime-core";
import { reactive } from "vue";
import type { InjectionKey, UnwrapNestedRefs } from "vue";
import { UserApi } from "@/api/user.api";
import { User } from "@/core/entities/user/user";

interface IUserStore {
    user: UnwrapNestedRefs<User>
}

export const userStoreSymbol = <InjectionKey<string>> Symbol('userStore')

export const createUserStore = () => {
    const user = reactive<User>(new User(
        '',
        '',
        '',
        '',
    ))

    return { user }
}

export const useUserStore = () => <IUserStore> inject(userStoreSymbol)