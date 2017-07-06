import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from "../../shared/auth.service";

@Component( {
  selector: 'page-user-settings',
  templateUrl: 'user-settings.html',
} )
export class UserSettings implements OnInit{
  private channels: any;

  constructor(public navCtrl: NavController, public authService: AuthService) {
  }

  ngOnInit() : any {
    this.channels = this.authService.getUserSettings();
  }
  consoleChannels(categoryIndex, channelIndex, event) {
    const selection = event.checked;
    this.authService.updateUserSetting(categoryIndex, channelIndex, selection).subscribe();
    // https://auth-9d20d.firebaseio.com/userdata/CMCt4NiqQKZwADaNjdDRqiMfnt82/channels/categotryIndex/channels/channelIndex/selected.json
  }
}
