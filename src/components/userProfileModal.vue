<template>
	<ion-page>
		<div class="user-profile-modal">
			<ion-header>
				<ion-toolbar class="pt-ios ion-padding-top ion-padding-bottom">
					<ion-card-title class="text-center" size="large">Настройки</ion-card-title>
					<ion-icon class="close-modal-icon" @click="closeModal" size="large" :icon="chevronBackSharp"></ion-icon>
				</ion-toolbar>
			</ion-header>
			<ion-content class="ion-padding">
				Настройки профиля...
			</ion-content>
		</div>
	</ion-page>
</template>

<script>
import {IonPage, IonContent, IonHeader, IonCardTitle, IonToolbar, modalController, IonIcon} from '@ionic/vue';
import {chevronBackSharp} from 'ionicons/icons';

export default {
	data() {
		return {
			menu: [
				{}
			],
		}
	},
	methods: {
		closeModal() {
			modalController.dismiss();
		}
	},
	components: {IonContent, IonHeader, IonCardTitle, IonToolbar, IonIcon, IonPage},
	setup() {
		return {
			chevronBackSharp
		}
	}
};
</script>

<style scoped>
.user-profile-modal {
	height: 100vh;
}
.close-modal-icon{
	position: absolute;
	left: 5px;
	top: 50%;
	transform: translateY(-50%);
}
</style>
