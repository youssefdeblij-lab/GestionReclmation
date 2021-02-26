import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-single-show',
  templateUrl: './single-show.page.html',
  styleUrls: ['./single-show.page.scss'],
})
export class SingleShowPage implements OnInit {
  id:any;
  params:any; 
  Zone:any={};
  Reclamations:any={};
  par:any="";
  resolu:any="";
  Utils = [];
  imgs = [];
  imgs_intervention = [];
  imgs_resolution = [];
  racing:any = environment.APiHotst + "upload/";
  isme:boolean = false;
  canRsdr:boolean = false;
  idUser:any ;
  idReclamation:any ;
 

  isnotready:boolean = true;

  constructor(private route:ActivatedRoute, private storage: Storage,public alertController: AlertController, private router: Router, ) {
      this.params = this.route.params.subscribe(params => {
           this.id = params['id']; 
       });
   }

  ngOnInit() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        
        this.idUser = response.id;
        console.log(response);
        if(response.role != "Maitredouvrage") this.canRsdr = true;
      }
    });
    this.loadData(this.id);
  }

  loadData(id){
    const options = {
      method: 'Get'
      };

      
     


    let myProm = new Promise((myResolve) => {

      fetch(environment.APiHotst + 'reclamations/GetBy/' + id)
        .then(response => {
            
          response.json()
            .then(data => {
              myResolve(data);
            })
          
      });


    });

    myProm.then(
      (data:any)=>{ 
         
         this.Zone = data.Zone;
         this.Reclamations = data.Reclamation;
         this.Utils = data.Utils;
         this.imgs = data.Images;
         this.par = this.Utils[0].nom;
         
         this.imgs.forEach(element => {
             if(element.typeimg == "intervention") this.imgs_intervention.push(element);
          });

         if(this.Reclamations.status == 1 ) {
            this.isme = false;
           this.resolu = this.Utils[1].nom;
           this.imgs.forEach(element => {
             if(element.typeimg == "resolu") this.imgs_resolution.push(element);
           });
          
          }

         if(this.Reclamations.ajoutepar == this.idUser) this.isme = true;
         this.idReclamation = this.Reclamations.id ;
     
         this.isnotready = false;
         console.log(this.Reclamations);
         
         
         
        
        },
      
    ).catch(function(e) {
      console.error(e); // "oh, no!"
    })
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert message!',
      message: 'Etes vous sûre?',
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
            //Do shit

            this.DoFunctiondelet();
            
          }
        }
      ]
    });

    await alert.present();
  }


  DoFunctiondelet(){
 
    const options = {
      method: 'Get'
      };

      
     


    let myProm = new Promise((myResolve) => {

      fetch(environment.APiHotst + 'reclamations/removeIt/' + this.idReclamation)
        .then(response => {
            
          response.json()
            .then(data => {
              myResolve(data);
            })
          
      });


    });

    myProm.then(
      (data:any)=>{ 
         
         
        
 
           console.log(data.Status);
           this.presentAlert(data.Status,"Message")

           this.router.navigate(['tabs/home']);
           
           
       
         
         
        

        
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
