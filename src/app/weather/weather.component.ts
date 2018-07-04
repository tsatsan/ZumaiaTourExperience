import { Component, OnInit } from '@angular/core';
import { Activity } from '../shared/activity.model';
import { ActivityService } from '../services/activity.service';
import * as moment from 'moment';
// import { Subscription } from 'rxjs';


moment.locale('es');
@Component({
  selector: 'app-weather-icons',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [ActivityService]
})
export class WeatherComponent implements OnInit {
    data: any = {};
    data2: any = {};
    data3: any = {};
    data4: any = {};
    data5: any = {};
    urlImageWeather1: string;
    urlImageWeather2: string;
    urlImageWeather3: string;
    urlImageWeather4: string;
    urlImageWeather5: string;
    day1: string;
    day2: string;
    day3: string;
    day4: string;
    day5: string;
    tempMax: number;
    tempMin: number;
    tempMax2: number;
    tempMin2: number;
    tempMax3: number;
    tempMin3: number;
    tempMax4: number;
    tempMin4: number;
    tempMax5: number;
    tempMin5: number;
    i: number;
    tempDay: number;

  constructor(private activityService: ActivityService) { }

  ngOnInit() {
    this.activityService
    .getWeather().subscribe(data => {
        const hoy = (data.list[0].dt_txt).substr(0, 11);
        const Icons = [];
        const Days = [];
        const Temps = [];
        const globalT = [];
        this.data = data.list[0].weather[0].icon;
        Icons.push(this.data);

        // tslint:disable-next-line:prefer-const
        for (let el of data.list) {
          const day = (el.dt_txt).substr(0, 11);
          const hour =  (el.dt_txt).substr(11);
          if ( day === hoy ) {
            Temps.push(el.main.temp);
          } else {
            globalT.push(el.main.temp);
          }

          if (day !== hoy && hour === '12:00:00') {
          Icons.push(el.weather[0].icon);
          Days.push(el.dt_txt);
          }
        }

        const dayTemp2 = globalT.slice(0, 8);
        const dayTemp3 = globalT.slice(9, 17);
        const dayTemp4 = globalT.slice(18, 25);
        const dayTemp5 = globalT.slice(26, 32);

        const tempMax  =  Math.max(...Temps);
        const tempMax2 =  Math.max(...dayTemp2);
        const tempMax3 =  Math.max(...dayTemp3);
        const tempMax4 =  Math.max(...dayTemp4);
        const tempMax5 =  Math.max(...dayTemp5);

        const tempMin = Math.min(...Temps);
        const tempMin2 =  Math.min(...dayTemp2);
        const tempMin3 =  Math.min(...dayTemp3);
        const tempMin4 =  Math.min(...dayTemp4);
        const tempMin5 =  Math.min(...dayTemp5);

        for (let el of Icons) {
          if (el === '01d') {
            el = '../../assets/img/weather-Sun.png';
            Icons.push(el);
          }
          if (el === '02d') {
            el = '../../assets/img/weather-Cloud-Sun.png';
            Icons.push(el);
          }
          if (el === '03d') {
            el = '../../assets/img/weather-Cloud.png';
            Icons.push(el);
          }
          if (el === '04d') {
            el = '../../assets/img/weather-cloud-cloud.png';
            Icons.push(el);
          }
          if (el === '09d') {
            el = '../../assets/img/weather-Rain.png';
            Icons.push(el);
          }
          if (el === '10d') {
            el = '../../assets/img/weather-cloud-sun-rain.png';
            Icons.push(el);
          }
          if (el === '11d') {
            el = '../../assets/img/weather-Cloud-Lightning.png';
            Icons.push(el);
          }
          if (el === '13d') {
            el = '../../assets/img/weather-Snow.png';
            Icons.push(el);
          }
        }
          this.urlImageWeather1 =  Icons[6];
          this.urlImageWeather2 =  Icons[7];
          this.urlImageWeather3 =  Icons[8];
          this.urlImageWeather4 =  Icons[9];
          this.urlImageWeather5 =  Icons[10];

          console.log(this.urlImageWeather1);
          for (const el of Icons) {
            console.log(el);
          }
          console.log(Icons);

          this.day2 = moment(Days[0]).format('ddd');
          this.day3 = moment(Days[1]).format('ddd');
          this.day4 = moment(Days[2]).format('ddd');
          this.day5 = moment(Days[3]).format('ddd');

          this.tempMax = Math.round(tempMax - 273.15);
          this.tempMin = Math.round(tempMin - 273.15);
          this.tempMax2 = Math.round(tempMax2 - 273.15);
          this.tempMin2 = Math.round(tempMin2 - 273.15);
          this.tempMax3 = Math.round(tempMax3 - 273.15);
          this.tempMin3 = Math.round(tempMin3 - 273.15);
          this.tempMax4 = Math.round(tempMax4 - 273.15);
          this.tempMin4 = Math.round(tempMin4 - 273.15);
          this.tempMax5 = Math.round(tempMax5 - 273.15);
          this.tempMin5 = Math.round(tempMin5 - 273.15);
         });
    }
}
