import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../model/ticket';
import { TicketService } from '../../services/ticket.service';
import { Router } from '@angular/router';
import { LocalDataSource } from '../../../ng2-smart-table';
import { Debt } from '../../model/debt';


@Component({
  selector: 'app-balanceAdm',
  templateUrl: './balanceAdm.component.html',
  styles: [],
})
export class BalanceAdmComponent implements OnInit {
  deuda : Debt = {
    debt: ''
  };
  source: LocalDataSource;
  Data=[];
  settings = {
    add: {
      addButtonContent: '<i class="fas fa-user-plus"></i>',
      createButtonContent: '<i class="fas fa-check"></i',
      cancelButtonContent: '<i class="fas fa-times"></i>',
      confirmSave: true,
    },
    edit: {
      editButtonContent: '<i class="fas fa-edit"></i>',
      saveButtonContent: '<i class="fas fa-check"></i>',
      cancelButtonContent: '<i class="fas fa-times"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="fas fa-trash"></i>',
      confirmDelete: true,
    },
      columns: {
        namec: {
          title: '    Nombre',
          editable : false,
          width: "30%"            
        },
        date: {
          title: '    Fecha',
          editable : false,
          width: "15%"            
        },
        num: {
          title: 'nVuelta',
          editable : false,
          width: "8%"  
        },
        hour: {
          title: 'Hora',
          editable : false,
          width: "12%"  
        },
        nstop: {
          title: 'nParada',
          editable : false,
          width: "8%"  
        },
        cash: {
          title: 'Monto',
          editable : false,
          width: "10%"  
        },
        debt: {
          title: 'Estado',
          editor: {
            type: 'checkbox',
            config: {
              true: 'pagado',
              false: 'deuda',
            },
          },
          width: "11%"  
        },
      },
      actions:{
        position :'right',
        add: false,
        width: "5%"  
      }
  };


  constructor(private ticketservice: TicketService,
    private router: Router) {  this.source = new LocalDataSource()}
  
  ngOnInit() {
    
    this.ticketservice.getAllTicket().subscribe(
        (response) => {     
          for(var i=0;i<response.data.length;i++){
            for(var j=0;j<response.data[i].schedule.length;j++)
            {
              var fecha = new Date (String(response.data[i].date));
              var hora = new Date(String(response.data[i].schedule[j].hour));
              var month = fecha.getMonth()+1;
              var fechac=fecha.getFullYear()+"/"+month+"/"+fecha.getDate();
              var post = {
                namec:response.data[i].namec,
                //date: fecha.toLocaleDateString(),
                date: fechac,
                num: response.data[i].num,
                hour: hora.toLocaleTimeString(),
                nstop:response.data[i].schedule[j].nstop,
                cash:response.data[i].schedule[j].cash,
                debt:response.data[i].schedule[j].debt,
              }
              this.Data.push(post);
            }
          }
          //console.log(this.Data);
          this.source.load(this.Data);
        }, (error) => {
          console.log('Error: ', error);
        }
      );  
  }

  onSaveConfirm(event) {
    this.deuda.debt=event.newData.debt;
    this.ticketservice.putTicket(this.deuda,"admin",event.newData.date,event.newData.num,event.newData.nstop).subscribe(
      (response)=>{
        event.confirm.resolve(event.newData);
      },(error)=>{
        console.log('Error: ', error);
        event.confirm.reject();
      }
    )
  }
}
