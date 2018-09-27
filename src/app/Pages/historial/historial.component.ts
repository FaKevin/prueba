import { Component, NgZone, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Gps } from '../../model/gps';
import { GpsService } from '../../services/gps.service';
import { LocalDataSource } from '../../../ng2-smart-table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})

export class HistorialComponent implements OnInit {
  localstorage=localStorage.getItem('type');
  latt: number = -17.391786;
  lngg: number = -66.207933;
  zoom:number = 13;
  username: string="admin";
  info:boolean=false;
  source: LocalDataSource;
  userId:any;
  resp=[];
  Data=[];
  settings = {
    edit: {
      editButtonContent: '<i class="fas fa-eye"></i>',
      saveButtonContent: '<i class="fas fa-check"></i>',
      cancelButtonContent: '<i class="fas fa-times"></i>',
      confirmSave: true,
    },
    columns: {
      namec: {
        title: 'Nombre Completo',
        editable : false,
        width: "50%"          
      },
      date: {
        title: 'Fecha',
        editable : false,
        width: "20%"
      },
      num: {
        title: 'Vuelta',
        editable : false,
        width: "10%"
      }
    },
      actions:{
        position :'right',
        add: false,
        delete: false
      },
      mode : 'external',
      pager:{
        perPage:15,
      }
  };
  
  constructor( private activateroute: ActivatedRoute, private gpservice: GpsService,private router: Router) 
  { 
    this.source = new LocalDataSource()}
  
  ngOnInit() {
    if(this.localstorage=='USER'){
      this.gpservice.getGpsUser().subscribe(
        (response) => {   
          //console.log(response);  
            var fechaf:Date;
            var fecha: Date;
            var fechaff:string;
            var fechaa:string;
            var month=0;
            var fechac:string="";
            var length=response.data.length-1;
          // console.log('length: ',length)
          for(var i=0;i<response.data.length;i++){
            fecha = new Date (String(response.data[i].date));
            month = fecha.getMonth()+1;
            fechac=fecha.getFullYear()+"/"+month+"/"+fecha.getDate();
            if(i<length){   
              fechaa = fecha.toLocaleDateString();
              fechaf = new Date (String(response.data[i+1].date));
              fechaff = fechaf.toLocaleDateString();
              //console.log("i",i," :",fechaa);
              //console.log("i",i," :",fechaff);
              if(fechaa!==fechaff)
              {
                var post = {
                  namec: response.data[i].namec,
                  date: fechac,
                  num: response.data[i].num
                }
                this.Data.push(post);
              }
            }
            if(i==length){
                post = {
                namec: response.data[i].namec,
                date: fechac,
                num: response.data[i].num
              }
              this.Data.push(post);
            }
          }
        // console.log(this.Data);
          this.source.load(this.Data);
        }, (error) => {
          console.log('Error: ', error);
        }
      );
    }
    else if (this.localstorage=='ADM'){
      this.activateroute.params.subscribe(
          (paramss) => {
            this.userId=paramss.id;
        this.gpservice.getGpsId(paramss.id).subscribe(
          (response) => { 
           // this.resp=response.data;  
            //console.log(response);  
              var fechaf:Date;
              var fecha: Date;
              var fechaff:string;
              var fechaa:string;
              var month=0;
              var fechac:string="";
              var length=response.data.length-1;
            // console.log('length: ',length)
            for(var i=0;i<response.data.length;i++){
              fecha = new Date (String(response.data[i].date));
              month = fecha.getMonth()+1;
              fechac=fecha.getFullYear()+"/"+month+"/"+fecha.getDate();
              if(i<length){   
                fechaa = fecha.toLocaleDateString();
                fechaf = new Date (String(response.data[i+1].date));
                fechaff = fechaf.toLocaleDateString();
                //console.log("i",i," :",fechaa);
                //console.log("i",i," :",fechaff);
                if(fechaa!==fechaff)
                {
                  var post = {
                    namec: response.data[i].namec,
                    date: fechac,
                    num: response.data[i].num
                  }
                  this.Data.push(post);
                }
              }
              if(i==length){
                 post = {
                  namec: response.data[i].namec,
                  date: fechac,
                  num: response.data[i].num
                }
                this.Data.push(post);
              }
            }
          // console.log(this.Data);
            this.source.load(this.Data);
          }, (error) => {
            console.log('Error: ', error);
          }
        );
      },
      (error)=>{
        console.log('Error init:', error)
      });
    }
  }
  Edit(event) {  
    console.log(event.data.date);
    if(this.localstorage=='USER'){
      this.gpservice.getGpsUserDay(event.data.date).subscribe(
        (response)=>{
          console.log('esto llego:',response.data);
          this.resp=response.data;

        },(error)=>{console.log('Error: ', error);
        event.confirm.reject();}
      )
    }
    else if (this.localstorage=='ADM'){
      this.gpservice.getGpsIdDay(this.userId, event.data.date).subscribe(
        (response)=>{
          console.log('esto llego:',response.data);
          this.resp=response.data;

        },(error)=>{console.log('Error: ', error);
        event.confirm.reject();}
      )
    }
  }
}

