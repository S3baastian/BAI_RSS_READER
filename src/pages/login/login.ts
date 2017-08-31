import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth.service";
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  myForm: FormGroup;
  error = false;
  errorMessage = '';

  constructor(private navController: NavController, private fb: FormBuilder, private authService: AuthService) {
  }

  redirectIfIsAuthenticated() {
    if(this.authService.isAuthenticated()) {
      this.navController.setRoot(TabsPage);
    }
  }

  onRegister() {
    this.authService.signupUser(this.myForm.value)
  }

  onLogin() {
    this.authService.signinUser(this.myForm.value);
    this.redirectIfIsAuthenticated();
  }

  ngOnInit():any {
    this.myForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        this.isEmail
      ])],
      password: ['', Validators.required],
    });
    this.redirectIfIsAuthenticated();
  }

  isEmail(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      return {noEmail: true};
    }
  }

}
