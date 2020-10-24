import { MapsAPILoader } from '@agm/core';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  userLocationMarkerAnimation

  constructor(
    private navCtrl: NavController
  ) { }

  mapReading() {
    this.userLocationMarkerAnimation = 'BOUNCE';
  }

  navigateToProfilePage() {
    this.navCtrl.navigateForward('/profile')
  }

  ngOnInit() {
  }

}
