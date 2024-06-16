import { inject } from "@vue/runtime-core";
import { computed, reactive, ref } from "vue";
import type { InjectionKey } from "vue";
import { Investor } from "@/core/entities/investor/investor";
import { InvestorApi } from "@/api/investor.api";

export const investorsListStoreSymbol = <InjectionKey<string>> Symbol('investorsListStore')

export const createInvestorsListStore = () => {
    const investorApi = new InvestorApi();

    const investorsList = ref<Investor[]>([])

    const loadInvestorsList = async (filter, userId: string) => {
        try {
            investorsList.value = await investorApi.getList( { ...filter, userId })
        } catch (e) {
        }
    }

    return { investorsList, loadInvestorsList  }
}

export const useInvestorsListStore = () => inject(investorsListStoreSymbol)