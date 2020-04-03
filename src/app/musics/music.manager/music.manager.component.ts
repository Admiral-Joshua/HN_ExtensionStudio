import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import { HN_MusicTrack } from 'src/app/models';
import { MusicService } from '../music.service';
import { MusicUploadDialogComponent } from './upload-dialog/music.upload.dialog';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/dialogs/deleteConfirmDialog/delete.confirmation.component';

@Component({
    templateUrl: "./music.manager.component.html",
    styleUrls: ["./music.manager.component.css"]
})
export class MusicManagerComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['title']
    musicList: HN_MusicTrack[] = []

    //player = new Audio();

    constructor(private cookie: CookieService, private service: MusicService, @Inject("BASE_API_URL") private apiUrl: string, private dialog: MatDialog) {}
    
    ngOnInit() {
        this.fetchMusicList();
    }

    ngOnDestroy() {
        /*if (!this.player.paused) {
            this.player.pause();
        }*/
    }

    fetchMusicList() {
        this.service.listMyMusic().subscribe(tracks => {
            this.musicList = tracks;
        })
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

    pause(track: HN_MusicTrack) {
        if (track.player) {
            if (!track.player.paused) {
                track.player.pause();
            }
        }
    }

    pauseAll(exclude?: HN_MusicTrack) {
        this.musicList.forEach(music => {
            if (!exclude || music.musicId !== exclude.musicId) {
                this.pause(music);
            }
        })
    }

    playMusic(track: HN_MusicTrack) {
        // Pause any currently playing tracks.
        this.pauseAll(track);
        // Do we already have this track loaded?
        if (track.player) {
            // Toggle play/pause
            if (track.player.paused) {
                track.player.play();
            } else {
                track.player.pause();
            }
        } else {
            this.service.playTrack(track.musicId).subscribe(data => {
                track.player = new Audio();
                track.player.src = window.URL.createObjectURL(data);
                track.player.play();
            });
        }
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