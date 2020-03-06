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
    ReactiveFormsModule
  ],
  providers: [
    InterventionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
