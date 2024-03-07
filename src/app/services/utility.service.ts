import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  public generateKey(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
