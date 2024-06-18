import { inject } from "@vue/runtime-core";
import { ref } from "vue";
import type { UnwrapRef, Ref, InjectionKey } from "vue";
import { Project } from "@/core/entities/project/project";
import { ProjectApi } from "@/api/project/project.api";
import type { IProjectsFilters } from "@/core/helpers/projects-filters.interface";

interface IProjectsListStore {
    projectsList: Ref<Project[]>,
    loadProjectsList: (
        filters: IProjectsFilters,
        userId?: string | null,
        projectIds?: string[] | null,
        nameSearchString?: string | null,
        sort?: { sortOrder: string | null, sortOption: string | null },
        limit?: number | null,
    ) => Promise<void>,
}

export const projectsListStoreSymbol = <InjectionKey<string>> Symbol('projectsListStore')

export const createProjectsListStore = () => {
    const projectsList = ref<Project[]>([])

    const loadProjectsList = async (
        filters: IProjectsFilters,
        userId: string | null = null,
        projectIds: string[] | null = null,
        nameSearchString: string | null = null,
        sort: { sortOrder: string | null, sortOption: string | null },
        limit: number | null = null,

    ): Promise<void> => {

        projectsList.value = <UnwrapRef<Project[]>> await ProjectApi.getList({
            ...filters,
            userId,
            projectIds,
            nameSearchString,
            limit,
            sortOption: sort.sortOption,
            sortOrder: sort.sortOrder,
        })
    }

    return { projectsList, loadProjectsList }
}

export const useProjectsListStore = () => <IProjectsListStore> inject(projectsListStoreSymbol)