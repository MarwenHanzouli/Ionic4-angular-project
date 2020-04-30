import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireDatabase, AngularFireList,AngularFireObject } from 'angularfire2/database';
import { Emergency } from '../models/Emergency.model';
import {  Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmergenciesService {

  private apiUrl=environment.apiUrl;
  public emergenciesList: AngularFireList<Emergency>;

  private emergencies:Observable<Emergency[]>;
  constructor(private db: AngularFireDatabase,
              private firestore:AngularFirestore) {
    this.getEmergencies();
    this.emergencies.subscribe(console.log)
    firestore.collection('emergencies').valueChanges().subscribe(console.log);
  }
  addEmergency(em:Emergency){
    em.affected=false;
    this.emergenciesList.push(em);
    this.firestore.collection('emergencies').add({
      lat:em.lat,
      lng:em.lng,
      description:em.description,
      affected:em.affected,
      ambilancier:em.ambilancier
    });
  }

  getEmergencies() {
    this.emergenciesList=this.db.list("/emergencies");
    this.emergencies=this.emergenciesList.valueChanges();
  }
}
