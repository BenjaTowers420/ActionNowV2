import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy,},Vibration, NativeStorage, SQLite],
  bootstrap: [AppComponent],
})
export class AppModule {}
