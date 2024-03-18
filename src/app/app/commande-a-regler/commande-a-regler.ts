import { Component, OnInit } from '@angular/core';
import { CollectionName } from 'src/app/enums/CollectionName';
import { Commandes } from 'src/app/models/Commandes';
import { Plats } from 'src/app/models/Plats';
import { Tables } from 'src/app/models/Tables';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-commande-a-regler',
  templateUrl: './commande-a-regler.page.html',
  styleUrls: ['./commande-a-regler.page.scss'],
})
export class CommandeAReglerPage implements OnInit {

  commandes : Array<Commandes> = [];
  plats : Array<Plats> = [];
  tables : Array<Tables> = []
  tableSelection = undefined;
  ARegler : any[] = [];

  constructor(private firestore : FirestoreService,
              private utility : UtilityService) { }

  async ngOnInit() {
    await this.getCommandes();
    await this.getPlats();
  }

  voirCommentaire(commande : Commandes){
    if(commande.commentaire !== ''){
      this.utility.popMessage('Client : ' + commande.commentaire);
    }
    if(commande.commentairePreparateur !== ''){
      this.utility.popMessage('Préparteur : ' + commande.commentairePreparateur);
    }
  }

  commandeARegler(event: any, commande: Commandes) {
    if (event.detail.checked) {
      this.ARegler.push(commande);
    } else {
      const index = this.ARegler.indexOf(commande);
      if (index !== -1) {
        this.ARegler.splice(index, 1);
      }
    }
  }

  async getCommandes(){
    (await this.firestore.getAll(CollectionName.Commandes)).subscribe((commandes : any) => {

      if(this.tableSelection === undefined || this.tableSelection === "all"){
        this.commandes = commandes.filter((commande:any) => commande.isActif && commande.isPrepare && commande.isLivre && !commande.isRegle);
      }else{
        this.commandes = commandes.filter((commande:any) => commande.isActif && commande.isPrepare && commande.isLivre && !commande.isRegle && commande.numeroTable === this.tableSelection);
      }
      this.getTables(commandes)
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

  passerEtapePreparation(commande : Commandes){
    commande.isPrepare = false;
    commande.isLivre = false;
    this.firestore.put(
      CollectionName.Commandes,
      commande.id,
      commande
    );
  }

  passerEtapeLivraison(commande : Commandes){
    commande.isLivre = false;
    this.firestore.put(
      CollectionName.Commandes,
      commande.id,
      commande
    );
  }

  regler(commande : Commandes, ismultiple = false){
    commande.isRegle = true;
    this.firestore.put(
      CollectionName.Commandes,
      commande.id,
      commande
    );
    
    if(!ismultiple){
      this.utility.popMessage('Les commandes ont bien été réglées');
    }
  }

  reglerMultiCommande(){
    if(this.ARegler.length > 0){
      for(let commande of this.ARegler){
        this.regler(commande, true);
      }
      this.utility.popMessage('Les commandes ont bien été réglées');
    }
  }

  async getTables(commandes : Array<Commandes>) {
    const tableNumbersSet = new Set<any>(); 
    commandes.forEach(commande => {
      tableNumbersSet.add(commande.numeroTable);
    });
    this.tables =  Array.from(tableNumbersSet);
  }

  async tableSelected(event: CustomEvent) {
    this.tableSelection = event.detail.value; // Récupère la valeur sélectionnée
    await this.getCommandes();
  }

}
