import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CollectionName } from 'src/app/enums/CollectionName';
import { Commandes } from 'src/app/models/Commandes';
import { Plats } from 'src/app/models/Plats';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss'],
})
export class PanierComponent  implements OnInit {

  @Input() commandes : any;
  @Output() closeOuput = new EventEmitter<any>();
  plats : any;

  constructor(private firestore : FirestoreService) { }

  async ngOnInit() {
    await this.getPlats();
  }

  async getPlats(){
    (await this.firestore.getAll(CollectionName.Plats)).subscribe((plats : any) => {
      this.plats = plats;
    });
  }

  getLibellePlatById(platid : any){
    var plats : Array<Plats> = this.plats;
    var plat : Plats | undefined = plats.find(plat => plat.id === platid);
    return plat?.libelle;
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

}
