import { inject } from "@vue/runtime-core";
import type { InjectionKey, UnwrapNestedRefs } from "vue";
import { reactive } from "vue";
import { User } from "@/core/entities/user/user";
import { EUserAccountTypes } from "@/core/entities/user/user-account-types.enum";
import { EUserRoles } from "@/core/entities/user/user-roles.enum";

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
        EUserAccountTypes.ANONYMOUS,
        null,
        EUserRoles.ANONYMOUS,
    ))

    return { user }
}

export const useUserStore = () => <IUserStore> inject(userStoreSymbol)