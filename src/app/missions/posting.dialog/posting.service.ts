import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { HN_BoardPost } from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class BoardPostingService {

    constructor(private http: HttpClient, @Inject("BASE_API_URL") private baseUrl: string) {}

    createNewPost(posting: HN_BoardPost) : Observable<HN_BoardPost> {
        return this.http.post<HN_BoardPost>(`${this.baseUrl}/missions/postings/new`, posting, {withCredentials: true});
    }

    updatePost(postingId: number, posting: HN_BoardPost) : Observable<HN_BoardPost> {
        return this.http.put<HN_BoardPost>(`${this.baseUrl}/missions/postings/${postingId}`, posting, {withCredentials: true});
    }

    deletePost(postingId: number) {
        return this.http.delete(`${this.baseUrl}/missions/postings/${postingId}`, {withCredentials: true});
    }

    getPosting(postingId: number) : Observable<HN_BoardPost> {
        return this.http.get<HN_BoardPost>(`${this.baseUrl}/missions/postings/${postingId}`, {withCredentials: true});
    }
}