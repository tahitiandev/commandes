import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Tables } from 'src/app/models/Tables';

@Component({
  selector: 'app-tables-post',
  templateUrl: './tables-post.component.html',
  styleUrls: ['./tables-post.component.scss'],
})
export class TablesPostComponent  implements OnInit {

  @Output() tableOutput = new EventEmitter<any>();
  @Output() annulerOutput = new EventEmitter<any>();
  @Input() numeroTable : any;
  
  formgroup!: FormGroup;

  constructor(private formbuilder : FormBuilder) { 
    
  }
  
  async ngOnInit() {
    await this.init();
  }

  init(){
    this.formgroup = this.formbuilder.group({
      numero: this.numeroTable,
      isActif: true
    });
  }

  post(){
    var value = this.formgroup.value;
    this.tableOutput.emit(value);
    this.formgroup.patchValue({
      numero: this.numeroTable,
      isActif: true
    })
  }

  annuler(){
    this.annulerOutput.emit();
  }

}
