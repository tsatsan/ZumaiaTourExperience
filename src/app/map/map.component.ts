import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { MapService } from '../services/map.service';
import { Activity } from '../shared/activity.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
// const gpxParse = require('gpx-parse');


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [MapService, AuthService]
})


export class MapComponent implements OnInit, OnDestroy {

  constructor(private _mapService: MapService,
              private _route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

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


  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  fullName() {
  return this.authService.currentUser.fullName();
  }
  logout() {
  this.authService.logout();
  }
     delete(_id) {
       this.sub = this._route.params.subscribe(params => {
       this._mapService.deleteActivity(params.id).then((activity: Activity) => {
        this.router.navigate(['/activities']);
       });
     });
    }
    //  update(_id) {
    //    this.sub = this._route.params.subscribe(params => {
    //      this._mapService.updateActivity(params.id).then((activity: Activity) => {

    //      });
    //    });
    //  }

  ngOnInit() {
    this.sub = this._route.params.subscribe(params => {
    this._mapService.plotActivity(params.id);
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
  ngOnDestroy() {
  this.sub.unsubscribe();
  }
}
