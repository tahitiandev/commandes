import { Component, OnInit } from '@angular/core';
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


  constructor(private firestore : FirestoreService,
              private utility : UtilityService) { }

  async ngOnInit() {
    await this.getTables();
    await this.generateNumeroTable();
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

}
