import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  
  private loadingSubject = new Subject<boolean>();
  loading$ = this.loadingSubject.asObservable();

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.show();
      } else if (event instanceof NavigationEnd) {
        this.hide();
      }
    });
  }

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    setTimeout(() => {
    this.loadingSubject.next(false);
    }, 400);
  }

  
}
