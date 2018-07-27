import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Activity } from '../shared/activity.model';
import { ActivityService } from '../services/activity.service';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css'],
  providers: [ActivityService, AuthService]
})
export class ActivityListComponent implements OnInit {

  activities: Activity[];
  loading = true;
  description: string;
  // @ViewChild('vc', {read: ViewContainerRef }) vc: ViewContainerRef;


  // ngAfterViewInit(): void {
  //     // outputs `I am span`
  //     console.log(this.vc.element.nativeElement.textContent);
  // }
  constructor(private activityService: ActivityService, private authService: AuthService) { }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  fullName() {
  return this.authService.currentUser.fullName();
  }
  logout() {
  this.authService.logout();
  }
  ngOnInit() {
    this.activityService
    .getActivities()
    .then((activities: Activity[]) => {
      this.activities = activities;
    });

  }
  trackActivity(index, activity) {
    const description = activity.description;
    const descriShort = description.substr(0, 100);
    console.log(descriShort);
    return activity ? activity.description : undefined;
  }
}
