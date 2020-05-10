import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { UserAccount } from './auth.models';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient, @Inject("BASE_API_URL") private baseUrl: string) {

    }

    login(user: UserAccount): Observable<UserAccount> {
        return this.http.post<UserAccount>(`${this.baseUrl}/auth/login`, user);
    }

    register(user: UserAccount): Observable<UserAccount> {
        return this.http.post<UserAccount>(`${this.baseUrl}/auth/register`, user);
    }
}