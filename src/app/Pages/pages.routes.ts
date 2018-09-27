import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';

import { InicioComponent } from './inicio/inicio.component';
import { UsersComponent } from './users/users.component';
import { PerfilEditComponent } from './perfil-edit/perfil-edit.component';
import { PerfilComponent } from './perfil/perfil.component';
import { BalanceComponent } from './balance/balance.component';
import { BalanceAdmComponent } from './balanceAdm/balanceAdm.component';
import { HistorialComponent } from './historial/historial.component';
import { RutasComponent } from './rutas/rutas.component';

const pagesRoutes: Routes = [
    { path: '' ,                      component: PagesComponent,
      children: [
      { path: 'inicio',               component: InicioComponent },
      { path: 'users',                component: UsersComponent }, // auth admin
      { path: 'users/:id/edit',       component: PerfilEditComponent}, // auth admin
      { path: 'users/:id/view',       component: PerfilComponent}, // auth admin
      { path: 'perfil',               component: PerfilComponent }, // auth
      { path: 'balance',              component: BalanceComponent }, // auth
      { path: 'balance/:id',          component: BalanceComponent }, // adm
      { path: 'balanceAdm',           component: BalanceAdmComponent }, // auth admin
      { path: 'historial',            component: HistorialComponent }, // auth
      { path: 'historial/:id',        component: HistorialComponent }, // auth
      { path: 'rutas',                component: RutasComponent },
      { path: '',                     redirectTo: 'inicio', pathMatch: 'full' }]
    }
];
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
