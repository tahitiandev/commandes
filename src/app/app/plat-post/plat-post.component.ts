import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { CollectionName } from 'src/app/enums/CollectionName';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-plat-post',
  templateUrl: './plat-post.component.html',
  styleUrls: ['./plat-post.component.scss'],
})
export class PlatPostComponent  implements OnInit {

  @Output() platOutput = new EventEmitter<any>();
  @Output() annulerOutput = new EventEmitter<any>();

  familles:any;

  formgroup! : FormGroup;

  constructor(private formbuilder : FormBuilder,
              private alertController : AlertController,
              private utility : UtilityService,
              private firestore : FirestoreService) { }

  async ngOnInit() {
    await this.init();
    (await this.firestore.getAll(CollectionName.Familles)).subscribe(familles => this.familles = familles)
  }

  async init(){
    this.formgroup = this.formbuilder.group({
      intitule : '',
      description :  '',
      prix : 0,
      isActif : true,
      famille : ''
    })
  }

  post(){
    this.platOutput.emit(this.formgroup.value);
    this.formgroup.patchValue({
      intitule : '',
      description :  '',
      prix : 0,
      isActif : true,
      famille : ''
    })
  }

  annuler(){
    this.annulerOutput.emit();
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
        
      ]
    });
    await alert.present();
  }

}
