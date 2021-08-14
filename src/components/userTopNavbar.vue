<template>
	<div class="user-top-navbar">
		<ion-card class="ion-padding-top pt-ios">
			<ion-card-header>
				<ion-card-title>{{ getLogin }}</ion-card-title>
				<ion-icon @click="openModal" size="large" :icon="menuSharp"></ion-icon>
			</ion-card-header>
		</ion-card>
	</div>
</template>

<script>
import store from "@/store";
import {IonCard, IonCardHeader, IonCardTitle, modalController} from '@ionic/vue';
import {menuSharp} from 'ionicons/icons';

import userProfileModal from "@/components/userProfileModal";

export default {
	components: {IonCard, IonCardHeader, IonCardTitle},
	methods: {
		async openModal() {
			const modal = await modalController
				.create({
					component: userProfileModal,
					cssClass: 'my-custom-class',
					swipeToClose: true,
					componentProps: {
						title: 'New Title'
					},
				})
			return modal.present();
		}
	},
	computed: {
		getLogin() {
			return this.user.email.substr(0, this.user.email.indexOf('@'));
		},
		user() {
			return store.getters.user;
		}
	},
	setup() {
		return {
			menuSharp,
		}
	}
}
</script>

<style scoped>
.user-top-navbar{
	z-index: 111;
}
ion-card {
	border-radius: 0 !important;
	margin: -5px;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
}

ion-card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
