import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from './../_services/auth.service';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private AuthService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.AuthService.register(this.model).subscribe(() => {
      console.log('registration successful');
    }, error => {
      console.log(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
