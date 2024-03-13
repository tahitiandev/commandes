import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Tables', url: 'tables', icon: 'mail' },
    { title: 'Menu', url: 'menus', icon: 'mail' },
    { title: 'Prise de commande', url: 'prise-de-commande', icon: 'mail' },
    { title: 'Table 10', url: 'prise-de-commande/10', icon: 'mail' },
  ];
  constructor() {  }


}
