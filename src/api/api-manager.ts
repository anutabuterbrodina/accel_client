import axios from "axios";
import type { AxiosRequestConfig, AxiosHeaders, AxiosError } from "axios";

export class ApiManager {

    protected static readonly _baseUrl = '/api'

    protected static formURL(resource: string, resourceGroup?: string): string {
        return resourceGroup
            ? this._baseUrl + '/' + resourceGroup + '/' + resource
            : this._baseUrl + '/' + resource
    }

    protected static clearParams(params: Object): Object {
        const removeEmpty = obj => Object.entries(obj).filter(([, v]) => v != null && v !== '').reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
        return removeEmpty(params)
    }

    private static setHeaders(config: AxiosRequestConfig) {
        config.headers = {}

        if ( !config.headers["Access-Control-Allow-Origin"] )
            config.headers["Access-Control-Allow-Origin"] = "*"

        if ( !config.headers["Accept"] )
            config.headers["Accept"] = "application/json"

    }

    private static async sendRequest(config: AxiosRequestConfig) {
        console.log(config)
        // return
        try {
            const axiosResponse = await axios.request(config)

            console.log(axiosResponse)
            return axiosResponse.data

        } catch (e: AxiosError) {
            console.log(e)
            console.log(e.message)
        }
    }

    protected static async get(url: string, params: { [P: string]: any }): Promise<any> {
        const config: AxiosRequestConfig = { method: 'GET', url, params }

        this.setHeaders(config)

        return await this.sendRequest(config)
    }

    protected static async post(url: string, data: { [P: string]: any }): Promise<any> {
        const config: AxiosRequestConfig = { method: 'POST', url, data }

        this.setHeaders(config)

        return await this.sendRequest(config)
    }
}