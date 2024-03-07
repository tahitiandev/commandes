import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Importer Firebase et AngularFirestoreModule
// firestore
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const firebaseConfig = {
  apiKey: "AIzaSyAM32d1tOldNCt-lFDDBYTY_5MyASfpyQg",
  authDomain: "commande-18cb6.firebaseapp.com",
  projectId: "commande-18cb6",
  storageBucket: "commande-18cb6.appspot.com",
  messagingSenderId: "904597072449",
  appId: "1:904597072449:web:7b28d3913005a3bedd74c0",
  measurementId: "G-TZNNMYXQRY"
}

// // Initialiser Firebase
// firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
