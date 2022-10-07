import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InternalObservablesService {

  public notificationSubject = new Subject();
  public closeModal = new Subject();
  constructor() { }
}
