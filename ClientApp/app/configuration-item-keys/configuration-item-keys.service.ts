import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConfigurationItemKey } from "./configuration-item-key.model";
import { Observable } from "rxjs/Observable";
import { ErrorService } from "../shared/services/error.service";

@Injectable()
export class ConfigurationItemKeysService {
    constructor(
        private _errorService: ErrorService,
        private _httpClient: HttpClient)
    { }

    public addOrUpdate(options: { configurationItemKey: ConfigurationItemKey, correlationId: string }) {
        return this._httpClient
            .post(`${this._baseUrl}/api/configurationItemKeys/add`, options)
            .catch(this._errorService.catchErrorResponse);
    }

    public get(): Observable<{ configurationItemKeys: Array<ConfigurationItemKey> }> {
        return this._httpClient
            .get<{ configurationItemKeys: Array<ConfigurationItemKey> }>(`${this._baseUrl}/api/configurationItemKeys/get`)
            .catch(this._errorService.catchErrorResponse);
    }

    public getById(options: { id: number }): Observable<{ configurationItemKey:ConfigurationItemKey}> {
        return this._httpClient
            .get<{configurationItemKey: ConfigurationItemKey}>(`${this._baseUrl}/api/configurationItemKeys/getById?id=${options.id}`)
            .catch(this._errorService.catchErrorResponse);
    }

    public remove(options: { configurationItemKey: ConfigurationItemKey, correlationId: string }) {
        return this._httpClient
            .delete(`${this._baseUrl}/api/configurationItemKeys/remove?id=${options.configurationItemKey.id}&correlationId=${options.correlationId}`)
            .catch(this._errorService.catchErrorResponse);
    }

    public get _baseUrl() { return ""; }
}
