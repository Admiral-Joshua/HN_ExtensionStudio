import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ExtensionInfo, ExtensionLanguage } from './models';

@Injectable()
export class ExtensionsService {

    constructor(private http: HttpClient, @Inject("BASE_API_URL") private baseUrl: string) {}

    listMyExtensions() : Observable<ExtensionInfo[]> {
        return this.http.get<ExtensionInfo[]>(`${this.baseUrl}/extensions/list`);
    }

    fetchExtensionInfo(extensionId: number) : Observable<ExtensionInfo> {
        return this.http.get<ExtensionInfo>(`${this.baseUrl}/extensions/${extensionId}`);
    }

    createExtension(info: ExtensionInfo) : Observable<ExtensionInfo> {
        return this.http.post<ExtensionInfo>(`${this.baseUrl}/extensions/new`, info);
    }

    updateExtension(info: ExtensionInfo) : Observable<ExtensionInfo> {
        return this.http.put<ExtensionInfo>(`${this.baseUrl}/extensions/${info.extensionId}`, info);
    }

    deleteExtension(extensionId: number) {
        return this.http.delete(`${this.baseUrl}/extensions/${extensionId}`);
    }

    getAvailableLanguages() {
        return this.http.get<ExtensionLanguage[]>(`${this.baseUrl}/extensions/languages`);
    }

}