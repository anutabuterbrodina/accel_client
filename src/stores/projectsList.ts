import { inject } from "@vue/runtime-core";
import { reactive, ref, toRaw,  } from "vue";
import type { UnwrapRef, UnwrapNestedRefs, Ref, InjectionKey } from "vue";
import { Project } from "@/core/entities/project";
import { ProjectApi } from "@/api/project/project.api";
import type { IProjectFilters } from "@/api/project/project-filters.interface";
import { ProjectFiltersFormatter } from "@/core/helpers/project-filters-formatter";

interface IProjectsListStore {
    projectsList: Ref<Project[]>,
    projectsFilters: UnwrapNestedRefs<IProjectFilters>,
    refreshStore: (userId: string | null, projectIds?: string[] | null) => Promise<void>,
}

export const projectsListStoreSymbol = <InjectionKey<string>> Symbol('projectsListStore')

export const createProjectsListStore = () => {
    const projectsList = ref<Project[]>([])

    const projectsFilters = reactive<IProjectFilters>({
        userId: null,
        limit: null,
        tags: null,
        nameSearchString: null,
        investmentMin: null,
        investmentMax: null,
        sortOption: 'По умолчанию',
        sortOrder: null,
    })

    const refreshStore = async (userId: string | null = null, projectIds: string[] | null = null): Promise<void> => {
        projectsFilters.userId = userId || projectsFilters.userId

        projectsList.value = <UnwrapRef<Project[]>> await ProjectApi.getList(
            ProjectFiltersFormatter.format( <IProjectFilters>{ ...projectsFilters } ),
            projectIds,
        )
    }


    return { projectsList, projectsFilters, refreshStore }
}

export const useProjectsListStore = () => <IProjectsListStore> inject(projectsListStoreSymbol)