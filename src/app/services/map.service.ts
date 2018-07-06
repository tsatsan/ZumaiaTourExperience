import { Injectable } from '@angular/core';
import { Activity } from '../shared/activity.model';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import * as urljoin from 'url-join';
import 'rxjs/add/operator/toPromise';
// import { activities } from '../../../server/routes';

const apiToken = environment.MAPBOX_API_KEY;
declare var omnivore: any;
declare var L: any;


const defaultCoords: number[] = [40, -30];
// tslint:disable-next-line:no-inferrable-types
const defaultZoom: number = 8;

@Injectable()
export class MapService {
  private activitiesUrl: string;
  constructor(private http: Http ) {
    this.activitiesUrl = urljoin(environment.apiUrl + 'activities');
  }

  getActivity(id): Promise<void | Activity> {
    const url = urljoin(this.activitiesUrl , id);
    return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Activity)
            .catch(this.handleError);
  }
  getActivities(): Promise<void | Activity[]> {
    return this.http.get(this.activitiesUrl)
            .toPromise()
            .then(response => response.json() as Activity[])
            .catch(this.handleError);
  }
  deleteActivity(id): Promise<void | Activity> {
    const url = urljoin(this.activitiesUrl , id);
    return this.http.delete(url)
            .toPromise()
            .then(response => response.json() as Activity)
            .catch(this.handleError);
  }
  // updateActivity(id): Promise<void | Activity> {
  //   const url = urljoin(this.activitiesUrl + '/update/'  +  id);
  //   return this.http.put(url, Activity)
  //           .toPromise()
  //           .then(response => response.json() as Activity)
  //           .catch(this.handleError);
  // }

  plotActivity(id: number) {
    const myStyle = {
      'color': '#3949AB',
      'weight': 5,
      'opacity': 0.75
    };
    const map = L.map('map').setView(defaultCoords, defaultZoom);

    map.maxZoom = 100;

    L.tileLayer(`https://api.mapbox.com/styles/v1/tsatsan/cjgdfpoom000n2sto4gknt0jf/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}`, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStrretMap</a>',
    maxZoom: 18,
    accessToken: apiToken,
    }).addTo(map);

    const customLayer = L.geoJson(null, {
    style: myStyle
  });

   this.getActivity(id)
   .then((activity: Activity) => {
    const gpxLayer = omnivore.gpx(activity.gpxData , null , customLayer)
    .on('ready', function() {
    map.fitBounds(gpxLayer.getBounds());
   }).addTo(map);
   });

}
  handleError(error: any) {
    const errMsg = error.message ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg);
  }

}
