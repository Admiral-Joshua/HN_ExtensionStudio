import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { HN_Email, HN_AttachmentType, HN_EmailAttachment } from '../email.dialog/models';
import { Observable } from 'rxjs';

@Injectable()
export class EmailService {
    constructor(private http: HttpClient, @Inject("BASE_API_URL") private baseUrl: string) {}

    getEmail(emailId: number) {
        return this.http.get<HN_Email>(`${this.baseUrl}/missions/email/${emailId}`, {withCredentials: true});
    }

    createEmail(email: HN_Email) {
        return this.http.post<HN_Email>(`${this.baseUrl}/missions/email/new`, email, {withCredentials: true});
    }

    updateEmail(emailId: number, email: HN_Email) {
        return this.http.put<HN_Email>(`${this.baseUrl}/missions/email/${emailId}`, email, {withCredentials: true});
    }

    deleteEmail(emailId: number) {
        return this.http.delete(`${this.baseUrl}/missions/email/${emailId}`, {withCredentials: true});
    }


    // ATTACHMENTS
    getAttachments(emailId: number) : Observable<HN_EmailAttachment[]> {
        return this.http.get<HN_EmailAttachment[]>(`${this.baseUrl}/missions/email/attachment/list/${emailId}`, {withCredentials: true});
    }

    createNewAttachment(attachment: HN_EmailAttachment) {
        return this.http.post<HN_EmailAttachment>(`${this.baseUrl}/missions/email/attachment/new`, attachment, {withCredentials: true})
    }

    updateAttachment(attachmentId: number, attachment: HN_EmailAttachment) {
        return this.http.put<HN_EmailAttachment>(`${this.baseUrl}/missions/email/attachment/${attachmentId}`, attachment, {withCredentials: true});
    }
 
    mapAttachment(emailId: number, attachmentId: number){
        return this.http.get(`${this.baseUrl}/missions/email/attachment/map?email=${emailId}&attachment=${attachmentId}`, {withCredentials: true});
    }
    unmapAttachment(emailId: number, attachmentId: number) {
        return this.http.get(`${this.baseUrl}/missions/email/attachment/unmap?email=${emailId}&attachment=${attachmentId}`, {withCredentials: true});
    }

    deleteAttachment(attachmentId: number) {
        return this.http.delete(`${this.baseUrl}/missions/email/attachment/${attachmentId}`, {withCredentials: true});
    }

    getAttachmentTypes() : Observable<HN_AttachmentType[]> {
        return this.http.get<HN_AttachmentType[]>(`${this.baseUrl}/missions/email/attachment/types/list`, {withCredentials: true});
    }

}