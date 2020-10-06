export enum JobStatus {
    UNKNOWN,
    QUEUED,
    RUNNING,
    COMPLETED,
    CANCELLED
}

export class BuildJob {
    jobId: number;
    jobStatus: JobStatus;
    time_submitted: string;
    user_id: number;
    extension_id: number;
    rebuild: boolean;
    time_started: string;
    time_completed: string;

    constructor(extension_id: number, rebuild: boolean) {
        this.extension_id = extension_id;
        this.rebuild = rebuild;
        this.jobStatus = JobStatus.QUEUED;
    }
}