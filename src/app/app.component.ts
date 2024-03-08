import { Component } from '@angular/core';
import { FirestoreService } from './services/firestore.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Tables', url: 'tables', icon: 'mail' },
    { title: 'Prise de commande', url: 'prise-de-commande', icon: 'mail' },
    { title: 'Menu', url: 'menus', icon: 'mail' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private firestore : FirestoreService) {

  }

  // async sendDataToFirestore() {
  //   await this.firestore.post('test', {
  //     aa: '1',
  //     bb: '2'
  //   }, '456');
  // }

}
