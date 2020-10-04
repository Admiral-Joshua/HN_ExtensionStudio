import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { HN_CompNode, HN_Port, HN_CompFile, HN_FileTemplate } from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class NodesService {

    constructor(private http: HttpClient, @Inject("BASE_API_URL") private baseUrl: string) { }

    getAllNodes(extensionId: number) {
        return this.http.get<HN_CompNode[]>(`${this.baseUrl}/nodes/list`, { withCredentials: true });
    }
    getAllPorts() {
        return this.http.get<HN_Port[]>(`${this.baseUrl}/nodes/ports/all`, { withCredentials: true });
    }

    getNodeInfo(nodeId: number) {
        return this.http.get<HN_CompNode>(`${this.baseUrl}/nodes/${nodeId}`, { withCredentials: true });
    }

    updateNodeInfo(nodeId: number, node: HN_CompNode) {
        return this.http.put<HN_CompNode>(`${this.baseUrl}/nodes/${nodeId}`, node, { withCredentials: true });
    }

    createNewNode(node: HN_CompNode) {
        return this.http.post<HN_CompNode>(`${this.baseUrl}/nodes/new`, node, { withCredentials: true });
    }

    deleteNode(nodeId: number) {
        return this.http.delete(`${this.baseUrl}/nodes/${nodeId}`, { withCredentials: true });
    }

    // Files API
    getTemplateList(): Observable<HN_FileTemplate[]> {
        return this.http.get<HN_FileTemplate[]>(`${this.baseUrl}/nodes/files/templates/list`, { withCredentials: true });
    }

    getFilesList(nodeId: number): Observable<HN_CompFile[]> {
        return this.http.get<HN_CompFile[]>(`${this.baseUrl}/nodes/files/list/${nodeId}`, { withCredentials: true });
    }

    getAllFiles(): Observable<HN_CompFile[]> {
        return this.http.get<HN_CompFile[]>(`${this.baseUrl}/nodes/files/list/all`, { withCredentials: true });
    }

    mapFile(fileId: number, nodeId: number) {
        return this.http.get(`${this.baseUrl}/nodes/files/map?file=${fileId}&node=${nodeId}`, { withCredentials: true });
    }

    unmapFile(fileId: number, nodeId: number) {
        return this.http.get(`${this.baseUrl}/nodes/files/unmap?file=${fileId}&node=${nodeId}`, { withCredentials: true })
    }

    getFile(fileId: number): Observable<HN_CompFile> {
        return this.http.get<HN_CompFile>(`${this.baseUrl}/nodes/files/${fileId}`, { withCredentials: true });
    }

    createNewFile(file: HN_CompFile): Observable<HN_CompFile> {
        return this.http.post<HN_CompFile>(`${this.baseUrl}/nodes/files/new`, file, { withCredentials: true });
    }

    updateFile(fileId: number, file: HN_CompFile): Observable<HN_CompFile> {
        return this.http.put<HN_CompFile>(`${this.baseUrl}/nodes/files/${fileId}`, file, { withCredentials: true });
    }

    deleteFile(fileId: number) {
        return this.http.delete(`${this.baseUrl}/nodes/files/${fileId}`, { withCredentials: true });
    }

}