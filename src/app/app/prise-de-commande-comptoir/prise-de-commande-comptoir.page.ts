import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { CollectionName } from 'src/app/enums/CollectionName';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-prise-de-commande-comptoir',
  templateUrl: './prise-de-commande-comptoir.page.html',
  styleUrls: ['./prise-de-commande-comptoir.page.scss'],
})
export class PriseDeCommandeComptoirPage implements OnInit {

  tables : any;
  settings : any;

  constructor(private firestore : FirestoreService,
              private alertController : AlertController,
              private navigate : NavController) { 

  }

  ngOnInit() {
    this.getSettings();
    this.getTables();
  }

  async getTables(){
    (await this.firestore.getAll(CollectionName.Tables)).subscribe((tables : any) => {
      this.tables = tables.filter((table:any) => table.isActif)
    });
  }

  async getSettings(){
    (await this.firestore.getAll(CollectionName.Settings)).subscribe((settings : any) => {
      this.settings = settings[0];
    });
  }

  navitageToPriseDeCommande(numeroTable : any, nomClientComptant? : any){
    if(nomClientComptant === undefined){
      this.navigate.navigateRoot("prise-de-commande/" + this.settings.token + "/" + numeroTable + "/" + '');
    }else{
      this.navigate.navigateRoot("prise-de-commande/" + this.settings.token + "/" + numeroTable + "/" + nomClientComptant);
    }
  }

  public async nomClientComptant(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Renseigner le nom du client',
      inputs: [
        {
          type : 'text',
          name : 'nom',
          placeholder : 'Nom du client'
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
            
            var nom = result.nom === '' ?  'Client comptant' : result.nom;

            this.navitageToPriseDeCommande('comptant', nom);
          }
        }
        
      ]
    });
    await alert.present();
  }


}
