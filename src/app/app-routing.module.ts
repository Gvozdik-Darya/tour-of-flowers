import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FlowersComponent} from './flowers/flowers.component';
import {DashboardComponent} from './dashboard/dashboard.component'
import { from } from 'rxjs';
import {DetailsOfFlowerComponent} from './details-of-flower/details-of-flower.component'

const routes: Routes = [
  {path: 'flowers', component: FlowersComponent},
  { path: 'dashboard', component: DashboardComponent },
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'detail/:id', component: DetailsOfFlowerComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
