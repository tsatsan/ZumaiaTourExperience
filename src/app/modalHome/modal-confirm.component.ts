import { Component, OnInit} from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { NgForm } from '@angular/forms';
import { Activity } from '../shared/activity.model';
import { ActivityService } from '../services/activity.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MapService } from '../services/map.service';
export interface ConfirmModel {
  title: string;
  name: string;
  tipo: string;
  description: string;
  unlevenless: string;
  distance: string;
  time: string;
  image: string;
  gpxData: string;
  id: string;

}
@Component({
    selector: 'app-modal-confirm',
    templateUrl: './modal-confirm.component.html',
    styleUrls: ['./modal-confirm.component.css']
})
export class AppComfirmComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  name: string;
  description: string;
  tipo: string;
  unlevenless: string;
  distance: string;
  time: string;
  image: string;
  gpxData: string;
  id: string;
  private sub: any;

  constructor(
            dialogService: DialogService,
            private activityService: ActivityService,
            private _mapService: MapService,
            private router: Router,
            private _route: ActivatedRoute
            ) {
            super(dialogService);
            }
  activity: Activity;
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



  onSubmit(form: NgForm) {
  const id = form.value.id;
        const a = new Activity(
          form.value.name,
          form.value.description,
          form.value.image,
          form.value.tipo,
          form.value.unlevenless,
          form.value.time,
          form.value.distance,
          form.value.gpxData,
      );
      console.log(a);
      this.activityService.updateActivity(id, a);
      this.router.navigate(['/actividad', id]);

    form.resetForm();
    this.result = true;
    this.close();
  }
}
