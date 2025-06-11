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
import { AlumnoListComponent } from './alumnos/alumno-list.component';
import { AlumnoFormComponent } from './alumnos/alumno-form.component';
import { ProfesorListComponent } from './profesores/profesor-list.component';
import { ProfesorFormComponent } from './profesores/profesor-form.component';
import { AnioAcademicoListComponent } from './anios-academicos/anio-academico-list.component';
import { AnioAcademicoFormComponent } from './anios-academicos/anio-academico-form.component';

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
  { path: 'materias/:id', component: MateriaFormComponent },
  { path: 'alumnos', component: AlumnoListComponent },
  { path: 'alumnos/new', component: AlumnoFormComponent },
  { path: 'alumnos/:id', component: AlumnoFormComponent },
  { path: 'profesores', component: ProfesorListComponent },
  { path: 'profesores/new', component: ProfesorFormComponent },
  { path: 'profesores/:id', component: ProfesorFormComponent },
  { path: 'anios-academicos', component: AnioAcademicoListComponent },
  { path: 'anios-academicos/new', component: AnioAcademicoFormComponent },
  { path: 'anios-academicos/:id', component: AnioAcademicoFormComponent }
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
    MateriaFormComponent,
    AlumnoListComponent,
    AlumnoFormComponent,
    ProfesorListComponent,
    ProfesorFormComponent,
    AnioAcademicoListComponent,
    AnioAcademicoFormComponent
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
