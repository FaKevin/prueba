import { Component, OnInit } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'inicio', title: 'Inicio',  icon: 'pe-7s-home', class: '' },
    { path: 'perfil', title: 'Perfil',  icon: 'pe-7s-user', class: '' },
    { path: 'users', title: 'Usuarios',  icon: 'pe-7s-user', class: '' },
    { path: 'rutas', title: 'Rutas',  icon: 'pe-7s-way', class: '' },
    { path: 'balance', title: 'Balance',  icon: 'pe-7s-note2', class: '' },
    { path: 'balanceAdm', title: 'BalanceAdm',  icon: 'pe-7s-note2', class: '' },
    { path: 'historial', title: 'Historial',  icon: 'pe-7s-map-marker', class: '' },
    { path: 'inicio', title: 'logout',  icon: 'pe-7s-power', class: 'active-pro' },
    { path: 'login', title: 'login',  icon: 'pe-7s-users', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
 sessionstorage= sessionStorage.getItem('token');
 type= localStorage.getItem('type');
  menuItems = ROUTES.filter(menuItem => menuItem);

  constructor(private router: Router) { }

  ngOnInit() {
      console.log('sessionStorage: ', this.sessionstorage);
      console.log('localStorage: ', this.type);

  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  logout(): void {
    sessionStorage.removeItem('token');
    localStorage.removeItem('type');
    this.router.navigate(['inicio']);
  }
  login(): void {
    this.router.navigate(['login']);

  }
}
