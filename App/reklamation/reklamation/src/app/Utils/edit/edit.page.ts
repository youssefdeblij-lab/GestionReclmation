import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';
import { Md5 } from '../../../../node_modules/ts-md5/dist/md5';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
}) 
export class EditPage implements OnInit {
  idUser:any;
  ionicForm: FormGroup;
  isSubmitted:boolean = false;
  responseStorage:any={};
  constructor(public formBuilder: FormBuilder, private alertController: ToastController, private storage:Storage,) { 
    this.storage.get('USER_INFO').then((response) => {
      this.responseStorage = response;
    });
     

     this.ionicForm = this.formBuilder.group({
      email : ['', [Validators.required]],
      nom : ['', [Validators.required]],
      passold : ['', [Validators.required]],
      Nouveaupass : [''],
      username: ['', [Validators.required ]]})
  }

  ngOnInit() {  
   
   
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm(){

    
    
    if (!this.ionicForm.valid) {
      this.presentAlert("Please provide all the required values!","Erreur")
      return false;
    } else{
     
      this.isSubmitted = true;
      const md5 = new Md5();
      let passOld = md5.appendStr(this.ionicForm.value.passold).end();
      let newPass = md5.appendStr(this.ionicForm.value.Nouveaupass).end();

      let userData = {
        id : this.responseStorage.id,
        nom : this.ionicForm.value.nom,
        email : this.ionicForm.value.email,
        userName : this.ionicForm.value.username,
        newPass : newPass,
        passOld : passOld
      };

      console.log(userData);
      this.Postdata(userData);
    
    }
  }

  Postdata(data){
    let options = {
      method: 'POST',
      body:  JSON.stringify(data) 
      };

    let myProm = new Promise((myResolve) => {



      fetch(environment.APiHotst + 'utilaisateurs/EditUsers',options)
        .then(response => {
            
          response.json()
            .then(data => {
              myResolve(data);
               
             
              
              
            })
          
      });


    });

    myProm.then(
      (data:any)=>{ 
       //  console.log(JSON.parse(data));
         console.log(data);
      if(data.Response == "true") this.presentAlert("Les informations ont été modifiée","Info");
      else   this.presentAlert("la modification est impossible - Corrigez les informations ","Erreur AS56699746164");
     
      }
    ).catch(function(e) {
      console.error(e); // "oh, no!"
    })

  }


  async presentAlert(msg,type) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: type,
      message: msg,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  
}
