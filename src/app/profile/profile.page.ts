import { Component, OnInit } from '@angular/core';
import { Capacitor } from "@capacitor/core";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  platform = 'android';

  constructor() { }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  ngOnInit() {
    this.platform = Capacitor.platform;
  }

}
