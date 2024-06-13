import { inject } from "@vue/runtime-core";
import { computed, reactive, ref } from "vue";
import type { UnwrapRef } from "vue";
import type { InjectionKey } from "vue";
import { UserApi } from "@/api/user.api";
import { User } from "@/core/entities/user";

export const userStoreSymbol = <InjectionKey<string>> Symbol('userStore')

export const createUserStore = () => {
    const api = new UserApi();

    const usersList = ref<User[]>([])
    let user = reactive<User|null>(null)

    const isListEmpty = ref(false)

    const loadUsersList = async (userIds: string[]) => {
        try {
            usersList.value = <Array<UnwrapRef<User>>> await api.getList(userIds)
        } catch (e) {
            isListEmpty.value = true
        }
    }

    const loadUser = async () => {
        user = reactive(await api.getSingle({}))
    }

    return { usersList, loadUsersList, user, loadUser, isListEmpty }
}

export const useUserStore = () => inject(userStoreSymbol)