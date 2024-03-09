import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { CollectionName } from 'src/app/enums/CollectionName';
import { Familles } from 'src/app/models/Familles';
import { Plats } from 'src/app/models/Plats';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-plat-put',
  templateUrl: './plat-put.component.html',
  styleUrls: ['./plat-put.component.scss'],
})
export class PlatPutComponent  implements OnInit {

  @Input() platInput : any;
  @Output() annulerOuput= new EventEmitter<any>();

  formgroup! : FormGroup;
  familles : any;

  constructor(private formbuilder : FormBuilder,
              private firestore : FirestoreService,
              private utility : UtilityService,
              private alertController : AlertController) { }

  async ngOnInit() {
    await this.init();
    (await this.firestore.getAll(CollectionName.Familles)).subscribe(familles => this.familles = familles)
  }

  async init(){
    this.formgroup = this.formbuilder.group({
      intitule : this.platInput.libelle,
      description : this.platInput.description,
      prix : this.platInput.prix,
      famille : this.platInput.famille,
      isActif : this.platInput.isActif
    })
  }

  async valider(){
    var value = this.formgroup.value;
    var plat : Plats = this.platInput;
    plat.libelle = value.intitule;
    plat.description = value.description;
    plat.prix = value.prix;
    plat.famille = value.famille;
    
    await this.firestore.put(
      CollectionName.Plats,
      plat.id,
      plat
    )
    
    this.annuler();
  }

  annuler(){
    this.annulerOuput.emit();
  }

  public async postFamille(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ajouter une famille',
      inputs: [
        {
          type : 'text',
          name : 'libelle',
          placeholder : 'Libellé'
        }
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
          handler: async (result : any) => {

            if(result.libelle !== ""){
              var id = this.utility.generateKey();
  
              await this.firestore.post(
                CollectionName.Familles,
                {
                  id : id,
                  libelle : result.libelle
                },
                id
              )            
            }          

          }
        }
        
      ]
    });
    await alert.present();
  }

}
