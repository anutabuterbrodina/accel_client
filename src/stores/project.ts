import { inject } from "@vue/runtime-core";
import { computed, reactive, ref } from "vue";
import type { InjectionKey } from "vue";
import { ProjectApi } from "@/api/project.api";
import { Project } from "@/core/entities/project";

export const projectStoreSymbol = <InjectionKey<string>> Symbol('projectStore')

export const createProjectStore = () => {
    const projectApi = new ProjectApi();

    const projectList = ref<Project[]>([])
    const project = reactive({
        name: null,
        description: null,
        investmentMin: null,
        investmentMax: null,
        tags: [],
    })

    const isListEmpty = ref(false)

    const loadProjectsList = async (filter, userId: string) => {
        try {
            projectList.value = await projectApi.getList( { ...filter, userId })
        } catch (e) {
            isListEmpty.value = true
        }
    }

    const loadProject = async (filter) => {
        project = await projectApi.getSingle({})
    }

    return { projectList, loadProjectsList, project, loadProject, isListEmpty }
}

export const useProjectStore = () => inject(projectStoreSymbol)