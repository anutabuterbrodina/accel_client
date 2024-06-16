import { ApiManager } from "@/api/api-manager";
import { Request } from "@/core/entities/request/request";
import type { IRegisterProjectRequest } from "@/api/request/register-project-request.interface";
import type { IRegisterInvestorRequest } from "@/api/request/register-investor-request.interface";
import type { IChangeProjectBusinessDataRequest } from "@/api/request/change-project-business-data-request.interface";
import type { IChangeInvestorRequisitesRequest } from "@/api/request/change-investor-requisites-request.interface";
import type { IRequest } from "@/api/request/request.interface";
import type { IRequestListItem } from "@/api/request/request-list-item.interface";
import type { IRejectRequest } from "@/api/request/reject-request.interface";

export class RequestApi extends ApiManager {

    public static async getSingle(requestId: string): Promise<IRequest> {
        const url = this.formURL('', 'request')
        const params = { requestId }
        try {
            const result: IRequest = await this.get(url, params)

            return result;
        } catch (e) {
            console.log('Не удалось загрузить заявку')
        }
    }

    public static async getList(filters): Promise<Request[]> {
        const url = this.formURL('', 'requests')
        const params = this.clearParams(filters)

        const result: IRequestListItem[] = await this.get(url, params)

        try {
            return result.map(item => new Request(
                item.type,
                item.creatorId,
                item.creatorEmail,
                '',
                null,
                item.rejectReason || null,
                item.rejectMessage || null,
                item.id,
                item.status,
                item.projectId || null,
                item.investorId || null,
                item.createAt,
            ))
        } catch (e) {
            return []
        }
    }

    public static async createRegisterProjectRequest(data: IRegisterProjectRequest): Promise<void> {
        const url = this.formURL('register-project', 'requests')

        try {
            const result = await this.post(url, data)
        } catch (e) {
            alert('Не удалось сформировать создать заявку на регистрацию проекта')
        }
    }

    public static async createRegisterInvestorRequest(data: IRegisterInvestorRequest) {
        const url = this.formURL('register-investor', 'requests')
        try {
            const result = await this.post(url, data)
        } catch (e) {
            alert('Не удалось сформировать создать заявку на регистрацию инвестора')
        }
    }

    public static async createChangeProjectBusinessData(data: IChangeProjectBusinessDataRequest) {
        const url = this.formURL('edit-project-business-data', 'requests')

        try {
            const result = await this.post(url, data)
        } catch (e) {
            alert('Не удалось сформировать создать заявку на изменение бизнес-данных проекта')
        }
    }

    public static async createChangeInvestorRequisites(data: IChangeInvestorRequisitesRequest) {
        const url = this.formURL('edit-investor-requisites', 'requests')

        try {
            const result = await this.post(url, data)
        } catch (e) {
            alert('Не удалось сформировать создать заявку на изменение реквизитов инвестора')
        }
    }

    public static async accept(requestId: string, userId: string) {
        const url = this.formURL('accept', 'request')
        const data = { requestId, userId }

        try {
            const result = await this.post(url, data)
        } catch (e) {
            alert('Не удалось принять заявку')
        }
    }

    public static async reject(userId: string, request: Request) {
        if (!request.id || !request.rejectReason) {
            alert('Не удалось отклонить')
            return
        }
        const url = this.formURL('reject', 'request')
        const data: IRejectRequest = {
            userId,
            requestId: request.id,
            rejectReason: request.rejectReason,
            rejectMessage: request.rejectMessage || '',
        }

        try {
            const result = await this.post(url, data)
        } catch (e) {
            alert('Не удалось отклонить. Проблема бэка')
        }
    }
}