import { inject } from "@vue/runtime-core";
import { computed, reactive, ref } from "vue";
import type { InjectionKey } from "vue";
import { Investor } from "@/core/entities/investor";
import { InvestorApi } from "@/api/investor.api";

export const investorStoreSymbol = <InjectionKey<string>> Symbol('investorStore')

export const createInvestorStore = () => {
    const investorApi = new InvestorApi();

    const investorsList = ref<Investor[]>([])
    let investor = reactive<Investor|null>(null)

    const isListEmpty = ref(false)

    const loadInvestorsList = async (filter, userId: string) => {
        try {
            investorsList.value = await investorApi.getList( { ...filter, userId })
        } catch (e) {
            isListEmpty.value = true
        }
    }

    const loadInvestor = async () => {
        investor = reactive(await investorApi.getSingle({}))
    }

    return { investorsList, loadInvestorsList, investor, loadInvestor, isListEmpty }
}

export const useInvestorStore = () => inject(investorStoreSymbol)