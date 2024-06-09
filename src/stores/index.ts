import { createBoardStore, modalStoreSymbol } from "@/stores/modal";

export const composableStores = [
    { key: modalStoreSymbol, value: createBoardStore() },
]