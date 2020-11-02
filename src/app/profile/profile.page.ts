import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FamilyService } from '../api/family.service';
import { ProfileService } from '../api/profile.service';
import { EditFamilyModalPage } from '../edit-family-modal/edit-family-modal.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  name: string;
  email: string;
  age: number;
  familyID: string;
  family: any;
  members: {
    name: string,
    age: number
  }[] = [];

  platform = 'android';

  profileID: string;

  constructor(
    private profileApi: ProfileService,
    private familyApi: FamilyService,
    private toast: ToastController,
    public modalController: ModalController
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
    try {
      this.profileApi.getProfile(this.profileID).subscribe(
        (data: any)=>{
          this.name = data.name;
          this.email = data.email;
          this.age = data.age;
        },
        error=>{
          this.showToast("Ocorreu um erro" ,3000, "danger");
        }
      )
      this.familyApi.getFamily(this.familyID).subscribe(
        (data: any)=>{
          this.family = data;
          this.members = data.members;
        },
        error=>{
          this.showToast("Ocorreu um erro" ,3000, "danger");
        }
      )
    } finally {
      event.target.complete();
    }
  }

  async presentEditFamilyModal() {
    const modal = await this.modalController.create({
      component: EditFamilyModalPage,
      cssClass: '../edit-family-modal/./edit-family-modal.page.scss',
      componentProps: {
        "family": this.family
      }
    });
    return await modal.present();
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
        this.familyID = data?.family;
        if(data?.family){
          console.log("GetFamily")
          this.familyApi.getFamily(this.familyID).subscribe(
            (data: any)=>{
              this.family = data;
              this.members = data.members;
            },
            error=>{

            }
          )
        }
      },
      error=>{
        this.showToast("Ocorreu um erro" ,3000, "danger");
      }
    )
  }

}
