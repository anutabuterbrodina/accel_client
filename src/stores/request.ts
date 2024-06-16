import { inject } from "@vue/runtime-core";
import type { InjectionKey, UnwrapNestedRefs } from "vue";
import { reactive } from "vue";
import { Request } from "@/core/entities/request/request";
import { ERequestTypes } from "@/core/entities/request/request-types.enum";
import { RequestApi } from "@/api/request/request.api";

interface IRequestStore {
    request: UnwrapNestedRefs<Request>,
    refreshStore: (requestId: string) => Promise<void>
}

export const requestStoreSymbol = <InjectionKey<string>> Symbol('requestStore')

export const createRequestStore = () => {
    const request = reactive<Request>({})

    const refreshStore = async (requestId: string) => {
        RequestApi.getSingle(requestId).then(
            (result) => {
                request.type = result.type
                request.creatorId = result.creatorId
                request.contactEmail = result.contactEmail
                request.comment = result.creatorComment
                request.content = result.requestContent
                request.rejectReason = result.rejectReason || null
                request.rejectMessage = result.rejectMessage || null
                request.id = result.id
                request.status = result.status
                request.projectId = result.projectId || null
                request.investorId = result.investorId || null
                request.createdAt = result.createdAt
            }
        )
    }

    return {
        request,
        refreshStore,
    }
}

export const useRequestStore = () => <IRequestStore> inject(requestStoreSymbol)