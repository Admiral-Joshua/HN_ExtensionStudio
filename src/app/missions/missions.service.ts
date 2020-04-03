import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { HN_Email, HN_Mission, HN_MissionGoal, HN_MGoalType } from './models';
import { Observable } from 'rxjs';

@Injectable()
export class MissionService {
    constructor(private http: HttpClient, @Inject("BASE_API_URL") private baseUrl: string) {}

    // MISSIONS API

    getMissionInfo(missionId: number) : Observable<HN_Mission> {
        return this.http.get<HN_Mission>(`${this.baseUrl}/missions/${missionId}`, {withCredentials: true});
    }

    getMissionList(excludeId?: number) : Observable<HN_Mission[]> {
        return this.http.get<HN_Mission[]>(`${this.baseUrl}/missions/list${excludeId > 0 ? `/${excludeId}` : ''}`, {withCredentials: true});
    }    

    createMission(missionData: HN_Mission) {
        return this.http.post<HN_Mission>(`${this.baseUrl}/missions/new`, missionData, {withCredentials: true});
    }

    updateMission(missionId: number, missionData: HN_Mission) {
        return this.http.put<HN_Mission>(`${this.baseUrl}/missions/${missionId}`, missionData, {withCredentials: true});
    }

    // GOALS API
    getGoalInfo(goalId: number) {
        return this.http.get<HN_MissionGoal>(`${this.baseUrl}/missions/goals/${goalId}`, {withCredentials: true});
    }

    getMissionGoals(missionId: number) {
        return this.http.get<HN_MissionGoal[]>(`${this.baseUrl}/missions/goals/list/${missionId}`, {withCredentials: true});
    }

    getGoalTypes() {
        return this.http.get<HN_MGoalType[]>(`${this.baseUrl}/missions/goals/types/list`, {withCredentials: true});
    }

    createGoal(goal: HN_MissionGoal) {
        return this.http.post<HN_MissionGoal>(`${this.baseUrl}/missions/goals/new`, goal, {withCredentials: true});
    }

    updateGoal(goalId: number, goal: HN_MissionGoal) {
        return this.http.put<HN_MissionGoal>(`${this.baseUrl}/missions/goals/${goalId}`, goal, {withCredentials: true});
    }

    deleteGoal(goalId: number) {
        return this.http.delete(`${this.baseUrl}/missions/goals/${goalId}`, {withCredentials: true});
    }
}