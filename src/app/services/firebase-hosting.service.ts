import { Injectable } from '@angular/core';
// import { AngularFireStorage } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class FirebaseHostingService {

  // constructor(private storage : angularfire) { }
  constructor() { }

  // async uploadImage(file: File): Promise<string | null> {
  //   try {
  //     const filePath = `images/${file.name}`;
  //     const fileRef = this.storage.ref(filePath);
  //     await fileRef.put(file);
  //     const downloadURL = await fileRef.getDownloadURL();
  //     return downloadURL;
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //     return null;
  //   }
  // }
}
