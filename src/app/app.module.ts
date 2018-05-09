import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataService } from './data.service';
import { ServerService } from './server.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CanvasComponent } from './canvas/canvas.component';
import { HomeComponent } from './home/home.component';
import { DisplayimageComponent } from './displayimage/displayimage.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent },
  {path: ':id', component: DisplayimageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    CanvasComponent,
    HomeComponent,
    DisplayimageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService, ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
