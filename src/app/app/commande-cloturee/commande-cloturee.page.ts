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
  groupeCommandes : Array<any> = [];


  constructor(private firestore : FirestoreService,
              private alertController : AlertController) { }

  async ngOnInit() {
    await this.getCommandes();
    await this.getPlats();
    await this.getReglements();
  }

  async getCommandes(){
    (await this.firestore.getAll(CollectionName.Commandes)).subscribe((commandes : any) => {
      // Filtrer les commandes réglées et les stocker dans this.commandes
      this.commandes = commandes.filter((commande:any) => commande.isRegle);
      // Appeler la fonction avec les commandes réglées seulement
      this.obtenirGroupesCommandeSansDoublon(this.commandes);
    });
}

obtenirGroupesCommandeSansDoublon(commandes: Commandes[]) {
  // Création d'un ensemble pour stocker les groupes de commande uniques
  const groupesSet = new Set<string>();

  // Filtrage des doublons et ajout des groupes uniques à l'ensemble
  for(let commande of commandes){
    if (commande.groupeCommande) {
        groupesSet.add(commande.groupeCommande);
    }
  }

  // Conversion de l'ensemble en tableau et tri par ordre décroissant de createdOn
  const groupeCommande = Array.from(groupesSet).sort((a, b) => {
      // Obtention de la date la plus récente pour chaque groupe de commande
      const dateA = new Date((commandes.find(cmd => cmd.groupeCommande === a)?.createdOn ?? 0) as any);
      const dateB = new Date((commandes.find(cmd => cmd.groupeCommande === b)?.createdOn ?? 0) as any);

      // Comparaison des dates dans l'ordre décroissant
      return dateB.getTime() - dateA.getTime();
  });

  this.groupeCommandes = groupeCommande;
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

  getPrixByPlatId(platid: any) {
    const plat = this.plats.find(plat => plat.id === platid);
    return plat ? plat.prix : 0; // ou une valeur par défaut si nécessaire
}

  getTotalByGroupeCommande(groupeCommande : any){
    var total = 0;
    var commandes = this.commandes.filter(commade => commade.groupeCommande === groupeCommande);
    for(let commande of commandes){
      total += Number(this.getPrixByPlatId(commande.platid));
    }
    return total;
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
