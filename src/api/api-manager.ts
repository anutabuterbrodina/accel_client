import axios from "axios";
import type AxiosRequestConfig from "axios";

export class ApiManager {
    protected abstract RESOURCE_GROUP: string

    // private _baseUrl = import.meta.env.VITE_API_HOST
    protected _baseUrl = '/api'

    protected formURL(resource?: string): string {
        let url = this._baseUrl + '/' + this.RESOURCE_GROUP

        return resource ? url + '/' + resource : url
    }

    protected clearParams(params: Object): Object {
        const removeEmpty = obj => Object.entries(obj).filter(([, v]) => v != null && v !== '').reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
        return removeEmpty(params)
    }

    protected async get(url: string, config: AxiosRequestConfig): Promise<any> {
        if (!config.headers)
            config.headers = {}

        if ( !config?.headers?.[ "Access-Control-Allow-Origin" ] )
            config.headers["Access-Control-Allow-Origin"] = "*"

        if ( !config?.headers?.[ "Accept" ] )
            config.headers["Accept"] = "application/json"

        try {
            const { data } = await axios.get(url, config)
            return data
        } catch (e) {
            console.log(e)
        }
    }

    protected async post(url: string, config: AxiosRequestConfig): Promise<any> {
        if ( !config?.headers?.[ "Accept" ] )
            config.headers = { Accept: "application/json" }

        try {
            const { data } = await axios.post(url, config)
            return data
        } catch (e) {
            console.log(e)
        }
    }
}