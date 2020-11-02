import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FamilyService } from '../api/family.service';
import { ProfileService } from '../api/profile.service';
import { CreateFamilyModalPage } from '../create-family-modal/create-family-modal.page';
import { EditFamilyModalPage } from '../edit-family-modal/edit-family-modal.page';
import { Plugins } from '@capacitor/core';

const { Clipboard } = Plugins;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  name: string;
  email: string;
  age: number;
  familyID: string;
  joinFamilyID: string;
  canGoBack = false;
  family: any;
  members: {
    name: string,
    age: number
  }[] = [];

  platform = 'android';

  profileID: string;
  geoLocationID: any = window.location.href.split("?geolocation_id=")[1];

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

  makeRefresh() {
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
        this.canGoBack = true;
      },
      error=>{
        this.showToast("Ocorreu um erro" ,3000, "danger");
      }
    )
  }

  doRefresh(event) {
    console.log('Begin async operation');
    try {
      this.makeRefresh();
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

  async presentCreateFamilyModal() {
    const modal = await this.modalController.create({
      component: CreateFamilyModalPage,
      cssClass: '../create-family-modal/./create-family-modal.page.scss',
      componentProps: {
        "profile_id": this.profileID
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

  joinFamily() {
    this.familyApi.getFamily(this.joinFamilyID).subscribe(
      (data: any)=> {
        this.familyID = data._id;
        console.log(this.familyID);
        console.log(this.profileID);
        this.familyApi.addMemberToFamily(this.profileID, {
          family: this.familyID
        }).subscribe(
          data=>{
            this.showToast('Você se tornou membro de uma família!', 5000, 'success');
            this.makeRefresh();
          },
          error=>{
            this.showToast('Erro ao se juntar a uma família', 3000, 'danger');
          }
        )
      },
      error=>{
        this.showToast('Erro, esta família não existe', 5000, 'danger');
      }
    )
  }

  copyToClipboard() {
    Clipboard.write({
      string: this.familyID
    });
    this.showToast('ID da Família copiado para área de transferência!', 3000, 'dark');
  };

  ionViewWillEnter() {
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

  ionViewWillLeave() {
    Geolocation.clearWatch({id: this.geoLocationID});
    localStorage.clear();
  }

}
