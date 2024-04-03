import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CollectionName } from 'src/app/enums/CollectionName';
import { Familles } from 'src/app/models/Familles';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-familles',
  templateUrl: './familles.page.html',
  styleUrls: ['./familles.page.scss'],
})
export class FamillesPage implements OnInit {

  familles : Array<Familles> = [];

  constructor(private firestore : FirestoreService,
              private alertController : AlertController) { }

  ngOnInit() {
    this.getFamilles();
  }

  async getFamilles(){
    (await this.firestore.getAll(CollectionName.Familles)).subscribe((familles : any) => {
      this.familles = familles;
    })
  }

  delete(famille : Familles){
    this.firestore.delete(
      CollectionName.Familles,
      famille.id,
      famille
    )
  }

  public async put(famille : Familles){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modifier une famille',
      inputs: [
        {
          type : 'text',
          name : 'libelle',
          placeholder : famille.libelle
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

            var libelle = result.libelle === '' ? famille.libelle : result.libelle;
            famille.libelle = libelle;
            
            this.firestore.put(
              CollectionName.Familles,
              famille.id,
              famille
            )

          }
        }
        
      ]
    });
    await alert.present();
  }

}
