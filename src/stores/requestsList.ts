import { inject } from "@vue/runtime-core";
import { ref } from "vue";
import type { Ref, UnwrapRef } from "vue";
import type { InjectionKey } from "vue";
import { Request } from "@/core/entities/request/request";
import { RequestApi } from "@/api/request/request.api";
import type { IRequestsFilters } from "@/core/helpers/requests-filters.interface";

interface IRequestsListStore {
    requestsList: Ref<Request[]>,
    loadRequestsList: (
        filters: IRequestsFilters,
        userId?: string | null,
        sort?: { sortOrder: string | null, sortOption: string | null },
        limit?: number | null,
    ) => Promise<void>,
}

export const requestsListStoreSymbol = <InjectionKey<string>> Symbol('requestsListStore')

export const createRequestsListStore = () => {
    const requestsList = ref<Request[]>([])

    const loadRequestsList = async (
        filters: IRequestsFilters,
        userId: string | null = null,
        sort: { sortOrder: string | null, sortOption: string | null },
        limit: number | null = null,

    ): Promise<void> => {

        requestsList.value = <UnwrapRef<Request[]>> await RequestApi.getList({
            ...filters,
            userId,
            limit,
            sortOption: sort.sortOption,
            sortOrder: sort.sortOrder,
        })
    }

    return {
        requestsList,
        loadRequestsList,
    }
}

export const useRequestsListStore = () => <IRequestsListStore> inject(requestsListStoreSymbol)