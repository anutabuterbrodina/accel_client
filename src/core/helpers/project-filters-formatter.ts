import type { IProjectFilters } from "@/api/project/project-filters.interface";
import { Constants } from "@/core/static/constants";

export class ProjectFiltersFormatter {

    static format(projectFilters: IProjectFilters): IProjectFilters {
        const formattedFilters: IProjectFilters = { ...projectFilters }

        const sorting = Constants.SORT_OPTIONS.find(option => option.name === projectFilters.sortOption)
        formattedFilters.sortOption = formattedFilters.sortOption ? sorting.value : null
        formattedFilters.sortOrder = formattedFilters.sortOption ? sorting.order : null

        return formattedFilters
    }
}