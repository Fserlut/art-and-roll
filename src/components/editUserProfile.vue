<template>
	<ion-page>
		<div class="user-edit-profile-modal">
			<ion-header>
				<ion-toolbar class="pt-ios ion-padding-top ion-padding-bottom">
					<ion-card-title class="text-center" size="large">Редактирование профиля</ion-card-title>
					<ion-icon
						class="close-modal-icon"
						@click="closeModal"
						size="large"
						:icon="chevronBackSharp"
					>
					</ion-icon>
				</ion-toolbar>
			</ion-header>
			<ion-content class="ion-padding">
				Content
			</ion-content>
		</div>
	</ion-page>
</template>

<script>
import {
	IonPage,
	IonContent,
	IonHeader,
	IonCardTitle,
	IonToolbar,
	modalController,
	IonIcon,
	IonList,
	IonItem,
} from '@ionic/vue';
import {chevronBackSharp} from 'ionicons/icons';

export default {
	data() {
		return {
		}
	},
	methods: {
		closeModal() {
			modalController.dismiss();
		}
	},
	components: { IonList, IonItem, IonContent, IonHeader, IonCardTitle, IonToolbar, IonIcon, IonPage },
	setup() {
		return {
			chevronBackSharp
		}
	}
};
</script>

<style scoped>
.user-edit-profile-modal {
	height: 100vh;
}

.close-modal-icon {
	position: absolute;
	left: 5px;
	top: 50%;
	transform: translateY(-50%);
}
</style>
