import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { VlasnikComponent } from './vlasnik/vlasnik.component';
import { DekoraterComponent } from './dekorater/dekorater.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegisterComponent } from './register/register.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { ProfilComponent } from './profil/profil.component';
import { IzmenaPodatakaComponent } from './izmena-podataka/izmena-podataka.component';

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'loginadmin', component:LoginAdminComponent},
  {path: 'vlasnik', component:VlasnikComponent},
  {path: 'dekorater', component:DekoraterComponent},
  {path: 'admin', component:AdministratorComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'changePass', component:PromenaLozinkeComponent},
  {path: 'profil', component:ProfilComponent},
  {path: 'izmenaPodataka', component:IzmenaPodatakaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
