import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FamilyService } from '../api/family.service';

@Component({
  selector: 'app-edit-family-modal',
  templateUrl: './edit-family-modal.page.html',
  styleUrls: ['./edit-family-modal.page.scss'],
})
export class EditFamilyModalPage implements OnInit {

  @Input() family: any;
  surname: string = "";

  constructor(
    public modalController: ModalController,
    private familyApi: FamilyService,
    private toast: ToastController,
  ) { }

  ngOnInit() {
    this.surname = this.family.surname;
  }

  async showToast(message, duration, color="light") {
    const toast = await this.toast.create({
      message: message,
      duration: duration,
      position: "top",
      color: color
    });
    toast.present();
  }

  saveFamily() {
    if(this.surname.length < 2) {
      this.showToast("O sobrenome deve ter pelo menos 2 caracteres.", 4000, 'danger');
      return;
    }
    this.familyApi.updateFamily(this.family._id, {
      surname: this.surname
    }).subscribe(
      data=> {
        this.showToast("Familia atualizada com sucesso!", 2000, "dark");
        this.modalController.dismiss();
      },
      error=>{
        this.showToast("Erro ao atualizar família", 4000, 'danger');
      }
    )
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
