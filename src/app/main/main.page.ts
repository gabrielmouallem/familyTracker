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
  myZoom = 2;

  profileID = window.location.href.split("?profile_id=")[1];

  constructor(
    private navCtrl: NavController,
    private profileApi: ProfileService,
    private positionApi: PositionService,
    private toast: ToastController,
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

  async getHighAccuracyPosition() {
    const options: GeolocationOptions = {
        enableHighAccuracy: true,
        timeout: 10000
    }
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
            this.showToast('Erro ao obter sua localização', 2000, 'danger');
        }
    });
}

  ngOnInit() {

    this.getHighAccuracyPosition();

    if (this.profileID) {
      localStorage.setItem('profile_id', this.profileID);
      this.profileApi.getProfile(this.profileID).subscribe(
        (data: any) => {
          if (!data?.family) {
            this.navCtrl.navigateForward("/profile");
          }
        },
        error => {
  
        }
      )
    }
  }

}
