import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChannelsService } from "../../../shared/channels.service";

@Component({
  selector: 'page-business',
  templateUrl: 'business.html',
})
export class Business implements OnInit{

  private channels: any;
  private news: any[] = [];
  private finishedLoadingNews : boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, private channelsService: ChannelsService) {
    this.channels = navParams.get( 'channels' );
  }

  ngOnInit() {
    this.fetchNews();
  }

  fetchNews() {
    this.channels.map( (channel, index) => {
      const link = this.channelsService.getChannelLink( 'business', channel );
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
