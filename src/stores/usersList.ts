import { inject } from "@vue/runtime-core";
import { ref } from "vue";
import type { Ref, InjectionKey } from "vue";
import { User } from "@/core/entities/user/user";
import { UserApi } from "@/api/user/user.api";

interface IUsersListStore {
    usersList: Ref<User[]>
}

export const usersListStoreSymbol = <InjectionKey<string>> Symbol('usersListStore')

export const createUsersListStore = () => {
    const usersList = ref<User[]>([])
    return { usersList }
}

export const useUsersListStore = () => <IUsersListStore> inject(usersListStoreSymbol)