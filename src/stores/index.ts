import { createModalStore, modalStoreSymbol } from "@/stores/modal";
import { createProjectStore, projectStoreSymbol } from "@/stores/project";
import { createFilterStore, filterStoreSymbol } from "@/stores/filter";
import { createInvestorStore, investorStoreSymbol } from "@/stores/investor";
import { createUserStore, userStoreSymbol } from "@/stores/user";
import { createRequestStore, requestStoreSymbol } from "@/stores/request";
import { authStoreSymbol, createAuthStore } from "@/stores/auth";

export const composableStores = [
    { key: authStoreSymbol, value: createAuthStore() },
    { key: userStoreSymbol, value: createUserStore() },
    { key: requestStoreSymbol, value: createRequestStore() },
    { key: projectStoreSymbol, value: createProjectStore() },
    { key: investorStoreSymbol, value: createInvestorStore() },
    { key: filterStoreSymbol, value: createFilterStore() },
    { key: modalStoreSymbol, value: createModalStore() },
]