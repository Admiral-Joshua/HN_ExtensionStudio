import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HN_MusicTrack, HN_MusicFilter } from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class MusicService {
    constructor(@Inject("BASE_API_URL") private baseUrl: string, private http: HttpClient) { }

    uploadNewMusicTrack(track) {
        return this.http.post(`${this.baseUrl}/music/new`, track);
    }

    playAudioTrack(trackId: number) {
        return this.http.get<AudioTrack>(`${this.baseUrl}/music/play/${trackId}`);
    }

    listMusic(filter: HN_MusicFilter): Observable<HN_MusicTrack[]> {
        switch (filter) {
            case HN_MusicFilter.ALL:
                return this.http.get<HN_MusicTrack[]>(`${this.baseUrl}/music/list/all`, { withCredentials: true });
            case HN_MusicFilter.CUSTOM:
                return this.http.get<HN_MusicTrack[]>(`${this.baseUrl}/music/list/custom`, { withCredentials: true });
            case HN_MusicFilter.DEFAULT:
                return this.http.get<HN_MusicTrack[]>(`${this.baseUrl}/music/list/default`, { withCredentials: true });
            case HN_MusicFilter.EXTENSION:
                return this.http.get<HN_MusicTrack[]>(`${this.baseUrl}/music/list/extension`, { withCredentials: true });
        }
    }

    includeTrack(trackId: number) {
        return this.http.put(`${this.baseUrl}/music/extension/${trackId}`, {}, { withCredentials: true });
    }

    excludeTrack(trackId: number) {
        return this.http.delete(`${this.baseUrl}/music/extension/${trackId}`, { withCredentials: true });
    }

    renameTrack(track: HN_MusicTrack) {
        return this.http.put<HN_MusicTrack>(`${this.baseUrl}/music/${track.musicId}`, track);
    }

    deleteTrack(trackId: number) {
        return this.http.delete(`${this.baseUrl}/music/${trackId}`);
    }

    playTrack(trackId: number) {
        let params = new HttpParams();
        params.set('responseType', 'blob');

        return this.http.get(`${this.baseUrl}/music/play/${trackId}`, { params: params, withCredentials: true, responseType: "blob" as "blob" });
    }
}