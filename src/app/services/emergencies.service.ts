import { Injectable } from '@angular/core';
import { Emergency } from '../models/Emergency.model';
import {  Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmergenciesService {

  //public emergenciesList: AngularFireList<Emergency>;

  private emergencies:Observable<any[]>;
  constructor(/*private db: AngularFireDatabase,*/
              private firestore:AngularFirestore) {
    this.getEmergencies();
    //this.emergencies.subscribe(console.log)
    
    this.emergencies.subscribe(console.log);
  }
  addEmergency(em:Emergency){
    em.affected=false;
    //this.emergenciesList.push(em);
    this.firestore.collection('emergencies').add({
      lat:em.lat,
      lng:em.lng,
      description:em.description,
      affected:em.affected,
      ambilancier:em.ambilancier ? em.ambilancier : ''
    });
  }

 getEmergencies() {
  //   this.emergenciesList=this.db.list("/emergencies");
  //   this.emergencies=this.emergenciesList.valueChanges();
  this.emergencies=this.firestore.collection('emergencies').valueChanges();
 }
}
