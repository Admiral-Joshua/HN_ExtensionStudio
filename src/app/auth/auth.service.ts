import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { UserAccount } from './auth.models';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient, @Inject('BASE_API_URL') private baseUrl: string, @Inject('LUNA_BASE') private LUNA_BASE: string) {
    }

    login(user: UserAccount): Observable<UserAccount> {
        return this.http.post<UserAccount>(`${this.LUNA_BASE}/auth/login`, user);
    }

    register(user: UserAccount): Observable<UserAccount> {
        return this.http.post<UserAccount>(`${this.LUNA_BASE}/auth/register`, user);
    }

    verify(token: string) {
        return this.http.post(`${this.baseUrl}/auth/verify`, { token });
    }
}
