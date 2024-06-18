import { createAuthStore, authStoreSymbol } from "@/stores/auth";
import { createUserStore, userStoreSymbol } from "@/stores/user";
import { createUsersListStore, usersListStoreSymbol } from "@/stores/usersList";
import { createProjectStore, projectStoreSymbol } from "@/stores/project";
import { createProjectsListStore, projectsListStoreSymbol } from "@/stores/projectsList";
import { createInvestorStore, investorStoreSymbol } from "@/stores/investor";
import { createInvestorsListStore, investorsListStoreSymbol } from "@/stores/investorsList";
import { createRequestStore, requestStoreSymbol } from "@/stores/request";
import { createRequestsListStore, requestsListStoreSymbol } from "@/stores/requestsList";
import { createModalStore, modalStoreSymbol } from "@/stores/modal";
import { createSortStore, sortStoreSymbol } from "@/stores/sort";
import { createFilterStore, filterStoreSymbol } from "@/stores/filter";

export const composableStores = [
    { key: authStoreSymbol, value: createAuthStore() },
    { key: userStoreSymbol, value: createUserStore() },
    { key: usersListStoreSymbol, value: createUsersListStore() },
    { key: projectStoreSymbol, value: createProjectStore() },
    { key: projectsListStoreSymbol, value: createProjectsListStore() },
    { key: investorStoreSymbol, value: createInvestorStore() },
    { key: investorsListStoreSymbol, value: createInvestorsListStore() },
    { key: requestStoreSymbol, value: createRequestStore() },
    { key: requestsListStoreSymbol, value: createRequestsListStore() },
    { key: modalStoreSymbol, value: createModalStore() },
    { key: sortStoreSymbol, value: createSortStore() },
    { key: filterStoreSymbol, value: createFilterStore() },
]