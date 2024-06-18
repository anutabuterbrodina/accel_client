import { Constants } from "@/core/static/constants";

interface ISort {
    sortOption: string,
    sortOrder: string
}

export class Sorter {

    public static getSortByValue(haystack) {

    }

    public static getSortByName(name: string): ISort {
        const sort = Constants.SORT_OPTIONS.find(sort => sort.name === name)

        return {
            sortOption: sort.value,
            sortOrder: sort.order,
        }
    }

    public static getOptionsNamesByValue() {

    }
}