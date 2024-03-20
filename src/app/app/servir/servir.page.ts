import { Component, OnInit } from '@angular/core';
import { CollectionName } from 'src/app/enums/CollectionName';
import { Commandes } from 'src/app/models/Commandes';
import { Plats } from 'src/app/models/Plats';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-servir',
  templateUrl: './servir.page.html',
  styleUrls: ['./servir.page.scss'],
})
export class ServirPage implements OnInit {

  commandes : Array<Commandes> = [];
  plats : Array<Plats> = [];
  ARegler : Array<Commandes> = [];
  isToutSelectionner = true;

  constructor(private firestore : FirestoreService,
              private utility : UtilityService) { }

  async ngOnInit() {
    await this.getCommandes();
    await this.getPlats();
  }

  async getCommandes(){
    (await this.firestore.getAll(CollectionName.Commandes)).subscribe((commandes : any) => {
      this.commandes = commandes.filter((commande:any) => commande.isActif && commande.isPrepare && !commande.isLivre);
    });
  }

  CommandeARegler(event: any, cmd: Commandes) {
    if (event.detail.checked) {
      this.ARegler.push(cmd);
    } else {
      const index = this.ARegler.indexOf(cmd);
      if (index !== -1) {
        this.ARegler.splice(index, 1);
      }
    }
  }

  terminerMultiple(){
    for(let commande of this.ARegler){
      this.terminer(commande);
    }
    this.ARegler = [];
    this.utility.popMessage('Les commandes ont bien été livrées')
  }

  remettreEnPreparationMultiple(){
    for(let commande of this.ARegler){
      this.remettreEnPreparation(commande);
    }
    this.ARegler = [];
    this.utility.popMessage('Les commandes ont été remises à l\'étape Préparation')
  }


  remettreEnPreparation(commande : Commandes){
    commande.isPrepare = false;
    this.firestore.put(
      CollectionName.Commandes,
      commande.id,
      commande
    )
  }

  toutSelectionnerDeselectionner(toutSelectionner : boolean) {
    if(toutSelectionner){
      this.ARegler = [...this.commandes];
      this.isToutSelectionner = !this.isToutSelectionner;
    }else{
      this.ARegler = [];
      this.isToutSelectionner = !this.isToutSelectionner;
    }
  }

  commandeSelectionnee(commande: Commandes): boolean {
    return this.ARegler.includes(commande);
  }

  async getPlats(){
    (await this.firestore.getAll(CollectionName.Plats)).subscribe((plats : any) => {
      this.plats = plats.filter((plat:any) => plat.isActif)
    });
  }

  voirCommentaire(commande : Commandes){
    if(commande.commentaire !== ''){
      this.utility.popMessage('Client : ' + commande.commentaire);
    }
    if(commande.commentairePreparateur !== ''){
      this.utility.popMessage('Préparteur : ' + commande.commentairePreparateur);
    }
  }

  getLibellePlatById(platid: any) {
    if (!platid) return ""; // Vérifier si platid est défini

    var plats: Array<Plats> = this.plats;
    var plat: Plats | undefined = plats.find(plat => plat.id === platid);
    return plat?.libelle || ""; // Retourner le libellé du plat ou une chaîne vide si le plat n'est pas trouvé
  }

  terminer(commande : Commandes){
    commande.isLivre = true;
    this.firestore.put(
      CollectionName.Commandes,
      commande.id,
      commande
    );
  }

}
