import { inject } from "@vue/runtime-core";
import { reactive } from "vue";
import type { UnwrapNestedRefs, InjectionKey } from "vue";
import { Investor } from "@/core/entities/investor/investor";
import { InvestorApi } from "@/api/investor.api";
import { Requisites } from "@/core/entities/investor/requisites";

interface IInvestorStore {
    investor: UnwrapNestedRefs<Investor>,
    loadInvestor: (investorId: string) => Promise<void>,
    refreshStore: () => Promise<void>,
}

export const investorStoreSymbol = <InjectionKey<string>> Symbol('investorStore')

export const createInvestorStore = () => {
    const investor = reactive( new Investor(
        new Requisites(),
        '',
        '',
        [],
        null,
        null,
        null,
        null,
        null,
    ))

    const loadInvestor = async (investorId: string) => {
        const result = await InvestorApi.getSingle(investorId)
        investor.requisites = result.requisites
        investor.name = result.name
        investor.description = result.description
        investor.interests = result.interests
        investor.id = result.id
        investor.members = result.members
        investor.isActive = result.isActive
        investor.type = result.type
        investor.createdAt = result.createdAt
    }

    const refreshStore = async () => {
        investor.requisites = new Requisites()
        investor.name = ''
        investor.description = ''
        investor.interests = []
        investor.id = null
        investor.members = null
        investor.isActive = null
        investor.type = null
        investor.createdAt = null
    }

    return {
        investor,
        loadInvestor,
        refreshStore,
    }
}

export const useInvestorStore = () => <IInvestorStore> inject(investorStoreSymbol)