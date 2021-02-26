import { Component, OnInit } from '@angular/core';
 
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-r-shows',
  templateUrl: './r-shows.page.html',
  styleUrls: ['./r-shows.page.scss'],
})
export class RShowsPage implements OnInit {
  data:[];
  Zone:[];
  Reclamations:[];
  Utils:[];
  isnotready:boolean = true;
  constructor() { }

  ngOnInit() {
    
    this.getAllReclamation();
  }

  ionViewWillEnter(){
    this.ngOnInit();
  }

  getAllReclamation(){
 
    const options = {
      method: 'Get'
      };

      
     


    let myProm = new Promise((myResolve) => {

      fetch(environment.APiHotst + 'reclamations/Get/all')
        .then(response => {
            
          response.json()
            .then(data => {
              myResolve(data);
            })
          
      });


    });

    myProm.then(
      (data:any)=>{ 
         
         this.Zone = data.Zones;
         this.Reclamations = data.Reclamations;
         this.Utils = data.Utils;
     
         this.isnotready = false;
         
         data.Reclamations.forEach(element => {

           if(element.status == 0) element.isresolus = false;
           else element.isresolus = true;
           this.Zone.forEach(zone => {
             let zn:any = zone;
             if(element.idzone == zn.id) element.zonetxt = zn.zonetxt ;
           });
           console.log(element);
           this.Utils.forEach(usr => {
             let u:any = usr;
             if(u.id == element.ajoutepar) element.ajoutepartxt = u.nom ;
             if(u.id == element.resolupar) element.resolupartxt = u.nom ;

             
           });
       
           
           
         });
         
         
        

        
        },
      
    ).catch(function(e) {
      console.error(e); // "oh, no!"
    })

  }

  doRefresh(event) {
    
    this.ngOnInit();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  
 



}




