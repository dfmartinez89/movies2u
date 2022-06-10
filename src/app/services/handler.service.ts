import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class HandlerService {
  constructor(public alertController: AlertController) {}

  async infoAlert(message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
