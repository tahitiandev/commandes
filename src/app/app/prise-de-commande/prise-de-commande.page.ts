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
  isSetQuantite = false;
  isModeImage = false;
  plat : any;
  tableid = 0;

  constructor(private firestore : FirestoreService,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.getPlats();
    this.tableid = this.route.snapshot.params['id'];
  }

  async getPlats(){
    (await this.firestore.getAll(CollectionName.Plats)).subscribe((plats : any) => {
      this.plats = plats.filter((plat:any) => plat.isActif)
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
