import { MapsAPILoader } from '@agm/core';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { profile } from 'console';
import { FamilyService } from '../api/family.service';
import { ProfileService } from '../api/profile.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  userLocationMarkerAnimation

  profileID = window.location.href.split("?profile_id=")[1];
  
  constructor(
    private navCtrl: NavController,
    private profileApi: ProfileService
  ) { }

  mapReading() {
    this.userLocationMarkerAnimation = 'BOUNCE';
  }

  navigateToProfilePage() {
    this.navCtrl.navigateForward('/profile');
  }

  navigateToLoginPage() {
    this.navCtrl.navigateBack('/');
    localStorage.clear();
  }

  ngOnInit() {
    if (this.profileID){
      localStorage.setItem('profile_id', this.profileID);
    }
    this.profileApi.getProfile(this.profileID).subscribe(
      (data: any)=>{
        if (!data?.family){
          this.navCtrl.navigateForward("/profile");
        }
      },
      error=>{

      }
    )
  }

}
