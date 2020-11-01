import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../api/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string = "";
  email: string  = "";
  password: string  = "";
  age: number;

  constructor(
    private toast: ToastController,
    private authApi: AuthService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
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

  register() {
    console.log({
      name: this.name,
      email: this.email,
      password: this.password,
      age: parseInt(String(this.age))
    })
    if(this.name, this.email, this.age, this.password){
      if (this.age > 0 && this.age < 135){console.log("AGE")}
        else return this.showToast('Preencha adequadamente todos os campos!', 4000, "danger");
      if (this.name.length > 2){console.log("NAME")}
        else return this.showToast('Preencha adequadamente todos os campos!', 4000, "danger");
      if (this.password.length >= 8){console.log("PASSWORD")}
        else  return this.showToast('Preencha adequadamente todos os campos!', 4000, "danger");
      if (this.email.length > 5 && this.email.includes(".") && this.email.includes("@")){console.log("EMAIL")}
        else return this.showToast('Preencha adequadamente todos os campos!', 4000, "danger");
      this.authApi.register({
        name: this.name,
        email: this.email,
        password: this.password,
        age: parseInt(String(this.age))
      }).subscribe(
        data=>{
          this.showToast('Registrado com sucesso!', 4000, "dark");
          this.navCtrl.navigateForward('/');
        },
        error=>{
          this.showToast('Erro ao registrar', 4000, "danger");
        }
      )
    } else return this.showToast('Preencha adequadamente todos os campos!', 4000, "danger");
  }

}
