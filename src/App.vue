<template>
	<ion-app>
		<ion-router-outlet/>
		<Error />
	</ion-app>
</template>

<script>
import {IonApp, IonRouterOutlet} from '@ionic/vue';
import {defineComponent} from 'vue';
import Error from '@/components/error';
import firebase from "firebase";
import store from "@/store";

export default defineComponent({
	name: 'App',
	components: {
		IonApp,
		IonRouterOutlet,
		Error
	},
	async mounted() {
		if (!firebase.auth().currentUser) {

		} else {
			let userDataFromDB = {};
			await firebase.database().ref(`/users/${store.getters.user.uid}/info`).get().then((snapshot) => {
				if (snapshot.exists()) {
					userDataFromDB = snapshot.val();
				} else {
					console.log("No data available");
				}
			}).catch((error) => {
				console.error(error);
			});
			store.commit('setAvatar', {avatar: userDataFromDB.avatar});
		}
	}
});
</script>
