import { Component } from '@angular/core';
import { BuildJob, JobStatus } from './builder.models';
import { BuilderService } from './builder.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { faSync, faCheck, faTimes, faDownload } from "@fortawesome/free-solid-svg-icons"
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    templateUrl: './builder.component.html',
    styleUrls: ['./builder.component.css']
})
export class BuilderComponent {
    displayedColumns: string[] = [
        "job_id",
        "status",
        "submission",
        "started",
        "completed",
        "actions"
    ];

    extensionId: number

    jobs: BuildJob[] = [];

    canIncremental = false;
    isRebuild = false;

    downloadIcon = faDownload;
    cancelIcon = faTimes;

    constructor(private service: BuilderService, private cookie: CookieService, private snackbar: MatSnackBar) {
        this.extensionId = parseInt(cookie.get('extId'));
    }

    ngOnInit() {
        this.updateJobsList();

        setInterval(() => {
            this.updateJobsList();
        }, 5000);
    }

    getStatusClass(status: JobStatus) {
        switch (status) {
            case JobStatus.CANCELLED:
                return "cancelled";
            case JobStatus.COMPLETED:
                return "completed";
            case JobStatus.RUNNING:
                return "running";
            default:
                return "normal";
        }
    }

    getStatusIcon(status: JobStatus) {
        switch (status) {
            case JobStatus.CANCELLED:
                return this.cancelIcon;
            case JobStatus.COMPLETED:
                return faCheck;
            default:
                return faSync;
        }
    }

    submitJob() {
        const jobReq = new BuildJob(this.extensionId, this.isRebuild);

        if (this.isRebuild) {
            const latest = this.findLatestSuccess();

            if (latest) {
                this.service.submitJob(jobReq, latest.jobId).subscribe((job) => {
                    this.snackbar.open('Build job submitted successfully!', '', {
                        duration: 800
                    });

                    this.updateJobsList();

                    console.log('Job Submitted:', job);
                });
            }
        } else {
            this.service.submitJob(jobReq).subscribe((job) => {
                this.snackbar.open('Build job submitted successfully!', '', {
                    duration: 800
                });

                this.updateJobsList();

                console.log('Job Submitted:', job);
            });
        }


    }

    updateJobsList() {
        this.service.getJobList().subscribe((jobs) => {
            this.jobs = jobs.sort((a, b) => new Date(b.time_submitted).getTime() - new Date(a.time_submitted).getTime());

            let latest = this.findLatestSuccess();
            if (latest) {
                this.canIncremental = true;
            } else {
                this.isRebuild = true;
            }
        });
    }

    cancelJob(jobId: number) {
        this.service.canceljob(jobId).subscribe(() => {
            this.updateJobsList();
        });
    }

    downloadJob(jobId: number) {
        this.service.downloadJob(jobId);
    }



    findLatestSuccess(): BuildJob {
        let latest;
        this.jobs.forEach((job) => {
            if (latest) {
                if (job.time_completed > latest.time_completed) {
                    latest = job;
                }
            } else {
                latest = job;
            }
        });

        return latest;
    }
}
