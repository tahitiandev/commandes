import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CollectionName } from 'src/app/enums/CollectionName';
import { Commandes } from 'src/app/models/Commandes';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-prise-de-commande-quantite',
  templateUrl: './prise-de-commande-quantite.component.html',
  styleUrls: ['./prise-de-commande-quantite.component.scss'],
})
export class PriseDeCommandeQuantiteComponent  implements OnInit {

  formgroup! : FormGroup;

  @Input() platInput : any;
  @Input() tableIdInput : any;
  @Output() fermerOuput = new EventEmitter<any>();

  constructor(private firestore : FirestoreService,
              private utility : UtilityService,
              private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.init();
  }

  init(){
    this.formgroup = this.formbuilder.group({
      quantite : null
    })
  } 

  fermer(){
    this.fermerOuput.emit();
  }

  async valider(){
    var value = this.formgroup.value;
    var id = this.utility.generateKey();

    var commande : Commandes = {
      id : id,
     platid : this.platInput.id,
     quantite : value.quantite === null ? 1 : value.quantite,
     numeroTable : this.tableIdInput === undefined ? 0 : this.tableIdInput,
     isActif :  false,
     isPrepare : false,
     isLivre : false,
     isRegle : false
    }

    await this.firestore.post(
      CollectionName.Commandes,
      commande,
      id
    )
    this.fermer();
  }



}
