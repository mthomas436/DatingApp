import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  loggedIn = false;

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<User>(`${this.baseUrl}account/login`, model).pipe(
      map((response: User) => {
        const user = response;

        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
          console.log('user set to local storage');
        }
      })
    ); 
  }

  register(model: any) {
    return this.http.post<User>(`${this.baseUrl}/account/register`, model).pipe(
      map(user => {
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.setCurrentUser(null!);
  }

  checkIfLoggedIn() {
    let user: User;
    let loggedIn = false;
    this.currentUser$.subscribe({
      next: usr => {
        user = user as User;
 
        if(usr) {
          console.log('We have user');
          loggedIn = true;
        }
      },
      error: () => console.log(console.error()) 
    });

    return loggedIn;
  }
}
