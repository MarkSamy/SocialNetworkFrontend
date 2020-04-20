import {Injectable} from '@angular/core';
//import {Cache} from '../utils/storage.provider'; // Decorator to access local storage

let OneSignal;

const url = '';

@Injectable()
export class OneSignalService {
   
     oneSignalId: any =  localStorage.getItem('user_id'); // store OneSignalId in localStorage
    

    constructor() {
        // console.log('OneSignal Service Init', this.oneSignalInit);
    }
    
    // Call this method to start the onesignal process.
    public init() {
         this.addScript('https://cdn.onesignal.com/sdks/OneSignalSDK.js', (callback) => {
            console.log('OneSignal Script Loaded');
            console.log(this.oneSignalId);
            this.initOneSignal();
        })
    }

    addScript(fileSrc, callback) {
        const head = document.getElementsByTagName('head')[0];
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = callback;
        script.src = fileSrc;
        head.appendChild(script);
    }

    initOneSignal() {
        OneSignal = window['OneSignal'] || [];
        OneSignal.sendTag('user_id', localStorage.getItem('user_id'), (tagsSent) => {
            // Callback called when tags have finished sending
            console.log('OneSignal Tag Sent', tagsSent);
        });
        console.log('Init OneSignal');
        OneSignal.push(['init', {
            appId: '37f0d551-9201-4856-a31b-b24b63117780',
            autoRegister: true,
            allowLocalhostAsSecureOrigin: false,
            notifyButton: {
                enable: false,
            },
        }]);
        console.log('OneSignal Initialized');
        //this.checkIfSubscribed();
        OneSignal.setExternalUserId(localStorage.getItem('user_id'))
    }

    subscribe() {
        OneSignal.push(() => {
            console.log('Register For Push');
            OneSignal.push(['registerForPushNotifications'])
            OneSignal.on('subscriptionChange', (isSubscribed) => {
                console.log('The user\'s subscription state is now:', isSubscribed);
                this.listenForNotification();
                OneSignal.getUserId().then((userId) => {
                    console.log('User ID is', userId);
                    this.oneSignalId = userId;
                    this.updateLocalUserProfile();
                });
            });
        });
    }

    listenForNotification() {
        console.log('Initalize Listener');
        OneSignal.on('notificationDisplay', (event) => {
            console.log('OneSignal notification displayed:', event);
            this.listenForNotification();
        });
    }

    getUserID() {
        OneSignal.getUserId().then((userId) => {
            console.log('User ID is', userId);
            this.oneSignalId = userId;
        });
    }

    checkIfSubscribed() {
        OneSignal.push(() => {
            /* These examples are all valid */
            OneSignal.isPushNotificationsEnabled((isEnabled) => {
                if (isEnabled) {
                    console.log('Push notifications are enabled!');
                    this.getUserID();
                } else {
                    console.log('Push notifications are not enabled yet.');
                    this.subscribe();
                }
            }, (error) => {
                console.log('Push permission not granted');
            });
        });
    }

    updateLocalUserProfile() {
        // Store OneSignal ID in your server for sending push notificatios.
    }
}
//PushNotificationService