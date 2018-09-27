import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ferfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {
  localstorage=localStorage.getItem('type');
  userid:any;
  userViewed: User = {
    name: "",
    lastname: "",
    username: "",
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
    private userservice: UserService, private router: Router) {}

  ngOnInit() {
    if(this.localstorage=='USER'){
      this.userservice.getProfile().subscribe(
        (response) => {
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
    }
    else if(this.localstorage=='ADM'){
      this.activateroute.params.subscribe(
        (paramss) => {
          this.userid=paramss.id;
          this.userservice.getUserById(paramss.id)
          .subscribe(
            (response) => {
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
  }
  editUser(): void {
    this.router.navigate(['users',this.userid,'edit']);
    }
  deleteUser(): void {
    this.userservice.deleteUser(this.userid).subscribe((response)=>{console.log(response)},
    (error)=>{console.log('Error init:', error)});
    this.router.navigate(['users']);
   // this.router.navigate(['users',this.userViewed.username,'edit']);
    }
}
