import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private alertController :AlertController) { }

  public generateKey(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  public async popMessage(message : string){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: message,
      buttons: [
        {
          text: 'Fermer',
          handler: () => {

          }
        }
        
      ]
    });
    await alert.present();
  }
}
