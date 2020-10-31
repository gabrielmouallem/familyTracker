import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { apiURL } from 'src/env';
import { AuthService } from '../api/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(
    private navCtrl: NavController,
    private toast: ToastController,
    private authApi: AuthService
  ) { }

  ngOnInit() {
  }

  navigateToMainPage() {
    this.navCtrl.navigateForward('/main');
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

  doLogin() {
    if (!this.email || !this.password ) {
      this.showToast('Insira seu email e senha', 3000);
    } else {
        this.authApi.login({
          email: this.email,
          password: this.password
        }).subscribe(
          data=>{
            this.showToast('Bem vindo ao Family Tracker!', 2000, "dark");
            this.navigateToMainPage();
          },
          error=> {
            this.showToast('Erro ao tentar entrar!', 4000);
          }
        )
    }
  }

}
