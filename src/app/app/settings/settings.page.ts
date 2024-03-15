import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CollectionName } from 'src/app/enums/CollectionName';
import { Settings } from 'src/app/models/Settings';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  settings : Settings = {
    id : 'devsetting',
    environnement : 'https://localhost:8001',
    token : ''
  }

  constructor(private firestore : FirestoreService,
              private utility : UtilityService,
              private alertController : AlertController) { }

  async ngOnInit() {
    await this.getSettings();
  }

  async getSettings(){
    (await this.firestore.getAll(CollectionName.Settings)).subscribe((settings : any) => {
      this.settings = settings[0];
    });
  }

  public putSettings(settings:Settings){
    this.firestore.post(CollectionName.Settings,
      settings, settings.id)
  }

  public async exemple(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ajouter une famille',
      inputs: [
        {
          type : 'text',
          name : 'libelle',
          placeholder : 'Libellé'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }
        ,{
          text: 'Valider',
          handler: async (result : any) => {

          }
        }
        
      ]
    });
    await alert.present();
  }

  public async putEnvironnement(environnemnet : string){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modifier l\'environnement',
      inputs: [
        {
          type : 'text',
          name : 'environnement',
          placeholder : environnemnet
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }
        ,{
          text: 'Valider',
          handler: async (result : any) => {

            var environnement = result.environnement === '' ? environnemnet : result.environnement
            this.settings.environnement = environnement;
            this.putSettings(this.settings);

          }
        }
        
      ]
    });
    await alert.present();
  }

  public async putToken(){
    var token = this.utility.generateKey();
    this.settings.token = token;
    this.putSettings(this.settings);
  }

}
