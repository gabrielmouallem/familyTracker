import { MapsAPILoader } from '@agm/core';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { FamilyService } from '../api/family.service';
import { ProfileService } from '../api/profile.service';
import { Geolocation, GeolocationOptions } from '@capacitor/core';

import { PositionService } from '../api/position.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  userLocationMarkerAnimation;

  geolocationID;
  myLatitude = -14.604847;
  myLongitude = -58.666806;
  myCenterLatitude = -14.604847;
  myCenterLongitude = -58.666806;
  intervalID;
  myZoom = 2;
  members: any[] = [];

  profileID = window.location.href.split("?profile_id=")[1];

  constructor(
    private navCtrl: NavController,
    private profileApi: ProfileService,
    private positionApi: PositionService,
    private toast: ToastController,
    private familyApi: FamilyService
  ) { }

  async showToast(message, duration, color="light") {
    const toast = await this.toast.create({
      message: message,
      duration: duration,
      position: "top",
      color: color
    });
    toast.present();
  }

  getFamilyPositions(profileID) {
    console.log("getFamilyPositions ", profileID);
    this.familyApi.getFamilyPositions(profileID).subscribe(
      (data: any[])=>{
        this.members = data;
      },
      error=>{
        // this.showToast('Erro ao obter localização dos membros da família.', 2000, 'danger');
      }
    )
  }

  mapReading() {
    this.userLocationMarkerAnimation = 'BOUNCE';
  }

  navigateToProfilePage() {
    this.navCtrl.navigateForward('/profile?geolocation_id='+this.geolocationID);
  }

  navigateToLoginPage() {
    this.navCtrl.navigateBack('/');
    localStorage.clear();
    this.disablePositionWatcher();
  }

  disablePositionWatcher() {
    Geolocation.clearWatch({ id: this.geolocationID });
  };

  async getHighAccuracyPosition() {
    const options: GeolocationOptions = {
        enableHighAccuracy: true,
        timeout: 30000
    }
    const position = await Geolocation.getCurrentPosition(options);
    this.myCenterLatitude = position.coords.latitude;
    this.myCenterLongitude = position.coords.longitude;

    this.geolocationID = await Geolocation.watchPosition(options, (position, err) => {
        if (position && this.profileID) {
          this.myLatitude = position.coords.latitude;
          this.myLongitude = position.coords.longitude;
          this.myZoom = 18;
          var body = {
            coordinates: [
              this.myLongitude,
              this.myLatitude
            ]
          }
            console.log(body)
          this.positionApi.updatePosition(this.profileID, body).subscribe(
            data=>{
              console.log("posição atualizada")
            },
            error=> {
              this.positionApi.createPosition(this.profileID, {...body, profile: this.profileID}).subscribe(
                data=> {
                  console.log("posição criada")
                },
                error=> {
                  console.log("Erro ao criar localização.")
                }
              )
            }
          )
        }
        if (err) {
          console.log(err);
            // this.showToast('Erro ao obter sua localização', 2000, 'danger');
        }
    });
}

  ionViewWillEnter() {
    console.log("WillEnter")

    if (this.profileID) {
      localStorage.setItem('profile_id', this.profileID);
      this.intervalID = setInterval(()=>{
        this.getFamilyPositions(this.profileID);
      },5000)
      this.profileApi.getProfile(this.profileID).subscribe(
        (data: any) => {
          if (!data?.family) {
            this.navCtrl.navigateForward("/profile");
          }
        },
        error => {
  
        }
      )
    } else {
      this.profileID = localStorage.getItem('profile_id');
    }
    this.getHighAccuracyPosition();
  }

  ngOnInit() {
  }

}
