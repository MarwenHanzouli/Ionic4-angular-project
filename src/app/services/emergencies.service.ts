import { Injectable } from '@angular/core';
import { Emergency } from '../models/Emergency.model';
import {  Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsersService } from './users.service';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class EmergenciesService {

  public emergencies:Observable<any[]>;
  public emergenciesPerUser:Observable<any[]>;
  constructor(private firestore:AngularFirestore,
              private usersService:UsersService) {
    this.usersService.userOb.subscribe((data)=>{
      this.getEmergenciesPerUser(data.id);
    });
    this.getEmergencies().subscribe(console.log);
  }
  async addEmergency(em:Emergency){
    await this.firestore.collection('emergencies').add({
      lat:em.lat,
      lng:em.lng,
      description:em.description,
      affected:em.affected,
      idEmitter:em.idEmitter,
      dateEmergency:em.dateEmergency,
      photos:em.photos ? em.photos : [],
      ambilancier:em.ambilancier ? em.ambilancier : ''
    });
  }

  getEmergencies() {
    this.emergencies=this.firestore.collection('emergencies').valueChanges();
    return this.emergencies;
  }
  getEmergenciesPerUser(idUser:string){
    this.emergenciesPerUser=this.firestore.collection('emergencies',
    ref => ref.where('idEmitter', '==', idUser)).snapshotChanges();
  }
  deleteEmergencie(key){
    return this.firestore.collection('emergencies').doc(key).delete();
  }
}
