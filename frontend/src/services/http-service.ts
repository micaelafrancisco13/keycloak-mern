import apiClient from "./api-client.ts";
import { AxiosResponse } from "axios";

interface Entity {
    _id?: string;
}

class HttpService {
    constructor(endpoint: string) {
        this._endpoint = endpoint;
    }

    private _endpoint: string;

    set endpoint(value: string) {
        this._endpoint = value;
    }

    getAll<T>() {
        const controller = new AbortController();
        const response = apiClient.get<T[]>(this._endpoint, {
            signal: controller.signal,
        });
        return { response, cancel: () => controller.abort() };
    }

    getOne<T>(id?: string | undefined) {
        if (id !== "new") {
            const controller = new AbortController();
            const endpoint = id ? this._endpoint + "/" + id : this._endpoint;
            const response = apiClient.get<T>(endpoint, {
                signal: controller.signal,
            });
            return { response, cancel: () => controller.abort() };
        }
    }

    delete(id: string) {
        return apiClient.delete(this._endpoint + "/" + id);
    }

    create<T>(entity: T) {
        return apiClient.post(this._endpoint, entity);
    }

    upload<T>(formData: FormData): Promise<AxiosResponse<T>> {
        return apiClient.post(this._endpoint, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Cache-Control": "no-cache",
            },
        });
    }

    update<T extends Entity>(entity: T) {
        const { _id, ...newEntity } = entity;
        return apiClient.put(this._endpoint + "/" + _id, newEntity);
    }
}

function create(endpoint: string) {
    return new HttpService(endpoint);
}

export default create;
