import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../shared/material.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    MaterialModule
  ]
})
export class DashboardModule { }
