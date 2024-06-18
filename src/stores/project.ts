import { inject } from "@vue/runtime-core";
import { reactive, ref } from "vue";
import type { Ref, UnwrapNestedRefs, InjectionKey } from "vue";
import { Project } from "@/core/entities/project/project";
import { ProjectApi } from "@/api/project/project.api";

interface IProjectStore {
    project: UnwrapNestedRefs<Project>,
    isBookmark: Ref<boolean>
    loadProject: (projectId: string) => Promise<void>,
    refreshStore: () => Promise<void>,
}

export const projectStoreSymbol = <InjectionKey<string>> Symbol('projectStore')

export const createProjectStore = () => {
    const isBookmark = ref(false)

    const project = reactive( new Project(
        '',
        '',
        <number> null,
        <number> null,
        [],
        null,
        null,
        null,
        null,
        null,
        null,
    ))

    const loadProject = async (projectId: string) => {
        const result = await ProjectApi.getSingle(projectId)
        project.name = result.name
        project.description = result.description || ''
        project.investmentMin = result.investmentMin
        project.investmentMax = result.investmentMax
        project.tags = result.tagsList
        project.members = result.membersList
        project.id = result.id
        project.status = result.status
        project.contactId = result.contactId
        project.createdAt = result.createdAt
        project.ownerId = result.ownerId
    }

    const refreshStore = async () => {
        project.name = ''
        project.description = ''
        project.investmentMin = <number> null
        project.investmentMax = <number> null
        project.tags = []
        project.members = []
        project.id = null
        project.status = null
        project.contactId = null
        project.createdAt = null
        project.createdAt = null
    }

    return { project, loadProject, refreshStore, isBookmark }
}

export const useProjectStore = () => <IProjectStore> inject(projectStoreSymbol)