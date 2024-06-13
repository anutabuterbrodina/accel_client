import { inject } from "@vue/runtime-core";
import { computed, reactive, ref, toRefs } from "vue";
import type { InjectionKey } from "vue";

export const filterStoreSymbol = <InjectionKey<string>> Symbol('filterStore')

export const createFilterStore = () => {
    const baseSortOption = 'По умолчанию'
    const sortOptions = [baseSortOption, 'Сначала новые', 'Сначала старые']
    const investments = [ 100000, 500000, 1000000, 5000000, 10000000 ]
    const tags = [
        'Домашние животные',
        'Здоровье и медицина',
        'Информационный технологии IT',
        'Красота и уход за собой',
        'Машиностроение',
        'Пищевая промышленность',
        'Сельсхое хозяйство',
        'Строительство',
        "Уход за детьми",
    ]

    const filter = reactive({
        sortOrder: <String> null,
        sortOption: baseSortOption
    })

    const projectFilter = reactive({
        tags: null,
        investmentMin: null,
        investmentMax: null,
        nameSearchString: null,
        ...toRefs(filter)
    })

    const getProjectFilter = () => {
        const newFilter = { ...projectFilter }
        switch (newFilter.sortOption) {
            case baseSortOption:
                newFilter.sortOption = <String> null
                break
            case 'Сначала новые':
                newFilter.sortOption = 'createdAt'
                newFilter.sortOrder = 'DESC'
                break
            case 'Сначала старые':
                newFilter.sortOption = 'createdAt'
                newFilter.sortOrder = 'ASC'
                break
            case 'Размер инвестиций возр.':
                newFilter.sortOption = 'investmentMin'
                newFilter.sortOrder = 'ASC'
                break
            case 'Размер инвестиций уб.':
                newFilter.sortOption = 'investmentMax'
                newFilter.sortOrder = 'DESC'
                break
        }

        return newFilter
    }

    const projectSortOptions = [ ...sortOptions, 'Размер инвестиций возр.', 'Размер инвестиций уб.']





    const investorFilter = reactive({
        tags: null,
        types: null,
        nameSearchString: null,
        ...toRefs(filter)
    })

    const getInvestorFilter = () => {
        const newFilter = { ...investorFilter }
        switch (newFilter.sortOption) {
            case baseSortOption:
                newFilter.sortOption = <String> null
                break
            case 'Сначала новые':
                newFilter.sortOption = 'createdAt'
                newFilter.sortOrder = 'DESC'
                break
            case 'Сначала старые':
                newFilter.sortOption = 'createdAt'
                newFilter.sortOrder = 'ASC'
                break
        }

        return newFilter
    }

    const investorSortOptions = [ ...sortOptions ]
    const investorTypes = ['legal_entity', 'sole_trader', 'individual']


    const requestFilter = reactive({
        statuses: null,
        types: null,
        ...toRefs(filter)
    })

    const getRequestFilter = () => {
        const newFilter = { ...requestFilter }
        switch (newFilter.sortOption) {
            case baseSortOption:
                newFilter.sortOption = <String> null
                break
            case 'Сначала новые':
                newFilter.sortOption = 'createdAt'
                newFilter.sortOrder = 'DESC'
                break
            case 'Сначала старые':
                newFilter.sortOption = 'createdAt'
                newFilter.sortOrder = 'ASC'
                break
        }
        newFilter.types = requestFilter.types?.map( (type) => {
            const el = Object.entries(requestTypes).find((elArr) => elArr[1] === type)
            return el[0]
        }) || null
        newFilter.statuses = requestFilter.statuses?.map( (status) => {
            const el = Object.entries(requestStatuses).find((elArr) => elArr[1] === status)
            return el[0]
        }) || null

        console.log(requestFilter.types)
        console.log(newFilter.types)

        return newFilter
    }

    const requestSortOptions = [ ...sortOptions ]
    const requestTypes = {
        ['register_project']: 'Заявка на создание проекта',
        ['register_investor']: 'Заявка на создание инвестора',
        ['change_project_business_data']: 'Заявка на изменение данных проекта',
        ['change_investor_requisites']: 'Заявка на изменение данных инвестора',
    }
    const requestStatuses = {
        ['rejected']: 'Отклонена',
        ['on_moderation']: 'На модерации',
        ['accepted']: 'Одобрена',
    }

    return {
        projectFilter,
        getProjectFilter,
        projectSortOptions,
        investorFilter,
        getInvestorFilter,
        investorSortOptions,
        investorTypes,
        requestFilter,
        getRequestFilter,
        requestSortOptions,
        tags,
        investments,
        requestTypes,
        requestStatuses,
    }
}

export const useFilterStore = () => inject(filterStoreSymbol)