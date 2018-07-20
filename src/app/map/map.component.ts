import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MapService } from '../services/map.service';
import { Activity } from '../shared/activity.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DialogService } from 'ng2-bootstrap-modal';
import {  AppComfirmComponent } from '../modalHome/modal-confirm.component';


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
              private authService: AuthService,
              private dialogService: DialogService) { }

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
    id: number;

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
        this.router.navigate(['/']);
       });
     });
    }
      update(_id) {
        this.sub = this._route.params.subscribe(params => {
          console.log('params id---->', params.id);
        const disposable = this.dialogService.addDialog( AppComfirmComponent, {
      title: 'Edit Activity',
      name: this.activity.name,
      description: this.activity.description,
      distance: this.activity.distance,
      unlevenless: this.activity.unlevenless,
      time: this.activity.time,
      tipo: this.activity.tipo,
      gpxData: this.activity.gpxData,
      image: this.activity.image,
      id: params.id,
      });
    });
  // We can close dialog calling disposable.unsubscribe();
  // If dialog was not closed manually close it by timeout
  // setTimeout(() => {
  //     disposable.unsubscribe();
  // }, 10000);
 }

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
    });
  });
}

  ngOnDestroy() {
  this.sub.unsubscribe();
  }
}
