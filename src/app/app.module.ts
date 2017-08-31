import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from "../pages/login/login";
import { AuthService } from "../shared/auth.service";
import { UserSettings } from "../pages/user-settings/user-settings";
import { ChannelsService } from "../shared/channels.service";
import { HttpModule } from "@angular/http";
import { Country } from "../pages/categories/country/country";
import { World } from "../pages/categories/world/world";
import { Sport } from "../pages/categories/sport/sport";
import { Business } from "../pages/categories/business/business";
import { Fun } from "../pages/categories/fun/fun";

@NgModule( {
  declarations: [
    MyApp,
    HomePage,
    UserSettings,
    LoginPage,
    TabsPage,
    Country,
    World,
    Sport,
    Business,
    Fun
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot( MyApp )
  ],
  bootstrap: [ IonicApp ],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    UserSettings,
    TabsPage,
    Country,
    World,
    Sport,
    Business,
    Fun
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    ChannelsService
  ]
} )
export class AppModule {
}
