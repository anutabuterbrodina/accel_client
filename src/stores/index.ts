import { createModalStore, modalStoreSymbol } from "@/stores/modal";
import { createProjectStore, projectStoreSymbol } from "@/stores/project";
import { createFilterStore, filterStoreSymbol } from "@/stores/filter";
import { createInvestorStore, investorStoreSymbol } from "@/stores/investor";

export const composableStores = [
    { key: modalStoreSymbol, value: createModalStore() },
    { key: filterStoreSymbol, value: createFilterStore() },
    { key: projectStoreSymbol, value: createProjectStore() },
    { key: investorStoreSymbol, value: createInvestorStore() },
]