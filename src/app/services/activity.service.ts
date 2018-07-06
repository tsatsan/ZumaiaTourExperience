import { Injectable } from '@angular/core';
import { Activity } from '../shared/activity.model';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import * as urljoin from 'url-join';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ActivityService {
 private activitiesUrl: string;
 private weatherApiKey = '8be3fadb9f2590db61d9eec9d253e1cf';
 private weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=6358169&APPID=' + this.weatherApiKey ;

  constructor(private http: Http) {
    this.activitiesUrl = urljoin(environment.apiUrl + 'activities');
  }

  getActivities(): Promise<void | Activity[]> {
    return this.http.get(this.activitiesUrl)
            .toPromise()
            .then(response => response.json() as Activity[])
            .catch(this.handleError);
   }
  //  getFiles(file) {
  //   return this.http.get(file)
  //           .toPromise()
  //           .then(response => response.json())
  //           .catch(this.handleError);
  //  }
  // getActivity(id): Promise<void | Activity> {
  //   const url = urljoin(this.activitiesUrl + '/' + id);
  //   return this.http.get(url)
  //           .toPromise()
  //           .then(response => response.json() as Activity)
  //           .catch(this.handleError);
  // }
  addActivity(activity: Activity) {
    const body = JSON.stringify(activity);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const token = localStorage.getItem('token');
    const url = this.activitiesUrl + `?token=${token}`;
    return this.http.post(url, body, { headers })
    .map((response: Response) => response.json())
    .catch((error: Response) => Observable.throw(error.json()));
  }
  upFile(file): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const id = file.name;
     const url = urljoin(environment.apiUrl + 'upload/');
     const headers = new Headers({});
     const options = new RequestOptions({ headers: headers });
     return this.http.post(url + id, formData, options).map(response => response.text())
     .catch((error: Response) => Observable.throw(error.json()));
  }
  upGpx(file): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const id = file.name;
     const url = urljoin(environment.apiUrl + 'gpx/');
     const headers = new Headers({});
     const options = new RequestOptions({ headers: headers });
     return this.http.post(url + id , formData, options).map(response => response.text())
     .catch((error: Response) => Observable.throw(error.json()));
  }
  getWeather() {
    return this.http.get(this.weatherUrl)
      .map((res: Response) => res.json());
  }

  handleError(error: any) {
    const errMsg = error.message ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg);
  }
}


