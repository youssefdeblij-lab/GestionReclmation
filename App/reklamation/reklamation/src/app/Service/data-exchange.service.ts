import { Injectable } from '@angular/core';
 
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {

  constructor() { }

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
      (data)=>{ return data },
      
    ).catch(function(e) {
      console.error(e); // "oh, no!"
    })

  }

  
}
