import { Component, OnInit } from '@angular/core';
import { CollectionName } from 'src/app/enums/CollectionName';
import { Commandes } from 'src/app/models/Commandes';
import { Plats } from 'src/app/models/Plats';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-commande-cloturee',
  templateUrl: './commande-cloturee.page.html',
  styleUrls: ['./commande-cloturee.page.scss'],
})
export class CommandeClotureePage implements OnInit {

  commandes : Array<Commandes> = [];
  plats : Array<Plats> = [];

  constructor(private firestore : FirestoreService) { }

  async ngOnInit() {
    await this.getCommandes();
    await this.getPlats();
  }

  async getCommandes(){
    (await this.firestore.getAll(CollectionName.Commandes)).subscribe((commandes : any) => {
      this.commandes = commandes.filter((commande:any) => commande.isRegle);
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
