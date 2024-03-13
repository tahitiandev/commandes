import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionName } from 'src/app/enums/CollectionName';
import { Plats } from 'src/app/models/Plats';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-prise-de-commande',
  templateUrl: './prise-de-commande.page.html',
  styleUrls: ['./prise-de-commande.page.scss'],
})
export class PriseDeCommandePage implements OnInit {

  plats : any;
  commandes : Array<any> = [];
  isSetQuantite = false;
  isModeImage = false;
  plat : any;
  tableid = 0;
  compteurPanier = 0;

  constructor(private firestore : FirestoreService,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.tableid = this.route.snapshot.params['id'];
    this.getPlats();
    this.getCommandes();
  }

  async getPlats(){
    (await this.firestore.getAll(CollectionName.Plats)).subscribe((plats : any) => {
      this.plats = plats.filter((plat:any) => plat.isActif)
    });
  }

  async getCommandes(){
    (await this.firestore.getAll(CollectionName.Commandes)).subscribe((commandes : any) => {
      this.commandes = commandes.filter((commande:any) => commande.tableid === this.tableid && commande.isActif);
      this.compteurPanier = this.commandes.length;
    });
  }

  setIsModeImage(){
    this.isModeImage = !this.isModeImage;
  }

  setIsSetQuantite(){
    this.isSetQuantite = !this.isSetQuantite;
  }

  setQuantite(plat : Plats){
    this.setIsSetQuantite();
    this.plat = plat;
  }


}
