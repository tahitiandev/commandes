import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-plat-image',
  templateUrl: './plat-image.component.html',
  styleUrls: ['./plat-image.component.scss'],
})
export class PlatImageComponent  implements OnInit {

  @Output() fermerOutput = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  fermer(){
    this.fermerOutput.emit();
  }

}
