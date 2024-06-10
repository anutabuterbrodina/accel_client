import { inject } from "@vue/runtime-core";
import { computed, reactive, ref, toRefs } from "vue";
import type { InjectionKey } from "vue";

export const filterStoreSymbol = <InjectionKey<string>> Symbol('filterStore')

export const createFilterStore = () => {
    const baseSortOption = 'По умолчанию'
    const sortOptions = [baseSortOption, 'Сначала новые', 'Сначала старые']
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
        nameSearchString: null,
        sortOrder: <String> null,
        sortOption: baseSortOption
    })

    const projectFilter = reactive({
        tags: null,
        investmentMin: null,
        investmentMax: null,
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

    return {
        projectFilter,
        getProjectFilter,
        projectSortOptions,
        investorFilter,
        getInvestorFilter,
        investorSortOptions,
        investorTypes,
        tags,
    }
}

export const useFilterStore = () => inject(filterStoreSymbol)