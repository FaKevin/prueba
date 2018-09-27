import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-edit',
  templateUrl: './perfil-edit.component.html',
  styleUrls: ['./perfil-edit.component.css']
})
export class PerfilEditComponent implements OnInit {
  userViewed: User = {
    name: "",
    lastname: "",
    username: "",
    password:"",
    f_create:"",
    birth: "",
    state: "",
    city: "",
    address: "",
    telephone: "",
    cellphone:"",
    brand: "",
    year: "",
    model:"",
    car_plate: ""
  };

  constructor(    
    private activateroute: ActivatedRoute,
    private userservice: UserService,private router: Router) { }

  ngOnInit() {
    this.activateroute.params.subscribe(
      (paramss) => {
        this.userservice.getUserById(paramss.id).subscribe(
          (response) => {
            console.log(response.data);
            var f_create = new Date (String(response.data.f_create));
            var month = f_create.getMonth()+1;
            response.data.f_create =f_create.getFullYear()+"/"+month+"/"+f_create.getDate();
            var birth = new Date (String(response.data.birth));
            month = birth.getMonth()+1;
            response.data.birth = birth.getFullYear()+"/"+month+"/"+birth.getDate();
            this.userViewed = response.data;
          }, (error) => {
            console.log('Error: ', error);
          }
        );
      },
      (error)=>{
        console.log('Error init:', error)
      }
    );
  }
  Acept(){
    //console.log(this.userViewed);
    var f_create = new Date (String(this.userViewed.f_create));
    var month = f_create.getMonth()+1;
    this.userViewed.f_create =f_create.getFullYear()+"/"+month+"/"+f_create.getDate();
    var birth = new Date (String(this.userViewed.birth));
    month = birth.getMonth()+1;
    this.userViewed.birth = birth.getFullYear()+"/"+month+"/"+birth.getDate();
    //console.log(this.userViewed);
    this.userservice.editeUser(this.userViewed.username, this.userViewed).subscribe(
      (response) => {
        this.router.navigate(['users']);
      }, (error) => {
        console.log('Error: ', error);
      }
    );
    //console.log(this.userViewed);
  }
}
