import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import { HN_MusicTrack, HN_MusicFilter } from 'src/app/models';
import { MusicService } from '../music.service';
import { MusicUploadDialogComponent } from './upload-dialog/music.upload.dialog';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/dialogs/deleteConfirmDialog/delete.confirmation.component';
import { MatSliderChange } from '@angular/material/slider';

@Component({
    templateUrl: "./music.manager.component.html",
    styleUrls: ["./music.manager.component.css"]
})
export class MusicManagerComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['title']
    musicList: HN_MusicTrack[] = []

    player = new Audio();

    playerProgress: number = 0;

    //player = new Audio();

    constructor(private cookie: CookieService, private service: MusicService, @Inject("BASE_API_URL") private apiUrl: string, private dialog: MatDialog) { }

    ngOnInit() {
        this.player.ontimeupdate = () => {
            this.playerProgress = this.player.currentTime;
        }

        this.fetchMusicList();
    }

    ngOnDestroy() {
        /*if (!this.player.paused) {
            this.player.pause();
        }*/
    }

    loadTrack(track: HN_MusicTrack) {
        this.service.playTrack(track.musicId).subscribe(data => {
            this.player.src = window.URL.createObjectURL(data);
            this.player.play();
        });
    }

    fetchMusicList() {
        this.service.listMusic(HN_MusicFilter.CUSTOM).subscribe(tracks => {
            this.musicList = tracks;
        });
    }

    seekTo(e: MatSliderChange) {
        this.player.currentTime = e.value;
    }

    getProgress(track: HN_MusicTrack) {
        if (track.player) {
            let progress = (track.player.currentTime / track.player.duration);
            let percent = Math.floor(progress * 100).toString() + "%";
            console.log("Song Progress: " + percent);
            return percent;
        } else {
            return "0%";
        }
    }

    renameTrack(track: HN_MusicTrack) {
        this.service.renameTrack(track).subscribe(() => {
            // Update complete -- do nothing
        });
    }

    restartTrack(track: HN_MusicTrack) {
        this.player.currentTime = 0;
    }

    uploadNewTrack() {
        let dialogRef = this.dialog.open(MusicUploadDialogComponent);
        dialogRef.afterClosed().subscribe(() => {
            this.fetchMusicList();
        });
    }

    deleteTrack(trackId: number) {
        let ref = this.dialog.open(DeleteConfirmationComponent, {
            data: {
                type: "Music Track",
                msg: "Are you sure you want to delete this track?"
            }
        });

        ref.afterClosed().subscribe(res => {
            if (res) {
                // Delete confirmed - perform delete
                this.service.deleteTrack(trackId).subscribe(() => {
                    this.fetchMusicList();
                });
            }
        })
    }
}