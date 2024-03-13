import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionName } from 'src/app/enums/CollectionName';
import { Commandes } from 'src/app/models/Commandes';
import { Plats } from 'src/app/models/Plats';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-prise-de-commande',
  templateUrl: './prise-de-commande.page.html',
  styleUrls: ['./prise-de-commande.page.scss'],
})
export class PriseDeCommandePage implements OnInit {

  plats : any;
  commandes : Array<Commandes> = [];
  isSetQuantite = false;
  isModeImage = false;
  isPanier = false;
  plat : any;
  tablenumero = 0;
  compteurPanier = 0;

  constructor(private firestore : FirestoreService,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.tablenumero = this.route.snapshot.params['id'];
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
      this.commandes = commandes.filter((commande:any) => commande.numeroTable === this.tablenumero && !commande.isActif);
      this.compteurPanier = this.commandes.length;
    });
  }

  setIsModeImage(){
    this.isModeImage = !this.isModeImage;
  }

  setIsSetQuantite(){
    this.isSetQuantite = !this.isSetQuantite;
  }

  setIsPanier(){
    this.isPanier = !this.isPanier;
  }

  setQuantite(plat : Plats){
    this.setIsSetQuantite();
    this.plat = plat;
  }


}
