import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { CollectionName } from 'src/app/enums/CollectionName';
import { ModeReglement } from 'src/app/enums/ModeReglements';
import { Commandes } from 'src/app/models/Commandes';
import { Plats } from 'src/app/models/Plats';
import { Reglements } from 'src/app/models/Reglements';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss'],
})
export class PanierComponent  implements OnInit {

  @Input() commandes : Array<Commandes> = [];
  @Output() closeOuput = new EventEmitter<any>();
  plats : any;
  total = 0;

  constructor(private firestore : FirestoreService,
              private alertController : AlertController,
              private nav : NavController,
              private utility : UtilityService) { }

  async ngOnInit() {
    await this.getPlats();
  }

  async getPlats(){
    (await this.firestore.getAll(CollectionName.Plats)).subscribe((plats : any) => {
      this.plats = plats;
    });
  }

  getLibellePlatById(platid: any) {
    if (!platid) return ""; // Vérifier si platid est défini

    var plats: Array<Plats> = this.plats;
    var plat: Plats | undefined = plats.find(plat => plat.id === platid);
    return plat?.libelle || ""; // Retourner le libellé du plat ou une chaîne vide si le plat n'est pas trouvé
  }

  async updateCommentaire(commande : Commandes){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modifier le commentaire',
      inputs: [
        {
          type : 'text',
          name : 'commentaire',
          placeholder : commande.commentaire
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
            var commentaire = result.commentaire === '' ? commande.commentaire : result.commentaire;
            commande.commentaire = commentaire;
            this.firestore.put(
              CollectionName.Commandes,
              commande.id,
              commande
            )
          }
        }
        
      ]
    });
    await alert.present();
  }

  calculeTotalLigne(commande : Commandes){
    var plats : Array<Plats> = this.plats;
    var plat = plats.find(plat => plat.id === commande.platid);
    var prix = plat?.prix === undefined ? 0 : plat?.prix;
    return prix * commande.quantite;

  }

  fermer(){
    this.closeOuput.emit();
  }

  retirer(commande :  Commandes){
    this.firestore.delete(
      CollectionName.Commandes,
      commande.id,
      commande
    )
  }

  calculeTotal(){
    var commandes : Array<Commandes> = this.commandes;
    var plats : Array<Plats> = this.plats;
    var total = 0;

    for(let commande of commandes){
      var plat = plats.filter(plat => plat.id === commande.platid);
      total += commande.quantite * plat[0].prix;
    }

    return total;
  }

  async chooseModeReglement(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Choisir le mode de paiement',
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
          text: 'Regler',
          handler: async (modeReglement : ModeReglement) => {

            var groupeCommande = this.utility.generateKey();

            for(let commande of this.commandes){
              commande.isActif = true;
              commande.isLivre  = true;
              commande.isPrepare = true;
              commande.isRegle = true;
              commande.groupeCommande = groupeCommande;
              this.firestore.put(
                CollectionName.Commandes,
                commande.id,
                commande
              );
            }

            var reglement : Reglements = {
              id : this.utility.generateKey(),
              montant : this.calculeTotal(),
              isRendu : false,
              modeReglement : modeReglement,
              groupeCommande : groupeCommande
            }

            this.firestore.post(
              CollectionName.Reglements,
              reglement,
              reglement.id
            )

            this.utility.popMessage('Votre commande a bien été réglée');
            this.nav.navigateRoot('comptoir')
          }
        }
        
      ]
    });
    await alert.present();
  }

  valider(){

    if(this.commandes.length > 0){

      this.commandes.map(async(commande) => {
        commande.isActif = true;
        await this.firestore.put(
          CollectionName.Commandes,
          commande.id,
          commande
          )
        });
        this.utility.popMessage('Votre commande a bien été envoyée');
        this.nav.navigateRoot('comptoir')
      }else{
        this.utility.popMessage('Votre panier ne contient aucune commande');
        this.fermer();
      }
  }

}
