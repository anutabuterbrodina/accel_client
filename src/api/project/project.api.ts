import { Project } from "@/core/entities/project";
import { ApiManager } from "@/api/api-manager";
import type { IProjectListItem } from "@/api/project/project-list-item.interface";
import type { IProject } from "@/api/project/project.interface";
import type { IProjectFilters } from "@/api/project/project-filters.interface";

export class ProjectApi extends ApiManager {

    public static async getSingle(projectId: string): Promise<Project> {
        const url = this.formURL('', 'project')
        const params = { projectId }

        try {
            const result: IProject = await this.get(url, params)

            return new Project(
                result.name,
                result?.description || '',
                result.investmentMin,
                result.investmentMax,
                result.tagsList,
                result.id,
                result.createdAt,
                result.membersList,
                result.status,
                result.contactId,
            )
        } catch (e) {
            console.log('Не удалось загрузить проект')
        }
    }

    public static async getList(filters: IProjectFilters, projectIds: string[] | null = null): Promise<Project[]> {
        const url = this.formURL('', 'projects')
        const params = this.clearParams(filters)

        if (projectIds) {
            params["projectIds"] = projectIds
        }

        try {
            const result: IProjectListItem[] = await this.get(url, params)

            return result.map(item => new Project(
                item.name,
                item?.description || '',
                item.investmentMin,
                item.investmentMax,
                item.tagsList,
                item.id,
                item.createdAt,
                item.membersList,
            ))

        } catch (e) {
            return []
        }
    }

    public static async getBookmarks(userId: string): Promise<string[]> {
        const url = this.formURL('bookmarks', 'projects')
        const params = { userId }

        try {
            const result: string[] = await this.get(url, params)
            return result
        } catch (e) {
            return []
        }
    }
}