import { Component, OnInit } from '@angular/core';
import { CollectionName } from 'src/app/enums/CollectionName';
import { Plats } from 'src/app/models/Plats';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UtilityService } from 'src/app/services/utility.service';

interface menuResponse{
  intitule : string;
  description : string;
  prix : number;
  isActif : boolean;
  famille : string;
}

@Component({
  selector: 'app-menus',
  templateUrl: './menus.page.html',
  styleUrls: ['./menus.page.scss'],
})
export class MenusPage implements OnInit {

  plats : Array<Plats> = [];
  isModePost = false;
  isModePut = false;
  isModeImage = false;
  platupdate : any;

  constructor(private utility : UtilityService,
              private firestore : FirestoreService) { }

  async ngOnInit() {
    await this.getPlats();
  }

  async getPlats(){
    (await this.firestore.getAll(CollectionName.Plats)).subscribe((plats : any) => {
      this.plats = plats
    });
  }

  setIsModePost(){
    this.isModePost = !this.isModePost;
  }

  setIsModePut(){
    this.isModePut = !this.isModePut;
  }

  setIsModeImage(){
    this.isModeImage = !this.isModeImage;
  }

  async post(response : menuResponse){

    this.setIsModePost();
    
    var id = this.utility.generateKey();

    const plat : Plats = {
      id : id,
      libelle : response.intitule,
      description : response.description,
      photo : '',
      prix : response.prix,
      isActif : response.isActif,
      famille : response.famille,
      isFirebase : false,
      createdOn : new Date(),
      createdBy : '0'
    }

    await this.firestore.post(
      CollectionName.Plats,
      plat,
      plat.id.toString()
    )
  }

  put(plat : Plats){
    this.platupdate = plat;
    this.isModePut = !this.isModePut;    
  }


}
