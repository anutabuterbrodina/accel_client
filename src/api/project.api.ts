import { Project } from "@/core/entities/project";
import { ApiManager } from "@/api/api-manager";

export class ProjectApi extends ApiManager {
    public RESOURCE_GROUP: string = 'projects'

    public async getSingle(params): Promise<Project> {

        const result = await this.get( this.formURL(), {
            params: { ...params }
        })

        return new Project(
            result.id,
            result.name,
            result.description,
            result.tags,
            result.investmentMin,
            result.investmentMax,
            result.createdAt,
            result.contact,
            result.membersList,
        )
    }

    public async getList(params): Promise<Project[]> {
        const result = <[any]> await this.get( this.formURL(), {
            params: { ...this.clearParams(params) }
        })

        return result.map(item => new Project(
            item.id,
            item.name,
            item.description,
            item.tagsList,
            item.investmentMin,
            item.investmentMax,
            item.createdAt,
            item.membersList,
        )) || []
    }
}