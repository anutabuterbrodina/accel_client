import { inject } from "@vue/runtime-core";
import { reactive, ref } from "vue";
import type { Ref, InjectionKey } from "vue";
import type { IProjectsFilters } from "@/core/helpers/projects-filters.interface";
import type { IRequestsFilters } from "@/core/helpers/requests-filters.interface";
import type { IInvestorsFilters } from "@/core/helpers/investors-filters.interface";

interface IFilterStore {
    searchQuery: Ref<string|null>
    limit: Ref<number|null>
    projectsFilters: IProjectsFilters,
    investorsFilters: IInvestorsFilters,
    requestsFilters: IRequestsFilters,
    refreshStore: () => void,
}

export const filterStoreSymbol = <InjectionKey<string>> Symbol('filterStore')

export const createFilterStore = () => {
    const searchQuery = ref(null)
    const limit = ref(null)

    const projectsFilters = reactive({
        tags: null,
        investmentMin: null,
        investmentMax: null,
    })

    const investorsFilters = reactive({
        interests: null,
        types: null,
    })

    const requestsFilters = reactive({
        statuses: null,
        projectId: null,
        investorId: null,
    })

    const refreshStore = () => {
        searchQuery.value = null

        limit.value = null

        projectsFilters.tags = null
        projectsFilters.investmentMin = null
        projectsFilters.investmentMax = null

        investorsFilters.interests = null
        investorsFilters.types = null

        requestsFilters.statuses = null
        requestsFilters.projectId = null
        requestsFilters.investorId = null
    }

    return {
        searchQuery,
        limit,
        projectsFilters,
        investorsFilters,
        requestsFilters,
        refreshStore
    }
}

export const useFilterStore = () => <IFilterStore> inject(filterStoreSymbol)