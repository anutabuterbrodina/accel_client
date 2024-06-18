import type { IRequestFilters } from "@/api/request/request-list-request.interface";
import { Constants } from "@/core/static/constants";

export class RequestFiltersFormatter {

    static format(requestFilters: IRequestFilters): IRequestFilters {
        const formattedFilters: IRequestFilters = { ...requestFilters }

        const sorting = Constants.SORT_OPTIONS.find(option => option.name === requestFilters.sortOption)
        formattedFilters.sortOption = formattedFilters.sortOption ? sorting.value : null
        formattedFilters.sortOrder = formattedFilters.sortOption ? sorting.order : null

        const statuses = requestFilters.statuses?.map(statusName => {
            return Constants.REQUEST_STATUSES
                .find(status => status.name === statusName)
                ?.value
        }) || []

        formattedFilters.statuses = statuses.length === 0 ? formattedFilters.statuses : statuses

        return formattedFilters
    }
}