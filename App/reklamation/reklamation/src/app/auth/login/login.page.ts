import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../../Service/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ionicForm: FormGroup;
  defaultDate = "1987-06-30";
  isSubmitted = false;
  ErrorText = "";
  MessageObj = {TextMessage:"wait...."};

  constructor(private  authService:  AuthenticationService, public formBuilder: FormBuilder,public navCtrl: NavController) { }

  ngOnInit() {
    
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      
     
    });

  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm(form){
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else{
      console.log(this.ionicForm.value.name);
      this.ErrorText = "Patientez ..";
      this.authService.login( this.ionicForm.value.name , this.ionicForm.value.password);
    

    }
      
      

  }

}
