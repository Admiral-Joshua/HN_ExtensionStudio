import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { HN_Port } from '../models';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable()
export class PortsService {

    constructor(private http: HttpClient, @Inject("BASE_API_URL") private baseUrl: string) {}

    getCurrentPorts(nodeId: number) : Observable<HN_Port[]> {
        return this.http.get(`${this.baseUrl}/nodes/ports/list/${nodeId}`, {withCredentials: true})
        .pipe(
            map(portsMapping => {return portsMapping['ports']})
        );
    }

    addPort(nodeId: number, portId: number) {
        return this.http.get(`${this.baseUrl}/nodes/ports/map?node=${nodeId}&port=${portId}`, {
            withCredentials: true
        });
    }

    removePort(nodeId: number, portId: number) {
        let params = new HttpParams();
        params.set('node', nodeId.toString());
        params.set('port', portId.toString());

        return this.http.get(`${this.baseUrl}/nodes/ports/unmap?node=${nodeId}&port=${portId}`, {
            withCredentials: true
        });
    }

}