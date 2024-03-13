import { Component, OnInit } from '@angular/core';
import { CollectionName } from 'src/app/enums/CollectionName';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-prise-de-commande-comptoir',
  templateUrl: './prise-de-commande-comptoir.page.html',
  styleUrls: ['./prise-de-commande-comptoir.page.scss'],
})
export class PriseDeCommandeComptoirPage implements OnInit {

  tables : any;

  constructor(private firestore : FirestoreService) { }

  async ngOnInit() {
    await this.getTables();
  }

  async getTables(){
    (await this.firestore.getAll(CollectionName.Tables)).subscribe((tables : any) => {
      this.tables = tables.filter((table:any) => table.isActif)
    });
  }


}
