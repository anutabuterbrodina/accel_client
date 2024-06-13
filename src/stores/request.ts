import { inject } from "@vue/runtime-core";
import { computed, reactive, ref } from "vue";
import type { InjectionKey } from "vue";
import { Request } from "@/core/entities/request";
import { RequestApi } from "@/api/request.api";

export const requestStoreSymbol = <InjectionKey<string>> Symbol('requestStore')

export const createRequestStore = () => {
    const api = new RequestApi();

    const statuses = ['Отклонена', 'На модерации', 'Одобрена']
    const types = ['Заявка на изменение данных проекта', 'Заявка на создание проекта', 'Заявка на создание инвестора', 'Заявка на изменение данных инвестора']

    const requestsList = ref<Request[]>([])
    const request = reactive({
        content: '',
        comment: '',
    })

    const isListEmpty = ref(false)

    const loadRequestsList = async (filter, userId: string) => {
        try {
            requestsList.value = await api.getList( { ...filter, userId })
        } catch (e) {
            isListEmpty.value = true
        }
    }

    const loadRequest = async () => {
        // request.value = await api.getSingle({})
    }

    const createProjectRequest = async (
        userId: string,
        name: string,
        description: string,
        investmentMin: number,
        investmentMax: number,
        tags: string[]
    ) => {
        return api.createProjectRequest(
            userId,
            request.comment,
            name,
            description,
            investmentMin,
            investmentMax,
            tags
        )
    }


    return {
        isListEmpty,
        request,
        createProjectRequest,
        loadRequestsList,
        requestsList,
        statuses,
        types,
    }
}

export const useRequestStore = () => inject(requestStoreSymbol)