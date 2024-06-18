import type { IProjectsListRequest } from "@/api/project/projects-list-request.interface";
import { Constants } from "@/core/static/constants";

export class ProjectFiltersFormatter {

    static format(projectFilters: IProjectsListRequest): IProjectsListRequest {
        const formattedFilters: IProjectsListRequest = { ...projectFilters }

        const sorting = Constants.SORT_OPTIONS.find(option => option.name === projectFilters.sortOption)
        formattedFilters.sortOption = formattedFilters.sortOption ? sorting.value : null
        formattedFilters.sortOrder = formattedFilters.sortOption ? sorting.order : null

        return formattedFilters
    }
}