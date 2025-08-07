import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  baseUrl = environment.apiUrl

  constructor(private http: HttpClient, private router: Router) { }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + url);
  };

  post<T, U>(url: string, data: U): Observable<T> {
    return this.http.post<T>(this.baseUrl + url, data)
  };

  update<T, U>(url: string, data: U): Observable<T> {
    return this.http.post<T>(this.baseUrl + url, data)
  };

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.baseUrl + url);
  };

  setToken(token: string) {
    localStorage.setItem('golfAdminToken', token)
  }

  private refreshSidebarSource = new BehaviorSubject<void | null>(null);
  refreshSidebar$ = this.refreshSidebarSource.asObservable();

  triggerRefresh() {
    this.refreshSidebarSource.next(null);
  }


}
