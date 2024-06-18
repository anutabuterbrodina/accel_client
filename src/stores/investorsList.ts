import { inject } from "@vue/runtime-core";
import { ref } from "vue";
import type { Ref, UnwrapRef, InjectionKey } from "vue";
import { Investor } from "@/core/entities/investor/investor";
import { InvestorApi } from "@/api/investor.api";
import type { IInvestorsFilters } from "@/core/helpers/investors-filters.interface";

interface IInvestorsListStore {
    investorsList: Ref<Investor[]>,
    loadInvestorsList: (
        filters: IInvestorsFilters,
        userId?: string | null,
        nameSearchString?: string | null,
        sort?: { sortOrder: string | null, sortOption: string | null },
        limit?: number | null,
    ) => Promise<void>,
}

export const investorsListStoreSymbol = <InjectionKey<string>> Symbol('investorsListStore')

export const createInvestorsListStore = () => {
    const investorsList = ref<Investor[]>([])

    const loadInvestorsList = async (
        filters: IInvestorsFilters,
        userId: string | null = null,
        nameSearchString: string | null = null,
        sort: { sortOrder: string | null, sortOption: string | null },
        limit: number | null = null,

    ): Promise<void> => {

        investorsList.value = <UnwrapRef<Investor[]>> await InvestorApi.getList({
            ...filters,
            userId,
            nameSearchString,
            limit,
            sortOption: sort.sortOption,
            sortOrder: sort.sortOrder,
        })
    }

    return { investorsList, loadInvestorsList }
}

export const useInvestorsListStore = () => <IInvestorsListStore> inject(investorsListStoreSymbol)