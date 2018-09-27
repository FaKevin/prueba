import { NgModule } from '@angular/core';

import { InicioComponent } from './inicio/inicio.component';

import { SharedModule } from '../shared/shared.module';

import { PerfilComponent } from './perfil/perfil.component';
import { BalanceComponent } from './balance/balance.component';
import { BalanceAdmComponent } from './balanceAdm/balanceAdm.component';
import { HistorialComponent } from './historial/historial.component';
import { RutasComponent } from './rutas/rutas.component';
import { UsersComponent } from './users/users.component';
import { HistorialViewComponent } from './historial-view/historial-view.component';
import { PerfilEditComponent } from './perfil-edit/perfil-edit.component';
import { PagesComponent } from './pages.component';

import { PAGES_ROUTES } from './pages.routes';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        PagesComponent,
        InicioComponent,
        PerfilComponent,
        BalanceComponent,
        BalanceAdmComponent,
        HistorialComponent,
        RutasComponent,
        UsersComponent,
        HistorialViewComponent,
        PerfilEditComponent
    ],
    imports: [ RouterModule, SharedModule, PAGES_ROUTES],
    exports: [
        PagesComponent,
        InicioComponent,
        PerfilComponent,
        BalanceComponent,
        BalanceAdmComponent,
        HistorialComponent,
        RutasComponent,
        UsersComponent,
        HistorialViewComponent,
        PerfilEditComponent
    ],
    providers: [],
})
export class PagesModule {}
