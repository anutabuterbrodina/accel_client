import { Project } from "@/core/entities/project/project";
import { ProjectApi } from "@/api/project/project.api";

export class ProjectService {

    public static async editCommonData(project: Project): Promise<void> {
        if (!project.id) {
            alert('Не установлен ID проекта')
            return
        }
        await ProjectApi.editCommonData( {
                projectId: project.id,
                name: project.name,
                description: project.description,
            } )
    }
}