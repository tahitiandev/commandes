import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CollectionName } from 'src/app/enums/CollectionName';
import { Commandes } from 'src/app/models/Commandes';
import { Familles } from 'src/app/models/Familles';
import { Plats } from 'src/app/models/Plats';
import { Settings } from 'src/app/models/Settings';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UtilityService } from 'src/app/services/utility.service';

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
  tablenumero : any = '';
  token = "";
  nomClientComptant = '';
  compteurPanier = 0;
  settings : any;
  familles : Array<Familles> = [];

  constructor(private firestore : FirestoreService,
              private utility : UtilityService,
              private navigate : NavController,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.tablenumero = this.route.snapshot.params['id'];
    this.token = this.route.snapshot.params['token'];
    this.nomClientComptant = this.route.snapshot.params['clientComptant'];
    this.getSettings();
    this.getPlats();
    this.getCommandes();
    this.getFamilles();
  }
  
  private async checkRoute(){
    if(this.token !== this.settings.token){
      await this.utility.popMessage('La route est invalide');
      this.navigate.navigateRoot('home')
    }
  }

  async getPlats(){
    (await this.firestore.getAll(CollectionName.Plats)).subscribe((plats : any) => {
      this.plats = plats.filter((plat:any) => plat.isActif)
    });
  }

  async getFamilles(){
    (await this.firestore.getAll(CollectionName.Familles)).subscribe((familles : any) => {
      familles.sort((a: Familles, b: Familles) => a.ordre - b.ordre);
      this.familles = familles;
    });
  }

  async getSettings(){
    (await this.firestore.getAll(CollectionName.Settings)).subscribe((settings : any) => {
      this.settings = settings[0];
      this.checkRoute();
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
