import { Injectable, INJECTOR, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { HN_Theme, HN_Layout } from './models';
import { Observable } from 'rxjs';

@Injectable()
export class ThemesService {
    constructor(private http: HttpClient, @Inject("BASE_API_URL") private baseUrl: string) { }

    fetchThemeList(): Observable<HN_Theme[]> {
        return this.http.get<HN_Theme[]>(`${this.baseUrl}/themes/list`, { withCredentials: true });
    }

    fetchTheme(themeId: number): Observable<HN_Theme> {
        return this.http.get<HN_Theme>(`${this.baseUrl}/themes/${themeId}`, { withCredentials: true });
    }

    createTheme(theme: HN_Theme): Observable<HN_Theme> {
        return this.http.post<HN_Theme>(`${this.baseUrl}/themes/new`, theme, { withCredentials: true });
    }

    updateTheme(themeId: number, theme: HN_Theme): Observable<HN_Theme> {
        return this.http.put<HN_Theme>(`${this.baseUrl}/themes/${themeId}`, theme, { withCredentials: true });
    }

    deleteTheme(themeId: number) {
        return this.http.delete(`${this.baseUrl}/themes/${themeId}`, { withCredentials: true });
    }

    getLayouts(): Observable<HN_Layout[]> {
        return this.http.get<HN_Layout[]>(`${this.baseUrl}/themes/layouts/list`, { withCredentials: true });
    }

    uploadThemeImage(themeData: FormData) {
        return this.http.post(`${this.baseUrl}/themes/upload`, themeData, { withCredentials: true });
    }

    getThemeImage(themeId: number) {
        return this.http.get(`${this.baseUrl}/themes/${themeId}/bgimage`, { withCredentials: true, responseType: 'blob' });
    }
}