import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ProfileService } from '../api/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  name: string;
  email: string;
  age: number;
  family: any;

  platform = 'android';

  profileID: string;

  constructor(
    private profileApi: ProfileService,
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

  doRefresh(event) {
    console.log('Begin async operation');
    this.profileApi.getProfile(this.profileID).subscribe(
      (data: any)=>{
        this.name = data.name;
        this.email = data.email;
        this.age = data.age;
        event.target.complete();
      },
      error=>{
        this.showToast("Ocorreu um erro" ,3000, "danger");
        event.target.complete();
      }
    )
  }

  saveProfile() {
    this.profileApi.updateProfile(this.profileID, {
      name: this.name,
      email: this.email,
      age: this.age
    }).subscribe(
      data=> {
        this.showToast("Perfil atualizado", 2000, "dark");
      },
      error => {
        this.showToast("Erro ao atualizar perfil", 2000, "danger");
      }
    )
  }

  ngOnInit() {
    this.profileID = localStorage.getItem('profile_id');
    this.profileApi.getProfile(this.profileID).subscribe(
      (data: any)=>{
        this.name = data.name;
        this.email = data.email;
        this.age = data.age;
        this.family = data?.family;
      },
      error=>{
        this.showToast("Ocorreu um erro" ,3000, "danger");
      }
    )
  }

}
