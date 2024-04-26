import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CollectionName } from 'src/app/enums/CollectionName';
import { Tables } from 'src/app/models/Tables';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UtilityService } from 'src/app/services/utility.service';

interface tableReponse{
  numero : number;
  isActif : boolean;
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.page.html',
  styleUrls: ['./tables.page.scss'],
})


export class TablesPage implements OnInit {

  tables : Array<Tables> = [];
  isPostTable = false;
  numeroTable : any;
  ligneLenght = 5;
  columsLenght = 5;
  lignes : Array<number> = [];
  colums : Array<number>  = [];


  constructor(private firestore : FirestoreService,
              private alertController : AlertController,
              private utility : UtilityService) { }

  async ngOnInit() {
    await this.getTables();
    await this.generateNumeroTable();
    this.refreshEchelle();
    
  }

  refreshEchelle(){
    this.lignes = [];
    for(var i = 0; i < this.ligneLenght;i++){
      this.lignes.push(i);
    }
    this.colums = [];
    for(var i = 0; i < this.columsLenght;i++){
      this.colums.push(i);
    }
  }

  async getTables(){
    (await this.firestore.getAll(CollectionName.Tables)).subscribe((tables : any) => {
      this.tables = tables
    });
  }

  private getDernierNumeroTable(tables: Tables[]): number {
    if (tables.length === 0) {
        return 1; // Si le tableau est vide, retourne 0
    }

    // Trie le tableau par ordre décroissant en fonction de l'ID
    tables.sort((a, b) => b.numero - a.numero);

    // Retourne le numéro de table du premier élément du tableau trié
    return tables[0].numero + 1;
}

  private async generateNumeroTable(){
    this.numeroTable = this.getDernierNumeroTable(this.tables);
  }

  async post(response : tableReponse){
    this.setIsPostTable();

    var id = this.utility.generateKey();

    const table : Tables = {
      id : id,
      numero : response.numero,
      nombreCommande : 0,
      isActif : response.isActif,
      isFirebase : false,
      createdOn : new Date(),
      createdBy : '0'
    }

    await this.firestore.post(
      CollectionName.Tables,
      table,
      table.id.toString()
    )
  }

  setIsPostTable(){
    this.generateNumeroTable();
    this.isPostTable = !this.isPostTable;
  }

  async putIsActif(table : Tables){
    table.isActif = !table.isActif;
    await this.firestore.put(
      CollectionName.Tables,
      table.id.toString(),
      table
    )
  }

  delete(table : Tables){
    this.firestore.delete(
      CollectionName.Tables,
      table.id,
      table
    )
  }

  async configEchelle(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Choisir le mode de paiement',
      inputs: [
        {
          type : 'number',
          label : 'Ligne',
          name: 'ligne',
          value : this.ligneLenght
        },
        {
          type : 'number',
          label : 'Colonne',
          name: 'colonne',
          value : this.columsLenght
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
          handler: result => {
            this.ligneLenght = result.ligne;
            this.columsLenght = result.colonne;
            this.refreshEchelle();
            
          }
        }
        
      ]
    });
    await alert.present();
  }

}
