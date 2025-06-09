import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserListComponent } from './users/user-list.component';
import { UserFormComponent } from './users/user-form.component';
import { GroupListComponent } from './groups/group-list.component';
import { GroupFormComponent } from './groups/group-form.component';
import { CarreraListComponent } from './carreras/carrera-list.component';
import { CarreraFormComponent } from './carreras/carrera-form.component';
import { MateriaListComponent } from './materias/materia-list.component';
import { MateriaFormComponent } from './materias/materia-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'users/new', component: UserFormComponent },
  { path: 'users/:id', component: UserFormComponent },
  { path: 'groups', component: GroupListComponent },
  { path: 'groups/new', component: GroupFormComponent },
  { path: 'groups/:id', component: GroupFormComponent },
  { path: 'carreras', component: CarreraListComponent },
  { path: 'carreras/new', component: CarreraFormComponent },
  { path: 'carreras/:id', component: CarreraFormComponent },
  { path: 'materias', component: MateriaListComponent },
  { path: 'materias/new', component: MateriaFormComponent },
  { path: 'materias/:id', component: MateriaFormComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    GroupListComponent,
    GroupFormComponent,
    CarreraListComponent,
    CarreraFormComponent,
    MateriaListComponent,
    MateriaFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
