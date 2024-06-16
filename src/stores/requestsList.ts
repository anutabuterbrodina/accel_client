import { inject } from "@vue/runtime-core";
import { reactive, ref } from "vue";
import type { Ref, UnwrapNestedRefs, UnwrapRef } from "vue";
import type { InjectionKey } from "vue";
import { Request } from "@/core/entities/request/request";
import { RequestApi } from "@/api/request/request.api";
import type { IRequestFilters } from "@/api/request/request-filters.interface";
import { RequestFiltersFormatter } from "@/core/helpers/request-filters-formatter";

interface IRequestsListStore {
    requestsList: Ref<Request[]>,
    requestsFilters: UnwrapNestedRefs<IRequestFilters>,
    refreshStore: (userId: string | null) => Promise<void>
}

export const requestsListStoreSymbol = <InjectionKey<string>> Symbol('requestsListStore')

export const createRequestsListStore = () => {
    const requestsList = ref<Request[]>([])

    const requestsFilters = reactive<IRequestFilters>({
        limit: null,
        statuses: null,
        userId: null,
        projectId: null,
        investorId: null,
        sortOption: 'По умолчанию',
        sortOrder: null,
    })

    const refreshStore = async (userId: string | null = null): Promise<void> => {
        requestsFilters.userId = userId || requestsFilters.userId

        requestsList.value = <UnwrapRef<Request[]>> await RequestApi.getList(
            RequestFiltersFormatter.format( <IRequestFilters>{ ...requestsFilters } )
        )
    }

    return {
        requestsList,
        requestsFilters,
        refreshStore,
    }
}

export const useRequestsListStore = () => <IRequestsListStore> inject(requestsListStoreSymbol)