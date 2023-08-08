import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  getUsers() {
    this.http.get('http://localhost:5239/api/users').subscribe({
      next: response => this.users = response,
      error: () => console.log(console.error()),
      complete: () => console.log(`Request complete - ${this.users}`)
    });
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

}
