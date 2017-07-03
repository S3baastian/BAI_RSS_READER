import { Injectable }     from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Platform } from "ionic-angular";
import { AuthService } from "./auth.service";
import * as xml2js from 'xml2js';

@Injectable()
export class ChannelsService {
  private apiHost: string = '../assets/channels.json';
  private channels;

  constructor(private http: Http, private platform: Platform, private authService: AuthService) {
  }

  init() {
    this.fetchChannels()
      .subscribe((data) => this.channels = data.channels);
  }

  fetchNews(link) {
    return this.http.get(link)
      .map(res => {
        let news;
        xml2js.parseString( res.text(), function (err, result) {
          news = result.rss.channel[0].item;
        });
        return news.slice(0,5);
      });
  }

  getChannelLink(cateogry, channel) {
    const selectedCat = this.channels.find((e) => e.code === cateogry);
    const selectedChannel = selectedCat.channels.find(e => e.code === channel);
    return selectedChannel.link;
  }

  public fetchChannels(): Observable<any> {
    if (this.platform.is('cordova') && this.platform.is('android')) {
      this.apiHost = "/android_asset/www/assets/channels.json";
    }
    return this.http.get(this.apiHost)
      .map((res:any) => res.json());
  }

}