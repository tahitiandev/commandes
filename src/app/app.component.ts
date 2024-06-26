import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPagesSetting = [
    { title: 'Tables', url: 'tables', icon: 'mail' },
    { title: 'Menu', url: 'menus', icon: 'mail' },
    { title: 'Familles', url: 'familles', icon: 'mail' },
    { title: 'Paramétrages', url: 'settings', icon: 'mail' },
  ];

  public appPagesCommande = [
    { title: 'Prise de commande', url: 'comptoir', icon: 'mail' },
    { title: 'Préparation', url: 'preparations', icon: 'mail' },
    { title: 'Livraison', url: 'servir', icon: 'mail' },
    { title: 'Régler', url: 'regler', icon: 'mail' },
    { title: 'Commande cloturée', url: 'cloturer', icon: 'mail' },
  ];
  constructor() {  }


}
