import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ToastController, Platform, AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../Service/notification.service';

import { Md5 } from '../../../node_modules/ts-md5/dist/md5';

import { LoadingController } from '@ionic/angular';







@Injectable()
export class AuthenticationService {

  authState = new BehaviorSubject(false);


  constructor(
    private router: Router,

    public storage: Storage,
    public  platform: Platform,
    public alertController: AlertController,
    private toastCtrl: ToastController,
    private NotificationService: NotificationService,
    public loadingController: LoadingController ) {
      this.platform.ready().then(() => {
        this.ifLoggedIn();
      });
    }

    ifLoggedIn() {
      this.storage.get('USER_INFO').then((response) => {
        if (response) {
          this.authState.next(true);
          this.NotificationService.StartNotif();
        }
      });
    }

    async  login(user : string,pass : string,  ) {
   
      const loading = await this.loadingController.create({
        message: 'Patientez ...',
      });
      await loading.present();

      const md5 = new Md5();
      let resp = false;
      const md5_pass = md5.appendStr(pass).end();
      const userObjPost =[{Id: 74524,Nom: user,Email: '@',Password:md5_pass,Role : '--'}];
     
    fetch(environment.APiHotst + 'utilaisateurs/checkpass', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(userObjPost) // body data type must match "Content-Type" header

          
          })
    .then(response => {
        
      response.json()
          .then( data => {
             console.log(data);
            
             
             if(  data.Response == "true" ){
              this.storage.set('USER_INFO', data).then(async (response) => {
              
                this.router.navigate(['tabs/home']);
                this.authState.next(true);

                this.NotificationService.StartNotif();
                 loading.dismiss();
               
                
              });
             
            }else{
              this.presentToast();
              loading.dismiss();

            }

          })
      
  }).catch((e)=>{
    loading.dismiss();
    this.presentAlert("Erreur d'authentification","Erreur");

  });
    
     
 
  }

    logout() {
      this.storage.remove('USER_INFO').then(() => {
        this.router.navigate(['login']);
        this.authState.next(false);
      });
      this.NotificationService.StopNotif();
    }
   
    isAuthenticated() {
      return this.authState.value;
    }
   
    async presentToast() {
      const toast = await this.toastCtrl.create({
        message: 'Login / password incorrect',
        duration: 2000
      });
      toast.present();
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
