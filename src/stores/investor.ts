import { inject } from "@vue/runtime-core";
import type { InjectionKey, UnwrapNestedRefs } from "vue";
import { reactive } from "vue";
import { Investor } from "@/core/entities/investor/investor";
import { InvestorApi } from "@/api/investor.api";
import { Requisites } from "@/core/entities/investor/requisites";
import { EInvestorTypes } from "@/core/entities/investor/investor-types.interface";

interface IInvestorStore {
    investor: UnwrapNestedRefs<Investor>,
    loadInvestor: (investorId: string) => Promise<void>,
    refreshStore: () => void,
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
        EInvestorTypes.UNKNOWN,
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
        investor.ownerId = result.ownerId
    }

    const refreshStore = () => {
        investor.requisites = new Requisites()
        investor.name = ''
        investor.description = ''
        investor.interests = []
        investor.id = null
        investor.members = null
        investor.isActive = null
        investor.type = EInvestorTypes.UNKNOWN
        investor.createdAt = null
        console.log('Investor store has been refreshed')
    }

    return {
        investor,
        loadInvestor,
        refreshStore,
    }
}

export const useInvestorStore = () => <IInvestorStore> inject(investorStoreSymbol)