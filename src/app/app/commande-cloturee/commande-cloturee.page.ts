import { Component, OnInit } from '@angular/core';
import { AlertController, AlertInput } from '@ionic/angular';
import { CollectionName } from 'src/app/enums/CollectionName';
import { Commandes } from 'src/app/models/Commandes';
import { Plats } from 'src/app/models/Plats';
import { Reglements } from 'src/app/models/Reglements';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-commande-cloturee',
  templateUrl: './commande-cloturee.page.html',
  styleUrls: ['./commande-cloturee.page.scss'],
})
export class CommandeClotureePage implements OnInit {

  commandes : Array<Commandes> = [];
  reglements : Array<Reglements> = [];
  plats : Array<Plats> = [];
  commandesRegroupees: {[groupeCommande: string]: Commandes[]} = {};


  constructor(private firestore : FirestoreService,
              private alertController : AlertController) { }

  async ngOnInit() {
    await this.getCommandes();
    await this.getPlats();
    await this.getReglements();
  }

  async getCommandes() {
    (await this.firestore.getAll(CollectionName.Commandes)).subscribe((commandes: any) => {
      this.commandes = commandes.filter((commande: any) => commande.isRegle);
      // Regrouper les commandes par groupeCommande
      this.commandes.forEach(commande => {
        // Vérifier si la commande a une propriété groupeCommande
        if (commande.groupeCommande) {
          if (!this.commandesRegroupees[commande.groupeCommande]) {
            this.commandesRegroupees[commande.groupeCommande] = [];
          }
          this.commandesRegroupees[commande.groupeCommande].push(commande);
        }
      });
    });
  }

  async getReglements(){
    (await this.firestore.getAll(CollectionName.Reglements)).subscribe((reglements : any) => {
      this.reglements = reglements;
    });
  }

  async getPlats(){
    (await this.firestore.getAll(CollectionName.Plats)).subscribe((plats : any) => {
      this.plats = plats.filter((plat:any) => plat.isActif)
    });
  }

  getPrixByPlatId(platid : any){
    return this.plats.find(plat => plat.id === platid)?.prix;
  }

  async getReglementByGroupeCommande(groupeCommande :any){
    return await this.reglements.filter(reglement => reglement.groupeCommande === groupeCommande);
  }

  public async voirReglements(commande : Commandes){

    var inputs : Array<AlertInput> = [];
    var reglements = await this.getReglementByGroupeCommande(commande.groupeCommande);

    for(let reglement of reglements){
      inputs.push({
        type : 'radio',
        disabled : true,
        label : reglement.isRendu ? 'Rendu monnaie : -' + reglement.montant + ' xpf': reglement.modeReglement + ' - ' + reglement.montant + ' xpf'
      })
    }

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ajouter une famille',
      inputs: inputs,
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

  getLibellePlatById(platid: any) {
    if (!platid) return ""; // Vérifier si platid est défini

    var plats: Array<Plats> = this.plats;
    var plat: Plats | undefined = plats.find(plat => plat.id === platid);
    return plat?.libelle || ""; // Retourner le libellé du plat ou une chaîne vide si le plat n'est pas trouvé
  }

  passerEtapePreparation(commande : Commandes){
    commande.isPrepare = false;
    commande.isLivre = false;
    commande.isRegle = false;
    this.firestore.put(
      CollectionName.Commandes,
      commande.id,
      commande
    );
  }

  passerEtapeLivraison(commande : Commandes){
    commande.isLivre = false;
    commande.isRegle = false;
    this.firestore.put(
      CollectionName.Commandes,
      commande.id,
      commande
    );
  }

  passerEtapeNonRegle(commande : Commandes){
    commande.isRegle = false;
    this.firestore.put(
      CollectionName.Commandes,
      commande.id,
      commande
    );
  }

}
