import { inject } from "@vue/runtime-core";
import type { InjectionKey, UnwrapNestedRefs } from "vue";
import { reactive } from "vue";
import { Request } from "@/core/entities/request/request";
import { ERequestTypes } from "@/core/entities/request/request-types.enum";
import { RequestApi } from "@/api/request/request.api";

interface IRequestStore {
    request: UnwrapNestedRefs<Request>,
    loadRequest: (requestId: string) => Promise<void>
    refreshStore: () => Promise<void>
}

export const requestStoreSymbol = <InjectionKey<string>> Symbol('requestStore')

export const createRequestStore = () => {
    const request = reactive<Request>(new Request(
        ERequestTypes.UNKNOWN,
        '',
        '',
        '',
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
    ))

    const loadRequest = async (requestId: string) => {
        const result = await RequestApi.getSingle(requestId)
        request.type = result.type
        request.creatorId = result.creatorId
        request.contactEmail = result.contactEmail
        request.comment = result.comment
        request.content = result.content
        request.rejectReason = result.rejectReason
        request.rejectMessage = result.rejectMessage
        request.id = result.id
        request.status = result.status
        request.projectId = result.projectId
        request.investorId = result.investorId
        request.createdAt = result.createdAt
    }

    const refreshStore = async () => {
        request.type = ERequestTypes.UNKNOWN
        request.creatorId = ''
        request.contactEmail = ''
        request.comment = ''
        request.content = null
        request.rejectReason = null
        request.rejectMessage = null
        request.id = null
        request.status = null
        request.projectId = null
        request.investorId = null
        request.createdAt = null
    }

    return {
        request,
        loadRequest,
        refreshStore,
    }
}

export const useRequestStore = () => <IRequestStore> inject(requestStoreSymbol)