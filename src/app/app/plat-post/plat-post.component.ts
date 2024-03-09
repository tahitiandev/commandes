import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-plat-post',
  templateUrl: './plat-post.component.html',
  styleUrls: ['./plat-post.component.scss'],
})
export class PlatPostComponent  implements OnInit {

  @Output() platOutput = new EventEmitter<any>();
  @Output() annulerOutput = new EventEmitter<any>();

  formgroup! : FormGroup;

  constructor(private formbuilder : FormBuilder) { }

  async ngOnInit() {
    await this.init();
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

}
