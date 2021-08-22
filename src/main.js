import {createApp} from 'vue'
import App from './App.vue'
import router from './router';

import {IonicVue} from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


firebase.initializeApp({
	apiKey: "AIzaSyBH-1U9dpsYyf57_izL7sVnysCgTbh4V2o",
	authDomain: "art-and-roll.firebaseapp.com",
	databaseURL: "https://art-and-roll-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "art-and-roll",
	storageBucket: "art-and-roll.appspot.com",
	messagingSenderId: "18601754943",
	appId: "1:18601754943:web:09b2a9f1f52bb5d39e538a",
	measurementId: "G-83L9R6EYWD"
});

let app;

defineCustomElements(window);

// firebase.auth().settings.appVerificationDisabledForTesting = true;

firebase.auth().onAuthStateChanged(() => {
	if (!app) {
		app = createApp(App)
			.use(IonicVue)
			.use(router);

		router.isReady().then(() => {
			app.mount('#app');
		});
	}
});
