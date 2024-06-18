import { Project } from "@/core/entities/project/project";
import { ApiManager } from "@/api/api-manager";
import type { IProjectListItem } from "@/api/project/project-list-item.interface";
import type { IProject } from "@/api/project/project.interface";
import type { IProjectsListRequest } from "@/api/project/projects-list-request.interface";
import type { IEditProjectCommonData } from "@/api/project/edit-project-common-data.interface";

export class ProjectApi extends ApiManager {

    public static async getSingle(projectId: string): Promise<IProject> {
        const url = this.formURL('', 'project')
        const params = { projectId }

        try {
            const result: IProject = await this.get(url, params)

            return result
        } catch (e) {
            console.log('Не удалось загрузить проект')
        }
    }

    public static async getList(rawParams: IProjectsListRequest): Promise<Project[]> {
        const url = this.formURL('', 'projects')
        const params = this.clearParams(rawParams)

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

    public static async addBookmark(userId: string, projectId: string): Promise<string[]> {
        const url = this.formURL('add-bookmark', 'projects')
        const data = { userId, projectId }

        try {
            const result: string[] = await this.post(url, data)

        } catch (e) {
            alert('Не удалось добавить закладку')
        }
    }

    public static async editCommonData(data: IEditProjectCommonData): Promise<void> {
        const url = this.formURL('edit-common-data', 'project')

        try {
            const result = await this.post(url, data)

        } catch (e) {
            alert('Не удалось изменить данные описания проекта')
        }
    }

    public static async archive(projectId: string): Promise<void> {
        const url = this.formURL( 'archive', 'project' )
        const data = { projectId }

        try {
            const result = await this.post( url, data )

        } catch ( e ) {
            alert( 'Не удалось архивировать' )
        }
    }

    public static async unarchive(projectId: string): Promise<void> {
        const url = this.formURL('unarchive', 'project')
        const data = { projectId }

        try {
            const result = await this.post(url, data)

        } catch (e) {
            alert('Не удалось деархивировать')
        }
    }
}