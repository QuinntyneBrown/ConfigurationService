import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConfigurationItem } from "./configuration-item.model";
import { Observable } from "rxjs/Observable";
import { ErrorService } from "../shared/services/error.service";

@Injectable()
export class ConfigurationItemsService {
    constructor(
        private _errorService: ErrorService,
        private _httpClient: HttpClient)
    { }

    public addOrUpdate(options: { configurationItem: ConfigurationItem, correlationId: string }) {
        return this._httpClient
            .post(`${this._baseUrl}/api/configurationItems/add`, options)
            .catch(this._errorService.catchErrorResponse);
    }

    public get(): Observable<{ configurationItems: Array<ConfigurationItem> }> {
        return this._httpClient
            .get<{ configurationItems: Array<ConfigurationItem> }>(`${this._baseUrl}/api/configurationItems/get`)
            .catch(this._errorService.catchErrorResponse);
    }

    public getById(options: { id: number }): Observable<{ configurationItem:ConfigurationItem}> {
        return this._httpClient
            .get<{configurationItem: ConfigurationItem}>(`${this._baseUrl}/api/configurationItems/getById?id=${options.id}`)
            .catch(this._errorService.catchErrorResponse);
    }

    public remove(options: { configurationItem: ConfigurationItem, correlationId: string }) {
        return this._httpClient
            .delete(`${this._baseUrl}/api/configurationItems/remove?id=${options.configurationItem.id}&correlationId=${options.correlationId}`)
            .catch(this._errorService.catchErrorResponse);
    }

    public get _baseUrl() { return ""; }
}
