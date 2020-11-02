import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FamilyService } from '../api/family.service';

@Component({
  selector: 'app-create-family-modal',
  templateUrl: './create-family-modal.page.html',
  styleUrls: ['./create-family-modal.page.scss'],
})
export class CreateFamilyModalPage implements OnInit {

  @Input() profile_id: any;
  surname: string = "";

  constructor(
    public modalController: ModalController,
    private familyApi: FamilyService,
    private toast: ToastController
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

  createFamily() {
    this.familyApi.createFamily({
      surname: this.surname
    }).subscribe(
      (data: any)=> {
        this.familyApi.addMemberToFamily(this.profile_id, {
          family: data._id
        }).subscribe(
          data=>{
            console.log("Vinculando a família com o profile que criou ela: ", data);
            this.showToast("Familia criada com sucesso!", 2000, "dark");
            this.modalController.dismiss();
          },
          error=> {
            this.showToast("Ocorreu um erro tente novamente!", 2000, "danger");
          }
        )
      },
      error=> {
        this.showToast("Erro ao criar família", 2000, "danger");
      }
    )
  }

  ngOnInit() {
  }

}
