import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterventionTableComponent } from './intervention-table/intervention-table.component';
import { NewInterventionComponent } from './new-intervention/new-intervention.component';
import { EditInterventionComponent } from './edit-intervention/edit-intervention.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {InterventionService} from './services/intervention.service';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: 'interventions-list', component: InterventionTableComponent },
  { path: 'new-intervention', component: NewInterventionComponent },
  { path: 'interventions-list/:id', component: EditInterventionComponent },
  { path: '', component: InterventionTableComponent },

];
@NgModule({
  declarations: [
    AppComponent,
    InterventionTableComponent,
    NewInterventionComponent,
    EditInterventionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    InterventionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
