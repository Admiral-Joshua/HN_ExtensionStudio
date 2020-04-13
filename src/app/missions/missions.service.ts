import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {HN_Mission, HN_MissionGoal, HN_MGoalType, HN_MissionBranch } from './models';
import { HN_Email } from "./email.dialog/models";
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

    linkEmail(missionId: number, emailId: number) {
        return this.http.get(`${this.baseUrl}/missions/linkEmail?mission=${missionId}&email=${emailId}`, {withCredentials: true});
    }

    linkPosting(missionId: number, postingId: number) {
        return this.http.get(`${this.baseUrl}/missions/linkPosting?mission=${missionId}&posting=${postingId}`, {withCredentials: true});
    }

    createBranch(branchReq: HN_MissionBranch): Observable<HN_MissionBranch> {
        return this.http.post<HN_MissionBranch>(`${this.baseUrl}/missions/branch`, branchReq, {withCredentials: true});
    }

    deleteBranch(branchId: number) {
        return this.http.delete(`${this.baseUrl}/missions/branch/${branchId}`, {withCredentials: true});
    }

    getBranches(missionId: number) : Observable<HN_MissionBranch[]> {
        return this.http.get<HN_MissionBranch[]>(`${this.baseUrl}/missions/branch/list/${missionId}`, {withCredentials: true});
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