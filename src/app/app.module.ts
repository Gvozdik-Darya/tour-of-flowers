import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FlowersComponent } from './flowers/flowers.component';
import { FormsModule }   from '@angular/forms';
import { DetailsOfFlowerComponent } from './details-of-flower/details-of-flower.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { FlowerSearchComponent } from './flower-search/flower-search.component';


@NgModule({
  declarations: [
    AppComponent,
    FlowersComponent,
    DetailsOfFlowerComponent,
    MessagesComponent,
    DashboardComponent,
    FlowerSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
