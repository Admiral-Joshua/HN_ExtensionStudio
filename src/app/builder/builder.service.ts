import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BuildJob } from './builder.models';
import { Observable } from 'rxjs';

@Injectable()
export class BuilderService {
    constructor(private http: HttpClient, @Inject("BASE_API_URL") private baseUrl: string) { }

    getJobList(): Observable<BuildJob[]> {
        return this.http.get<BuildJob[]>(`${this.baseUrl}/build/jobs`, { withCredentials: true });
    }

    getJobInfo(jobId: number): Observable<BuildJob> {
        return this.http.get<BuildJob>(`${this.baseUrl}/build/${jobId}`, { withCredentials: true });
    }

    submitJob(jobInfo: BuildJob, jobId?: number): Observable<BuildJob> {
        return this.http.put<BuildJob>(`${this.baseUrl}/build/${jobId || '0'}`, jobInfo, { withCredentials: true });
    }

    canceljob(jobId: number) {
        return this.http.delete(`${this.baseUrl}/build/${jobId}`, { withCredentials: true });
    }

    downloadJob(jobId: number) {
        this.http.get(`${this.baseUrl}/build/${jobId}/download`, { withCredentials: true, responseType: 'blob' }).subscribe((blob) => {
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        });
    }
}