import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { HN_CompNode, HN_Port } from '../models';

@Injectable()
export class NodesService {

    constructor(private http: HttpClient, @Inject("BASE_API_URL") private baseUrl: string) {}

    getAllNodes(extensionId: number) {
        return this.http.get<HN_CompNode[]>(`${this.baseUrl}/nodes/list`, {withCredentials: true});
    }
    getAllPorts() {
        return this.http.get<HN_Port[]>(`${this.baseUrl}/nodes/ports/all`, {withCredentials: true});
    }

    getNodeInfo(nodeId: number) {
        return this.http.get<HN_CompNode>(`${this.baseUrl}/nodes/${nodeId}`, {withCredentials: true});
    }
    
    updateNodeInfo(nodeId: number, node: HN_CompNode) {
        return this.http.put<HN_CompNode>(`${this.baseUrl}/nodes/${nodeId}`, node, {withCredentials: true});
    }

    createNewNode(node: HN_CompNode) {
        return this.http.post<HN_CompNode>(`${this.baseUrl}/nodes/new`, node, {withCredentials: true});
    }

    deleteNode(nodeId: number) {
        return this.http.delete(`${this.baseUrl}/nodes/${nodeId}`, {withCredentials: true});
    }

}