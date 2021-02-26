import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { $ } from 'protractor';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  rec: any ;
  clickSub: any ;
  nbrreclamaion:any =0 ;
  
  
  constructor( public localNotifications: LocalNotifications) { 
   
  }

  StartNotif(){

     
   this.rec = setInterval(() => {
      //let myProm = new Promise((triggerotification) => {

         fetch(environment.APiHotst + 'reclamations/GetNomberRecl')
          .then(response => {
            
            response.json().then((data)=> {
             
              if( data.nbrreclamaion !=  this.nbrreclamaion ) {
                
                this.nbrreclamaion =  data.nbrreclamaion  ;
                this.clickSub = this.localNotifications.on('click').subscribe(data => {
                  console.log(data);
                
                });
             
              this.localNotifications.schedule({
                text: "Info" ,
                badge: this.nbrreclamaion
              }); 


              }
            
            }) 
            
            
        }); 
  
  
     // });
  
      
     
 
     
   

     }, 2500);

  }

  StopNotif(){
    clearInterval(this.rec);
  }

 

  triggerotification(datatrigger) {
    console.log("okk");

    /*this.localNotifications.on('click').subscribe(data => {
      console.log(data);
    
    });

     this.localNotifications.schedule({
      text:  datatrigger,
      badge: 2
    });*/

   

  }

  

 

  getNombreReclamation(){
    let prom = new Promise((triggerotification) =>{
        fetch(environment.APiHotst + 'reclamations/GetNomberRecl')
          .then(response => {
              
            response.json()
              .then(data => {
                 triggerotification(data);
              })
            
        });

    });

    
  }

   

}
