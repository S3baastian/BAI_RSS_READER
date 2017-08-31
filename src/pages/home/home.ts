import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChannelsService } from "../../shared/channels.service";
import { AuthService } from "../../shared/auth.service";
import { Country } from "../categories/country/country";
import { World } from "../categories/world/world";
import { Sport } from "../categories/sport/sport";
import { Business } from "../categories/business/business";
import { Fun } from "../categories/fun/fun";

@Component( {
  selector: 'page-home',
  templateUrl: 'home.html'
} )
export class HomePage {

  private countryChannels = [];
  private worldChannels = [];
  private sportChannels = [];
  private businessChannels = [];
  private funChannels = [];

  private finishedLoadingChanels: boolean = false;

  constructor(public navCtrl: NavController, private authService: AuthService, private channelsService: ChannelsService) {

  }

  ionViewWillEnter() {
    this.finishedLoadingChanels = false;
    this.clearArrays();
    this.getUserSettings();
  }

  // TODO need to be moved after login or before rendering tabs
  getUserSettings() {
    this.authService.fetchUserChannelsSettings()
      .subscribe( (data) => {
        // Here we are running filtering user settings
        // it will return only selected channels
        this.filterUserSettings( data.channels );
      } );
  }

  clearArrays() {
    this.countryChannels = [];
    this.worldChannels = [];
    this.sportChannels = [];
    this.businessChannels = [];
    this.funChannels = [];
  }

  filterUserSettings(categories) {
    categories.map( (cat) => {
      const selected = cat.channels.filter( (channel) => channel.selected === true );
      if ( selected.length !== 0 ) {
        switch ( cat.code ) {
          case "country":
            this.countryChannels = selected.map( e => e.code );
            break;
          case "world":
            this.worldChannels = selected.map( e => e.code );
            break;
          case "sport":
            this.sportChannels = selected.map( e => e.code );
            break;
          case "business":
            this.businessChannels = selected.map( e => e.code );
            break;
          case "fun":
            this.funChannels = selected.map( e => e.code );
            break;
          default:
            break;
        }
      }
    } );
    this.finishedLoadingChanels = true;
  }

  /*
   * Go to categories
   */
  //TODO refactor to one single method and view?
  goToCountryCard() {
    this.navCtrl.push( Country, {
      channels: this.countryChannels
    } );
  }

  goToWorldCard() {
    this.navCtrl.push( World, {
      channels: this.worldChannels
    } );
  }

  goToSportCard() {
    this.navCtrl.push( Sport, {
      channels: this.sportChannels
    } );
  }

  goToBusinessCard() {
    this.navCtrl.push( Business, {
      channels: this.businessChannels
    } );
  }

  goToFunCard() {
    this.navCtrl.push( Fun, {
      channels: this.funChannels
    } );
  }

}
