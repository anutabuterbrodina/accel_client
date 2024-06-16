import { inject } from "@vue/runtime-core";
import { reactive } from "vue";
import type { UnwrapNestedRefs, InjectionKey } from "vue";
import { Project } from "@/core/entities/project";
import { ProjectApi } from "@/api/project/project.api";

interface IProjectStore {
    project: UnwrapNestedRefs<Project>,
    refreshStore: (projectId?: string) => Promise<void>,
}

export const projectStoreSymbol = <InjectionKey<string>> Symbol('projectStore')

export const createProjectStore = () => {
    const project = reactive( new Project(
        '',
        '',
        <number> null,
        <number> null,
        [],
    ))

    const refreshStore = async (projectId) => {

    }

    return { project, refreshStore }
}

export const useProjectStore = () => <IProjectStore> inject(projectStoreSymbol)