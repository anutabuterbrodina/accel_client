import { inject } from "@vue/runtime-core";
import { reactive } from "vue";
import type { UnwrapNestedRefs, InjectionKey } from "vue";

interface ISortStore {
    sort: UnwrapNestedRefs<ISort>
    refreshStore: () => void,
}

interface ISort {
    sortOption: string | null
    sortOrder: string | null
}

export const sortStoreSymbol = <InjectionKey<string>> Symbol('sortStore')

export const createSortStore = () => {
    const sort = reactive({
        sortOption: null,
        sortOrder: null,
    })

    const refreshStore = () => {
        sort.sortOption = null
        sort.sortOrder = null
    }

    return { sort, refreshStore }
}

export const useSortStore = () => <ISortStore> inject(sortStoreSymbol)