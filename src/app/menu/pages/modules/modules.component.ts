import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit {

  
  title = '..::WEBSITT::..';
  subsistemalist:any[];
  fname:string="";
  fruta:string="";
  idMenu:string="";
  editCustomer:boolean=false;
  subsistemaObject:any;
  FormHeader=""
  p:number = 1;
  username:string;
  password:string;

  constructor()
  {
  }
  
  ngOnInit()
   {    
    // this.GetAllSubsistema();
   }

    // Save(regForm:NgForm)
    // {
    //   this.GetDummyObject(regForm); 
    //   //alert("Add"+" "+this.subsistemaObject.nombre+" " +this.subsistemaObject.url);
          
    //   switch(this.FormHeader)
    //   {
    //   case "Add":
    //     this.Addsubsistema(this.subsistemaObject);
        
    //           //alert("Add"+ this.subsistemaObject.url);
    //          //this.Addemployee(this.Dummyemployee);
    //   break;
    //   case "Edit":
    //     this.Updatesubsistema(this.subsistemaObject);
    //   break;
    //   case "Delete":
    //     this.Deletesubsistema(this.subsistemaObject);
    //   break;
    //          default:
    //   break;
  
    //   }

    //   this.GetAllSubsistema();
      
    // }

//     GetAllSubsistema()
//     {
//       this.authService.Username.subscribe(data=>{
//         this.username=data;
//       })

//       this.authService.Password.subscribe(data=>{
//         this.password=data;
//       })

//       this.dataservice.getAllSubSystems(this.username,this.password).subscribe((tempdate) =>{  this.subsistemalist=tempdate;
//         console.log(this.subsistemalist);
//       })  
//       ,err=>{  
//         console.log(err);  
//       }  
//     }

//   //   Addsubsistema(e: subsistema)
//   //   {
//   //     this.subsistemaObject.idMenu='000660';
//   //     this.subsistemaObject.idSistema='02';           
//   //     this.subsistemaObject.icono='xxx.png';
//   //     this.subsistemaObject.dependencia='000660';
//   //     this.subsistemaObject.estado=true;
//   //     this.subsistemaObject.accdirecto='cfg';   
//   //     this.subsistemaObject.tipo='S';
//   //     this.subsistemaObject.orden=1;
//   //     this.subsistemaObject.urlAngular='/home';
//   //     this.subsistemaObject.perfiles='2';     

//   //     this.dataservice.AddSubsistema(this.subsistemaObject).subscribe(res=>
//   //     {
//   //       //this.subsistemalist.push(res);
//   //       //alert("Data added successfully !! ")
//   //       this.editCustomer=false;
//   //     })
//   //     ,err=>
//   //     {
//   //       console.log("Error Occured " + err);
//   //     }
//   // }

//   // Updatesubsistema(e: subsistema)
//   //   {

//   //     this.subsistemaObject.idMenu=e.idMenu;
//   //     this.subsistemaObject.idSistema='02';           
//   //     this.subsistemaObject.icono='xxx.png';
//   //     this.subsistemaObject.dependencia='000660';
//   //     this.subsistemaObject.estado=true;
//   //     this.subsistemaObject.accdirecto='cfg';   
//   //     this.subsistemaObject.tipo='S';
//   //     this.subsistemaObject.orden=1;
//   //     this.subsistemaObject.urlAngular='/home';
//   //     this.subsistemaObject.perfiles='2';     

//   //     this.dataservice.UpdateSubsistema(this.subsistemaObject).subscribe(res=>
//   //     {
//   //       //this.subsistemalist.push(res);
//   //       //alert("Data added successfully !! ")
//   //       this.editCustomer=true;
//   //     })
//   //     ,err=>
//   //     {
//   //       console.log("Error Occured " + err);
//   //     }
//   // }

//   // Deletesubsistema(e: subsistema)
//   //   {

//   //     this.subsistemaObject.idMenu='000660';      

//   //     this.dataservice.DeleteSubsistema(this.subsistemaObject).subscribe(res=>
//   //     {
//   //       //this.subsistemalist.push(res);
//   //       //alert("Data added successfully !! ")
//   //       this.editCustomer=true;
//   //     })
//   //     ,err=>
//   //     {
//   //       console.log("Error Occured " + err);
//   //     }
//   // }

    
//     GetDummyObject(regForm:NgForm):subsistema
//     {  
      
//       this.subsistemaObject= new subsistema();  
//       this.subsistemaObject.idMenu=regForm.value.idMenu; 
//       this.subsistemaObject.nombre=regForm.value.fname; 
//       this.subsistemaObject.url=regForm.value.fruta; 
//       return this.subsistemaObject;  
//     }  

//    goSearch(id:string)
//    {
//     this.router.navigate(['/', 'menuopciones',id]);    
//    }

//    ShowUpdForm=function(subsiste:subsistema)
//    {
//      this.editCustomer=true;
//      if(subsiste!=null)
//      {
//        this.SetValuesForEdit(subsiste)
     
//      }
//      else{
//        this.ResetValues();
//      }
//    }

//    ShowRegForm=function()
//    {
     
//        this.ResetValues();
     
//    }

//    ShowRegFormForDelete=function(subsiste:subsistema)
//   {
//     this.editCustomer=true;
//     if(subsiste!=null)
//     {
//       this.SetValuesForDelete(subsiste)
    
//     }
//   }

//   SetValuesForDelete=function(subsiste:subsistema)
// {
//   //this.idMenu=this.subsiste.idMenu;
//   this.FormHeader="Delete"
  
// }

//    //Function to set the values for edit form
// SetValuesForEdit=function(subsiste:subsistema)
// {
//   this.idMenu="";
//   this.fname="";
//   this.fruta="";
//   this.subsistemaObject=new subsistema();

//   this.dataservice.getOnlySubSystems(subsiste.idMenu).subscribe((tempdate) =>{  this.subsistemaObject=tempdate;
//     //console.log(this.subsistemaObject);
//     //alert(this.subsistemaObject);
//     this.idMenu=this.subsistemaObject.idMenu;
//     this.fname=this.subsistemaObject.nombre;
//     this.fruta=this.subsistemaObject.url; 
//     this.FormHeader="Edit"
//   })  
//   ,err=>{  
//     console.log(err);  
//   }  

  
// }
// //Function to reset the values 
// ResetValues(){
//   this.idMenu="";
//   this.fname="";
//   this.fruta="";
//   this.FormHeader="Add"  
// }

}
