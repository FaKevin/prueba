import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    declarations: [
        SidebarComponent,
        NavbarComponent,
    ],
    imports: [ ],
    exports: [
        SidebarComponent,
        NavbarComponent,
    ],
    providers: [],
})
export class SharedModule { }
