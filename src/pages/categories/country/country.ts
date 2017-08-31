import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChannelsService } from "../../../shared/channels.service";

@Component( {
  selector: 'page-country',
  templateUrl: 'country.html',
} )
export class Country implements OnInit {
  private channels: any;
  private news: any[] = [];
  private finishedLoadingNews : boolean = false; // TODO message if havent news


  constructor(public navCtrl: NavController, public navParams: NavParams, private channelsService: ChannelsService) {
    this.channels = navParams.get( 'channels' );
  }

  ngOnInit() {
    this.fetchNews();
  }

  fetchNews() {
    this.channels.map( (channel, index) => {
      const link = this.channelsService.getChannelLink( 'country', channel );
      this.channelsService.fetchNews( link ).subscribe(
        data => {
          this.news = [ ...this.news, ...data ];
          if(index + 1 === this.channels.length ) {
            this.finishedLoadingNews = true;
          }
        } );
    } );
  }
}
