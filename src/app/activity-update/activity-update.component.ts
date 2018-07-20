import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Activity } from '../shared/activity.model';
import { ActivityService } from '../services/activity.service';
import { Observable } from 'rxjs/Observable';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MapService } from '../services/map.service';

@Component({
    selector: 'app-update-form',
    templateUrl: './activity-update.component.html',
    styleUrls: ['./activity-update.component.css'],
    providers: [MapService, ActivityService]
})

export class ActivityUpdateComponent implements OnInit {

        constructor(
        private _mapService: MapService,
        private activityService: ActivityService,
        private router: Router,
        private authService: AuthService,
        private _route: ActivatedRoute

    ) {}
    activity: Activity;
    loading = true;
    sub: any;
    activityName: String;
    activityDescription: String;
    activityImage: String;
    activityTipo: string;
    activityUnlevenless: number;
    activityTime: number;
    activityDistance: number;
    activityGpxData: string;

    uploadFile: any;
    options: Object = {
        url: 'htpp://localhost:3000/app/upload'
    };
    http: Http;
    tipos = [
        {value: 'paseo', viewValue: 'Paseo'},
        {value: 'excursion', viewValue: 'Excursión'},
        {value: 'lugar', viewValue: 'Lugar'}
      ];
    onFileChange(event) {
        if (event.target.files.length === 1) {
            const file = event.target.files[0];
            this.activityService.upFile(file)
            .subscribe(response => {
                console.log('ok' , response);
            },
            error => {
                console.error(error);
            });
        }
    }
    onGpxChange(event) {
        if (event.target.files.length === 1) {
            const file = event.target.files[0];
            this.activityService.upGpx(file)
            .subscribe(response => {
                console.log('ok', response);
            },
            error => {
                console.error(error);
            });
        }
    }

    ngOnInit() {
        this.sub = this._route.params.subscribe(params => {
        this._mapService.getActivity(params.id).then((activity: Activity) => {
          this.activity = activity;
          this.loading = false;
          this.activityImage = this.activity.image;
          this.activityName = this.activity.name;
          this.activityDescription = this.activity.description;
          this.activityTipo = this.activity.tipo;
          this.activityUnlevenless = this.activity.unlevenless;
          this.activityTime = this.activity.time;
          this.activityDistance = this.activity.distance;
          this.activityGpxData = this.activity.gpxData;
          console.log(this.activity);
          console.log(params.id);
        });
      });
    }
}

