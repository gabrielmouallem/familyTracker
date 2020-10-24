import { MapsAPILoader } from '@agm/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  userLocationMarkerAnimation

  constructor(

  ) { }

  mapReading() {
    this.userLocationMarkerAnimation = 'BOUNCE';
  }

  ngOnInit() {
  }

}
