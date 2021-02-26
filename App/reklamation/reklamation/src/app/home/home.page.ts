import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { AuthenticationService } from '../Service/authentication.service';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { Badge } from '@ionic-native/badge/ngx';






@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  Kda = "Me";
  Title = "....";
  data:[];
  Zone:[];
  Reclamations:[];
  done:boolean = false;
  role:any ;  
  isnotready:boolean = true;
  idUser:any = 1 ;
  isempty = false;
  message = "";
  myVar:any ;

  clickSub: any;

  constructor(private  authService:  AuthenticationService, 
    private router:Router,     
    private badge: Badge,
    private storage: Storage,
    private platform: Platform,


    ) {
      
     }

    

    
  ngOnInit() {
    this.isempty = false;
    this.message = "";
    this.data=[];
    this.Zone=[];
    this.Reclamations=[];
    this.Title = " chargement....";

    console.log("ici 0 ");


    
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.Kda = response.Nom;
        this.idUser = response.id;
        this.role = response.role;
        if(  this.role == "Maitredouvrage")  this.getAllReclamation(environment.APiHotst + 'reclamations/GetByUser/'+ this.idUser, "Mes réclamations :" );
        else this.getAllReclamation(environment.APiHotst + 'reclamations/GetByidResolu/'+ this.idUser, "Mes réclamations traitées :" );

        
        console.log(response);
      }
    });
    
   
      
  }

 

  doRefresh(event) {
    
  
    this.ngOnInit();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);

  }

 

  toadd(){
    this.router.navigate(['Radd']);
  }

  ionViewWillEnter(){
    console.log("ici 2 ");
    this.ngOnInit();

  }

  

  ionViewDidEnter(){
    console.log("ici 2 ");
    this.ngOnInit();
   

  }

  getAllReclamation(lien , title ){
 
    const options = {
      method: 'Get'
      };

      
     


    let myProm = new Promise((myResolve) => {

      fetch(lien)
        .then(response => {
            
          response.json()
            .then(data => {
              myResolve(data);
            })
          
      });


    });

    myProm.then(
      (data:any)=>{ 
         this.Title = title;
         this.Zone = data.Zones;
         this.Reclamations = data.Reclamations;
         
     
         this.isnotready = false;
        
         if(this.Reclamations.length == 0 ) {this.isempty = true;this.message = "Aucune réclamation"}
         else false ;
         data.Reclamations.forEach(element => {

           if(element.status == 0) element.isresolus = false;
           else element.isresolus = true;
           this.Zone.forEach(zone => {
             let zn:any = zone;
             if(element.idzone == zn.id) element.zonetxt = zn.zonetxt ;
           });
           console.log(element);
           this.done = true;
           
           
           
         });
         
         
        

        
        },
      
    )

  }

  



  

}
