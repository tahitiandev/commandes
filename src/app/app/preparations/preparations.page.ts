import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CollectionName } from 'src/app/enums/CollectionName';
import { Commandes } from 'src/app/models/Commandes';
import { Plats } from 'src/app/models/Plats';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-preparations',
  templateUrl: './preparations.page.html',
  styleUrls: ['./preparations.page.scss'],
})
export class PreparationsPage implements OnInit {

  commandes : Array<Commandes> = [];
  plats : Array<Plats> = [];
  ALivrer : Array<Commandes> = [];

  constructor(private firestore : FirestoreService,
              private alertController : AlertController,
              private utility : UtilityService) { }

  async ngOnInit() {
    await this.getCommandes();
    await this.getPlats();
  }

  async getCommandes(){
    (await this.firestore.getAll(CollectionName.Commandes)).subscribe((commandes : any) => {
      this.commandes = commandes.filter((commande:any) => commande.isActif && !commande.isPrepare);
    });
  }

  async getPlats(){
    (await this.firestore.getAll(CollectionName.Plats)).subscribe((plats : any) => {
      this.plats = plats.filter((plat:any) => plat.isActif)
    });
  }

  getLibellePlatById(platid: any) {
    if (!platid) return ""; // Vérifier si platid est défini

    var plats: Array<Plats> = this.plats;
    var plat: Plats | undefined = plats.find(plat => plat.id === platid);
    return plat?.libelle || ""; // Retourner le libellé du plat ou une chaîne vide si le plat n'est pas trouvé
  }

  CommandeALivrer(event: any, cmd: Commandes) {
    if (event.detail.checked) {
      this.ALivrer.push(cmd);
    } else {
      const index = this.ALivrer.indexOf(cmd);
      if (index !== -1) {
        this.ALivrer.splice(index, 1);
      }
    }
  }

  terminerMultiple(){
    for(let commande of this.ALivrer){
      this.terminer(commande);
    }
    this.ALivrer = [];
    this.utility.popMessage('Les commandes sont bien passées à l\'étape de livraison')
  }

  terminer(commande : Commandes){
    commande.isPrepare = true;
    this.firestore.put(
      CollectionName.Commandes,
      commande.id,
      commande
    );
  }

  async commentairePreparateur(commande : Commandes){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ajouter une famille',
      inputs: [
        {
          type : 'text',
          name : 'commentaire',
          placeholder : 'Commentaire'
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
            if(result.commentaire !== ''){
              commande.commentairePreparateur = result.commentaire;
              this.firestore.put(
                CollectionName.Commandes,
                commande.id,
                commande
              );
            }
          }
        }
        
      ]
    });
    await alert.present();
  }

  voirCommentaire(commande : Commandes){
    if(commande.commentaire !== ''){
      this.utility.popMessage(commande.commentaire);
    }
  }
}
