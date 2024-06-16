import { EProjectStatuses } from "@/core/entities/project/project-statuses.enum";
import { ERequestStatuses } from "@/core/entities/request/request-statuses.enum";
import { ERequestTypes } from "@/core/entities/request/request-types.enum";
import { Project } from "@/core/entities/project";
import { ERequestRejectReasons } from "@/core/entities/request/request-reject-reasons.enum";

export class Constants {

    /** TAGS */

    private static readonly TAGS = [
        { name: 'Домашние животные' },
        { name: 'Здоровье и медицина' },
        { name: 'Информационный технологии IT' },
        { name: 'Красота и уход за собой' },
        { name: 'Машиностроение' },
        { name: 'Пищевая промышленность' },
        { name: 'Сельсхое хозяйство' },
        { name: 'Строительство' },
        { name: 'Уход за детьми' },
    ]

    public static getTagsNames(): string[] {
        return this.TAGS.map(tag => tag.name)
    }


    /** INVESTMENTS */

    private static readonly INVESTMENTS = [
        { value: 100000 },
        { value: 500000 },
        { value: 1000000 },
        { value: 5000000 },
        { value: 10000000 },
    ]

    public static getInvestmentsValues(): number[] {
        return this.INVESTMENTS.map(investment => investment.value)
    }


    /** PROJECT_STATUSES */

    private static readonly PROJECT_STATUSES = [
        {
            name: 'Активен',
            value: EProjectStatuses.ON_BOARD,
        },
        {
            name: 'На модерации',
            value: EProjectStatuses.ON_MODERATION,
        },
        {
            name: 'В архиве',
            value: EProjectStatuses.ARCHIVED,
        },
    ]

    public static getProjectStatusesNames(): string[] {
        return this.PROJECT_STATUSES.map(status => status.name)
    }


    /** REQUEST_STATUSES */

    public static readonly REQUEST_STATUSES = [
        {
            name: 'Принята',
            value: ERequestStatuses.ACCEPTED,
        },
        {
            name: 'На рассмотрении',
            value: ERequestStatuses.ON_MODERATION,
        },
        {
            name: 'Отклонена',
            value: ERequestStatuses.REJECTED,
        },
    ]

    public static getRequestStatusesNames(): string[] {
        return this.REQUEST_STATUSES.map(status => status.name)
    }

    public static getRequestStatusNameByValue(value: ERequestStatuses): string {
        return this.REQUEST_STATUSES.find(status => status.value === value).name
    }


    /** REQUEST_TYPES */

    private static readonly REQUEST_TYPES = [
        {
            name: 'Регистрация проекта',
            value: ERequestTypes.REGISTER_PROJECT,
        },
        {
            name: 'Регистрация инвестора',
            value: ERequestTypes.REGISTER_INVESTOR,
        },
        {
            name: 'Изменение бизнес-данных проекта',
            value: ERequestTypes.CHANGE_PROJECT_BUSINESS_DATA,
        },
        {
            name: 'Изменение реквизитов инвестора',
            value: ERequestTypes.CHANGE_INVESTOR_REQUISITES,
        },
    ]

    public static getRequestTypesNames(): string[] {
        return this.REQUEST_TYPES.map(type => type.name)
    }

    public static getRequestTypeNameByValue(value: ERequestTypes): string {
        return this.REQUEST_TYPES.find(type => type.value === value).name
    }


    /** REQUEST_REJECT_REASONS */

    private static readonly REQUEST_REJECT_REASONS = [
        {
            name: 'p1',
            value: ERequestRejectReasons.P1,
        },
        {
            name: 'p2',
            value: ERequestRejectReasons.P2,
        },
        {
            name: 'p3',
            value: ERequestRejectReasons.P3,
        },
        {
            name: 'p4',
            value: ERequestRejectReasons.P4,
        },
        {
            name: 'p5',
            value: ERequestRejectReasons.P5,
        },
    ]

    public static getRequestRejectReasonsNames(): string[] {
        return this.REQUEST_REJECT_REASONS.map(reason => reason.name)
    }



    /** SORT_OPTIONS */

    public static readonly SORT_OPTIONS = [
        {
            name: 'По умолчанию',
            value: null,
            order: null,
            entities: ['*'],
        },
        {
            name: 'Сначала новые',
            value: 'createdAt',
            order: 'DESC',
            entities: ['*'],
        },
        {
            name: 'Сначала старые',
            value: 'createdAt',
            order: 'ASC',
            entities: ['*'],
        },
        {
            name: 'Сначала старые',
            value: 'createdAt',
            order: 'ASC',
            entities: ['*'],
        },
        {
            name: 'Размер инвестиций возр.',
            value: 'investmentMin',
            order: 'ASC',
            entities: [Project.name],
        },
        {
            name: 'Размер инвестиций уб.',
            value: 'investmentMax',
            order: 'DESC',
            entities: [Project.name],
        },
    ]

    public static getSortOptionNames(entityName: string): string[] {
        return this.SORT_OPTIONS
            .filter(option => option.entities.includes(entityName) || option.entities.includes('*'))
            .map(option => option.name)
    }

}