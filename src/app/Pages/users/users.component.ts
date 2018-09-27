import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { LocalDataSource } from '../../../ng2-smart-table';

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  source: LocalDataSource;
  Data=[];
  id=[];
  settings = {
    edit: {
      editButtonContent: '<i class="fas fa-eye"></i>',
      saveButtonContent: '<i class="fas fa-check"></i>',
      cancelButtonContent: '<i class="fas fa-times"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="fas fa-map-marker-alt"></i>',
      confirmDelete: false,
    },
    columns: {
      namec: {
        title: 'Nombre Completo',
        editable : false,
        width: "25%"          
      },
      username: {
        title: 'username',
        editable : false,
        width: "10%"          
      },
      cellphone: {
        title: 'Celular',
        editable : false,
        width: "11%"
      },
      telephone: {
        title: 'Telefono',
        editable : false,
        width: "11%"
      },
      car_plate: {
        title: 'Placa',
        editable : false,
        width: "11%" 
      },
      car: {
        title: 'Automovil',
        editable : false,
        width: "23%" 
      },
     /* button: {
        title: 'Button',
        type: 'custom',
        width: "8%" ,
        renderComponent: ButtonViewComponent,
     },*/
    },
      actions:{
        position :'right',
        add: false,
        custom : [{
                  name: 'view',
                  title: '<i class="fas fa-money-bill-alt"></i>'
                }],
        //edit: false,
       // delete: false
      },
      mode : 'external',
      pager:{
        perPage:15,
      }
  };

  constructor(private userservice: UserService,
    private router: Router) {  this.source = new LocalDataSource()}

  ngOnInit() {
    
    this.userservice.getUserList()
      .subscribe(
        (response) => {     
          for(var i=0;i<response.data.length;i++){
            var post = {
              namec : response.data[i].name + " "+ response.data[i].lastname,
              username: response.data[i].username,
              cellphone: response.data[i].cellphone,
              telephone: response.data[i].telephone,
              car_plate:response.data[i].car_plate,
              car:response.data[i].brand+" "+response.data[i].year+" "+response.data[i].model,
              //button: ""
            }
            this.id.push(response.data[i]._id);
            this.Data.push(post);
          }
         // console.log(this.Data);
          this.source.load(this.Data);
        }, (error) => {
          console.log('Error: ', error);
        }
      );
  }
 
  Edit(event) {
    for(var i=0;i<this.Data.length;i++)
    {
      if(this.Data[i].username==event.data.username)
      {
        this.router.navigate(['users',this.id[i],'view']); 
        //console.log('este es el id: ',this.id[i]); 
      }
    }
   // 
       
  }
  
  Delete(event){
    for(var i=0;i<this.Data.length;i++)
    {
      if(this.Data[i].username==event.data.username)
      {
        this.router.navigate(['historial/',this.id[i]]);
        //console.log('este es el id: ',this.id[i]); 
      }
    }
   // this.router.navigate(['gps',event.data.username]);
  }

  ticket(event){
    for(var i=0;i<this.Data.length;i++)
    {
      if(this.Data[i].username==event.data.username)
      {
        this.router.navigate(['balance',this.id[i]]); 
        //console.log('este es el id: ',this.id[i]); 
      }
    }
    console.log('DAta  ',event.data.username);
   // this.router.navigate(['gps',event.data.username]);
  }
}
