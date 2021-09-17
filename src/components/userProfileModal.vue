<template>
	<ion-page>
		<div class="user-profile-modal">
			<ion-header>
				<ion-toolbar class="pt-ios ion-padding-top ion-padding-bottom">
					<ion-card-title class="text-center" size="large">Настройки</ion-card-title>
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
				<ion-list lines="none">
					<ion-item
						v-for="(item, idx) in menuItems"
						:key="item.name + idx"
						@click="item.action"
					>
						{{ item.title }}
					</ion-item>
				</ion-list>
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

import editUserProfile from '@/components/editUserProfile';

export default {
	data() {
		return {
			menuItems: [
				{
					name: 'edit-profile',
					title: 'Редактировать профиль',
					action: async () => {
						const modal = await modalController
							.create({
								component: editUserProfile,
								cssClass: 'my-custom-class',
								swipeToClose: true,
								componentProps: {
									title: 'New Title'
								},
							})
						return modal.present();
					},
				},
				{
					name: 'user-agreements',
					title: 'Пользовательское соглашение',
					action: 'get-user-agreements',
				},
				{
					name: 'about-app',
					title: 'О приложении',
					action: 'get-about-app',
				},
				{
					name: 'logout',
					title: 'Выйти',
					action: async () => {
						this.$store.commit('setLoading', true);

						await this.$store.dispatch('logout');
						this.closeModal();
						setTimeout(async () => {
							this.$store.commit('setLoading', false);
							document.location.href = '/login';
						}, 200);
					},
				}
			],
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
.user-profile-modal {
	height: 100vh;
}

.close-modal-icon {
	position: absolute;
	left: 5px;
	top: 50%;
	transform: translateY(-50%);
}
</style>
