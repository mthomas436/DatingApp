import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private accountService: AccountService, private router: Router, private toastr: ToastrService) {
 
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
      next: _ => this.router.navigateByUrl('/members') 
    });
 
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }
/*
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
*/
  

}
