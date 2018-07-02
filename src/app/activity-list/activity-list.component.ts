import { Component, OnInit } from '@angular/core';
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
  constructor(private activityService: ActivityService, private authService: AuthService) { }

  activities: Activity[];
  loading = true;

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
      console.log(activities);
    });

  }
}
