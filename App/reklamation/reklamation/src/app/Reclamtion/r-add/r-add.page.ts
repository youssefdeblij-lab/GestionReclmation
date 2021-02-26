import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
 
import { FilePath } from '@ionic-native/file-path/ngx';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
 
import { finalize } from 'rxjs/operators';


import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-r-add',
  templateUrl: './r-add.page.html',
  styleUrls: ['./r-add.page.scss'],
})
export class RAddPage implements OnInit {

  ionicForm: FormGroup;
  isSubmitted:boolean = false;
  Zones:any = [];
  user:any;
  images:any= [];
  loge:any;
  imgvalid:boolean = false;
  imgsprevew:any[]=[];
  compt:any = 0;
  
  

  constructor(public formBuilder: FormBuilder,public navCtrl: NavController,private router: Router,
    private camera: Camera, private file: File, private http: HttpClient, private webview: WebView,
    private actionSheetController: ActionSheetController, private toastCtrl: ToastController,
    private storage: Storage, private plt: Platform, private loadingController: LoadingController,
    private ref: ChangeDetectorRef, private filePath: FilePath,private transfer: FileTransfer, public alertController: AlertController  ) { }

  ngOnInit() {
    

    this.ionicForm = this.formBuilder.group({
      commentaire : ['', [Validators.required]],
      zones: ['', [Validators.required ]],
      
     
    });

    this.getAllZone();

    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.user = response;
        console.log(response);
      }
    });


  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  ionViewWillEnter(){
    this.ngOnInit();
    this.images = [];
    this.ionicForm.value.commentaire = "";
    this.ionicForm.value.zones = "" ;
    this.isSubmitted = false;

  }
  
  
  submitForm(form){

    
    
    if(this.images.length == 0 ) {
      this.presentAlert("vous devez choisir  au moin une image","Erreur a")
     
      this.imgvalid = true;
      return false;

     }
    if (!this.ionicForm.valid) {
      this.presentAlert("Please provide all the required values!","Erreur a")
      return false;
    } else{
      this.isSubmitted = true;
      console.log(this.ionicForm.value.name);
      let recl:any = {};
      recl.commentaire = this.ionicForm.value.commentaire;
      recl.idzone = this.ionicForm.value.zones;
      recl.date = this.formattedDate();
      recl.ajoutpar = this.user.id;

      console.log(recl);
      this.Postdata(recl);
    
    }
  }


  getAllZone(){

    const options = {
      method: 'Get'
      };

    let myProm = new Promise((myResolve) => {

      fetch(environment.APiHotst + 'zonetxt/GetZone/all')
        .then(response => {
            
          response.json()
            .then(data => {
              myResolve(data);
            })
          
      });
      


    });

    myProm.then(
      (data:any)=>{ 
         
         this.Zones = data ;
        },
      
    ).catch(function(e) {
      console.error(e); // "oh, no!"
    })

  }

  

  formattedDate(d = new Date) {
    return [d.getDate(), d.getMonth()+1, d.getFullYear()]
        .map(n => n < 10 ? `0${n}` : `${n}`).join('/');
  }


  Postdata(data){
    let options = {
      method: 'POST',
      body:  JSON.stringify(data) 
      };

    let myProm = new Promise((myResolve) => {



      fetch(environment.APiHotst + 'reclamations/Setdata/new',options)
        .then(response => {
            
          response.json()
            .then(data => {
              myResolve(data);
               
             
              
              
            })
          
      });


    });

    myProm.then(
      (data:any)=>{ 
         
      
        //this.presentAlert(data.idReclamation,"info");
        this.compt = this.images.length ;
        this.images.forEach(element => {

            this.startUpload(element,data.idReclamation);

         });
        
        

        },
      
    ).catch(function(e) {
      console.error(e); // "oh, no!"
    })

  }
  

  clickedStar(img){
    //console.log(img);
    this.imgsprevew.splice(img, 1)
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
 
  readUploadedFileAsText = file => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
        this.presentToast('msg');
      };
      temporaryFileReader.readAsText(file);
    });
  }





   
  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }
 
async selectImage() {
    const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
                text: 'Depuis la galerie',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
            {
                text: 'Par Camera',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.CAMERA);
                }
            },
            {
                text: 'Cancel',
                role: 'cancel'
            }
        ]
    });
    await actionSheet.present();
}
 
takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
        quality: 20,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true
    };
 
    this.camera.getPicture(options).then(imagePath => {
        if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
            this.filePath.resolveNativePath(imagePath)
                .then(filePath => {
                    let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                });
        } else {
              this.filePath.resolveNativePath(imagePath)
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        }
    });
 
}

createFileName() {
  var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
  return newFileName;
}

copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
       this.updateStoredImages(newFileName);
      

       }, error => {
        this.presentAlert(error,"error");
  }); 



}

 
updateStoredImages(name) {
  
      let newImages = [name];
      let filePath = this.file.dataDirectory + name;
      let resPath = this.pathForImage(filePath);

      let newEntry = {
          name: name,
          path: resPath,
          filePath: filePath
      };

      this.images = [newEntry, ...this.images];
      this.ref.detectChanges(); // trigger change detection cycle
  
}


deleteImage(imgEntry, position) {
  this.images.splice(position, 1);
}

startUpload(imgEntry,idReclamation) {



const fileTransfer: FileTransferObject = this.transfer.create();
  let options: FileUploadOptions = {
    
    fileKey: 'file',
    fileName:  imgEntry.name,
    headers: {},
    httpMethod: 'POST',
    chunkedMode: false,


     
 }
 


 this.loge ="starting upload ....";

 
 //this.presentAlert(JSON.stringify(imgEntry.filePath),"info");

  fileTransfer.upload(imgEntry.filePath, environment.APiHotst + 'upload/here.php', options)
  .then((data) => {
 
        
    
     //   this.presentAlert(JSON.stringify(data),"info");
        const imgObj:any = {
          "Lien":data.response,
          "TypePhoto":"intervention",
          //id transfert
          "idrecl":idReclamation};
       
           const options = {
               method: 'POST',
               body: JSON.stringify(imgObj)
           };
       
       
       
       
          // this.presentAlert(environment.APiHotst + "imagereclamation/Setdata/new","info");
           fetch( environment.APiHotst + "imagereclamation/Setdata/new", options)
           .then(response => {
               
             response.json()
                 .then(data => {
                 
                  
                   this.compt = this.compt -1 ;
                   if(this.compt == 0)  {
                     this.presentAlert(this.loge,"info Success");
                     this.router.navigate(['tabs/home']);

                   }
             })
         
     
         });




  }, (err) => {
    this.presentAlert(JSON.stringify(err),"error upload2");
  });
  
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
