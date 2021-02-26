import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/Service/authentication.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  idUser:any;
  nom:any;
  email:any; 
  user:any;
  role:any;

  constructor(public alertController: AlertController,  
    private  authService:  AuthenticationService, 
    private router:Router,
    private storage:Storage,
    ) {
      this.storage.get('USER_INFO').then((response) => {
        
              this.idUser = response.id;
              this.nom = response.Nom;
              this.email = response.email;
              this.user = response.username;
              this.role = response.role;
        });

     }
 
  ngOnInit() {

  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert message!',
      message: 'Etes vous sur de vouloir quitter ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Oui',
          handler: () => {
            this.authService.logout();
            this.router.navigate(['login']);
            
          }
        }
      ]
    });

    await alert.present();
  }

}
