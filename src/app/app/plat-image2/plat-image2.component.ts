import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-plat-image2',
  templateUrl: './plat-image2.component.html',
  styleUrls: ['./plat-image2.component.scss'],
})
export class PlatImage2Component  implements OnInit {

  @Output() fermerOutput = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  fermer(){
    this.fermerOutput.emit();
  }

}
