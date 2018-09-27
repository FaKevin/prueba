import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { APP_ROUTES } from './app.routing';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2SmartTableModule } from '../ng2-smart-table';
import { AppComponent } from './app.component';

///Modules
import { AgmCoreModule } from '@agm/core';
import { PagesModule } from './Pages/pages.module';

/// Component
import { LoginComponent } from './login/login.component';

///Services
import { GpsService} from './services/gps.service';
import { UserService } from './services/user.service';
import { TicketService } from './services/ticket.service';
import { AuthService } from './services/auth.service';
import { TokenInjectorService } from './services/token-inyector.service';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  entryComponents: [ ],
  imports: [
    RouterModule,
    APP_ROUTES,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    Ng2SmartTableModule,
    PagesModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDsmByz8cVof9beZ85HOTNUh-_H9qwJ36Q'
    })
  ],
  providers: [[UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInjectorService,
    multi: true
  }], TicketService, GpsService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
