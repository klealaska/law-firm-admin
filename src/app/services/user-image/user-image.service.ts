import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserImageService {

  private notification = new Subject<any>();
  constructor() { }

  sendNotification(image: any) {
    this.notification.next({ image });
  }

  getNotifications(): Observable<any> {
    return this.notification.asObservable();
  }
}
