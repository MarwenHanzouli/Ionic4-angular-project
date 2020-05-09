import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Subject } from 'rxjs';
const { LocalNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private subject:Subject<any>=new Subject();
  constructor() {
  }

  async notifier(data){
    const notifs = await LocalNotifications.schedule({
      notifications: [
        {
          title: "Emergency",
          body: data,
          id: 1,
          schedule: { at: new Date(Date.now()) },
          sound: null,
          attachments: null,
          actionTypeId: "",
          extra: null
        }
      ]
    });
    console.log('scheduled notifications', notifs);
  }
}
