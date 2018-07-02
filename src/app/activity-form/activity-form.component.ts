import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Activity } from '../shared/activity.model';
import { ActivityService } from '../services/activity.service';
import { Observable } from 'rxjs/Observable';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-activity-form',
    templateUrl: './activity-form.component.html',
    styleUrls: ['./activity-form.component.css'],
    providers: [ActivityService]
})

export class ActivityFormComponent {

        constructor(
        private activityService: ActivityService,
        private router: Router,
        private authService: AuthService,
        private _route: ActivatedRoute

    ) {}
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
      activity: Activity;
      loading = true;

    onFileChange(event) {
        if (event.target.files.length === 1) {
            const file = event.target.files[0];
            this.activityService.upFile(event.target.files[0])
            .subscribe(response => {

            },
            error => {
                console.error(error);
            });
        }
    }
    onGpxChange(event) {
        if (event.target.files.length === 1) {
            const file = event.target.files[0];
            this.activityService.upGpx(event.target.files[0])
            .subscribe(response => {
            },
            error => {
                console.error(error);
            });
        }
    }
    isLoggedIn() {
        return this.authService.isLoggedIn();
    }
    fullName() {
        return this.authService.currentUser.fullName();
    }
    logout() {
        this.authService.logout();
    }
      onSubmit(form: NgForm) {
          if (!this.authService.isLoggedIn()) {
              this.router.navigateByUrl('/signin');
          }
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
        this.activityService.addActivity(a)
        .subscribe(
        ({ _id }) => this.router.navigate(['/activities', _id]),
        this.activityService.handleError
        );
        form.resetForm();
    }
}

