import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HN_MusicFilter, HN_MusicTrack} from 'src/app/models';
import {MusicService} from '../music.service';

@Component({
    templateUrl: "./music.ext.selector.component.html"
})
export class MusicExtSelectorComponent implements OnInit {
    music: HN_MusicTrack[] = [];

    constructor(private service: MusicService, private snackbar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.service.listMusic(HN_MusicFilter.EXTENSION).subscribe((extMusic) => {

          const existingIds = extMusic.map(track => track.musicId);

          this.service.listMusic(HN_MusicFilter.CUSTOM).subscribe((music) => {
            music.forEach((track) => {
              if (existingIds.includes(track.musicId)) {
                track.selected = true;
              }
            });

            this.music = music;
          });
        });
    }

    include(track: HN_MusicTrack): void {
        this.service.includeTrack(track.musicId).subscribe(() => {
            track.selected = true;

            this.notifyChanges();
        });
    }

    exclude(track: HN_MusicTrack): void {
        this.service.excludeTrack(track.musicId).subscribe(() => {
            track.selected = false;

            this.notifyChanges();
        });
    }

    private notifyChanges(): void {
        this.snackbar.open('Changes saved succesfully!', '', {
            duration: 600
        });
    }
}
