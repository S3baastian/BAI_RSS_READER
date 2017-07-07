import {User} from "./user"
import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import 'rxjs/Rx';
import { Platform } from "ionic-angular";
import { Observable } from "rxjs/Observable";

declare var firebase: any;

@Injectable()
export class AuthService {
    private userSettingsUrl: string = '../assets/userdata-register.json';
    private userRegisterDefaultData: any;
    private userSettings;

    constructor(private http: Http, private platform: Platform) {
    }

    signupUser(user: User) {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .catch(function (error) {
                console.log(error);
            });

        this.fetchUserDefaultSettings()
          .subscribe((data) => this.userRegisterDefaultData = data);
    }

    signinUser(user: User) {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .catch(function (error) {
                console.log(error);
            });
    }

    logout() {
        firebase.auth().signOut();
    }

    isAuthenticated() {
        const user = firebase.auth().currentUser;
        if (user) {
            return true;
        } else {
            return false;
        }
    }

    getUserId() {
        return firebase.auth().currentUser.uid;
    }

    getUserSettings() {
        return this.userSettings;
    }

    fetchUserChannelsSettings(): Observable<any> {
        return this.http.get(`https://auth-9d20d.firebaseio.com/userdata/${this.getUserId()}.json`)
          .map((res:any) => res.json());
    }

    fetchUserDefaultSettings() : Observable<any> {
        if (this.platform.is('cordova') && this.platform.is('android')) {
            this.userSettingsUrl = "/android_asset/www/assets/userdata-register.json";
        }
        return this.http.get(this.userSettingsUrl)
          .map((res:any) => res.json());
    }

    createDefaultSettingsForRegisteredUser() {
        const body = JSON.stringify(this.userRegisterDefaultData);
        const headers = new Headers({
            'Content-Type' : 'application/json'
        });
        //TODO call with authenthication
        return this.http.put('https://auth-9d20d.firebaseio.com/userdata/' + this.getUserId() + '.json', body, {headers: headers});
    }

    updateUserSetting(categoryIndex, channelIndex, selection) {
        // Update application state
        this.userSettings[categoryIndex].channels[channelIndex].selected = selection;

        // Update api state
        const url =  `https://auth-9d20d.firebaseio.com/userdata/${this.getUserId()}/channels/${categoryIndex}/channels/${channelIndex}/selected.json`;
        const headers = new Headers({
            'Content-Type' : 'application/json'
        });
        return this.http.put(url, selection, {headers: headers});
    }
}