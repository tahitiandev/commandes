import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CollectionName } from 'src/app/enums/CollectionName';
import { ModeReglement } from 'src/app/enums/ModeReglements';
import { Commandes } from 'src/app/models/Commandes';
import { Plats } from 'src/app/models/Plats';
import { Reglements } from 'src/app/models/Reglements';
import { Tables } from 'src/app/models/Tables';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UtilityService } from 'src/app/services/utility.service';

interface DetailReglement{
  modeReglement : ModeReglement,
  montant : number
}
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
  totalFacture = 0;
  totalReglement = 0;
  detailReglements : DetailReglement[] = [];
  groupeCommande = this.utility.generateKey();
  montantRendu = 0;

  constructor(private firestore : FirestoreService,
              private alertController : AlertController,
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

  retirerReglement(detailReglement : DetailReglement){
    const index = this.detailReglements.indexOf(detailReglement);
      if (index !== -1) {
        this.detailReglements.splice(index, 1);
      }
      this.calculeTotalAPayer();
      this.calculeTotalReglement();
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
    this.calculeTotalAPayer();
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

  passerEtapePreparationMultiple(){
    for(let commande of this.ARegler){
      this.passerEtapePreparation(commande);
    }
    this.utility.popMessage('Les commandes ont été remises à l\'étape Préparation');
    this.ARegler = [];
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

  passerEtapeLivraisonMultiple(){
    for(let commande of this.ARegler){
      this.passerEtapeLivraison(commande);
    }
    this.utility.popMessage('Les commandes ont été remises à l\'étape Livraison');
    this.ARegler = [];
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
        commande.groupeCommande = this.groupeCommande;
        this.regler(commande, true);
      }

      for(let detailReglement of this.detailReglements){

        var reglement : Reglements = {
          id : this.utility.generateKey(),
          modeReglement : detailReglement.modeReglement,
          montant : detailReglement.montant,
          groupeCommande : this.groupeCommande
        }
  
        this.firestore.post(
          CollectionName.Reglements,
          reglement,
          reglement.id
        )
  
      }

      if(this.totalReglement > this.totalFacture){
        var reglement : Reglements = {
          id : this.utility.generateKey(),
          modeReglement : ModeReglement.Espece,
          montant : this.totalReglement - this.totalFacture,
          groupeCommande : this.groupeCommande,
          isRendu : true
        }
        this.firestore.post(
          CollectionName.Reglements,
          reglement,
          reglement.id
        )
      }
  
      this.detailReglements = [];
      this.ARegler = [];
      this.montantRendu = 0;
      this.groupeCommande = this.utility.generateKey(); // new groupeCommande
      this.utility.popMessage('Les commandes ont bien été réglées');      
    }
  }

  async chooseModeReglement(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ajouter une famille',
      inputs: [
        {
          type : 'radio',
          label : 'Espèce',
          value : ModeReglement.Espece
        },
        {
          type : 'radio',
          label : 'CB',
          value : ModeReglement.CB
        },
        {
          type : 'radio',
          label : 'Carte local',
          value : ModeReglement.CarteLocal
        },
        {
          type : 'radio',
          label : 'Virement',
          value : ModeReglement.Virement
        },
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
          handler: async (modeReglement : ModeReglement) => {
            this.setMontantAregler(modeReglement);
          }
        }
        
      ]
    });
    await alert.present();
  }

  async setMontantAregler(modeReglement : ModeReglement){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Montant à régler',
      inputs: [
        {
          type : 'number',
          name : 'montant',
          placeholder : 'Montant'
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
          handler: async (response : any) => {

            this.detailReglements.push({
              modeReglement : modeReglement,
              montant : response.montant
            })

            this.montantRendu = Number(this.totalReglement - this.totalFacture);

            this.calculeTotalReglement()
          }
        }
        
      ]
    });
    await alert.present();

  }

  public calculeTotalAPayer(){
    var totalFacture = 0;
    for(let commande of this.ARegler){
      var plat = this.plats.filter(plat => plat.id === commande.platid);
      totalFacture += commande.quantite * plat[0].prix;
    }
    this.totalFacture = totalFacture;
  }

  public calculeTotalReglement(){
    var totalReglement = 0;
    for(let detailReglement of this.detailReglements){
      totalReglement += Number(detailReglement.montant);
    }
    this.totalReglement = totalReglement;
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
