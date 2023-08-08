import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit {
  model: any = {};
  //loggedIn = false;
  currentUser$: Observable<User | null> = of(null);

  lresponse: any = '';
  constructor(private accountService: AccountService) {
 
   }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
   // this.getCurrentUser();
   // this.loggedIn = this.accountService.checkIfLoggedIn();
   
  }
/*
  getCurrentUser() {
    this.accountService.currentUser$.subscribe({
      next: user => this.loggedIn = !!user,
      error: error => console.log(error)
    })
  }
*/
  login() {
 
    this.accountService.login(this.model).subscribe({
      next: response => {
      },
      error: error => console.log(error)
    });
 
  }

  logout() {
    this.accountService.logout();
   // this.loggedIn = false;
  }

  getLoggedInUser() {
    let usr: any;
    this.accountService.currentUser$.subscribe({
      next: response => {
 
        usr = response;
      },
      error: error => console.log(error)
    });  
    
    return usr as User;
  }

}
