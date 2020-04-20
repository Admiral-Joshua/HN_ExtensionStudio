import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { HN_ActionSet, HN_Action, HN_ActionType } from './models';
import { Observable } from 'rxjs';

@Injectable()
export class ActionsService {

    constructor(private http: HttpClient, private cookies: CookieService, @Inject("BASE_API_URL") private baseUrl: string){}

    fetchActionSets() : Observable<HN_ActionSet[]> {
        return this.http.get<HN_ActionSet[]>(`${this.baseUrl}/actionset/summary`, {withCredentials: true});
    }

    getActionSetInfo(actionSetId: number) : Observable<HN_ActionSet> {
        return this.http.get<HN_ActionSet>(`${this.baseUrl}/actionset/${actionSetId}`, {withCredentials: true});
    }

    createActionSet(actionSet: HN_ActionSet) : Observable<HN_ActionSet> {
        return this.http.post<HN_ActionSet>(`${this.baseUrl}/actionset/new`, actionSet, {withCredentials: true});
    }

    updateActionSet(actionSetId: number, actionSet: HN_ActionSet) : Observable<HN_ActionSet> {
        return this.http.put<HN_ActionSet>(`${this.baseUrl}/actionset/${actionSetId}`, actionSet, {withCredentials: true});
    }

    deleteActionSet(actionSetId: number) {
        return this.http.delete(`${this.baseUrl}/actionset/${actionSetId}`, {withCredentials: true});
    }


    getActionTypes() : Observable<HN_ActionType[]> {
        return this.http.get<HN_ActionType[]>(`${this.baseUrl}/actionset/action/types/list`, {withCredentials: true});
    }

    fetchActions(actionSetId: number) : Observable<HN_Action[]> {
        return this.http.get<HN_Action[]>(`${this.baseUrl}/actionset/action/list/${actionSetId}`, {withCredentials: true});
    }

    createAction(action: HN_Action) : Observable<HN_Action> {
        return this.http.post<HN_Action>(`${this.baseUrl}/actionset/action/new`, action, {withCredentials: true});
    }

    updateAction(actionId: number, action: HN_Action) : Observable<HN_Action> {
        return this.http.put<HN_Action>(`${this.baseUrl}/actionset/action/${actionId}`, action, {withCredentials: true});
    }

    deleteAction(actionId: number) {
        return this.http.delete(`${this.baseUrl}/actionset/action/${actionId}`, {withCredentials: true});
    }

}