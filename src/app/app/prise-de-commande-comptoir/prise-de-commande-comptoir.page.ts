import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CollectionName } from 'src/app/enums/CollectionName';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-prise-de-commande-comptoir',
  templateUrl: './prise-de-commande-comptoir.page.html',
  styleUrls: ['./prise-de-commande-comptoir.page.scss'],
})
export class PriseDeCommandeComptoirPage implements OnInit {

  tables : any;
  settings : any;

  constructor(private firestore : FirestoreService,
              private navigate : NavController) { 

  }

  ngOnInit() {
    this.getSettings();
    this.getTables();
  }

  async getTables(){
    (await this.firestore.getAll(CollectionName.Tables)).subscribe((tables : any) => {
      this.tables = tables.filter((table:any) => table.isActif)
    });
  }

  async getSettings(){
    (await this.firestore.getAll(CollectionName.Settings)).subscribe((settings : any) => {
      this.settings = settings[0];
    });
  }

  navitageToPriseDeCommande(numeroTable : any){
    this.navigate.navigateRoot("prise-de-commande/" + this.settings.token + "/" + numeroTable);
  }


}
