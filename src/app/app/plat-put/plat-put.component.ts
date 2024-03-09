import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CollectionName } from 'src/app/enums/CollectionName';
import { Plats } from 'src/app/models/Plats';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-plat-put',
  templateUrl: './plat-put.component.html',
  styleUrls: ['./plat-put.component.scss'],
})
export class PlatPutComponent  implements OnInit {

  @Input() platInput : any;
  @Output() annulerOuput= new EventEmitter<any>();

  formgroup! : FormGroup;

  constructor(private formbuilder : FormBuilder,
              private firestore : FirestoreService) { }

  async ngOnInit() {
    await this.init();
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

}
