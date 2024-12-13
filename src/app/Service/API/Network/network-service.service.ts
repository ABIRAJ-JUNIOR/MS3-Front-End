import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class NetworkServiceService {

  private onlineStatusSubject: BehaviorSubject<boolean>;

  constructor() {
    this.onlineStatusSubject = new BehaviorSubject<boolean>(navigator.onLine);

    window.addEventListener('online', () => {
      this.onlineStatusSubject.next(true);
    });

    window.addEventListener('offline', () => {
      this.onlineStatusSubject.next(false);
    });
  }

  getOnlineStatus() {
    return this.onlineStatusSubject.asObservable();
  }

  isOnline(): boolean {
    return navigator.onLine;
  }
}
