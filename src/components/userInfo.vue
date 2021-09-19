<template>
	<ion-card class="user-info">
		<div class="main-parent-profile">
			<userAvatar :avatar="user.avatar" />
			<ion-card-content>
				<ion-card-title class="user-name">{{ user.name }}</ion-card-title>
			</ion-card-content>
			<div class="user-profile-right">
				<div class="arts-and-rolls-info">
					<div class="info-counter">
						<ion-card-title>{{ nFormatter($store.getters.getArts) }}</ion-card-title>
						<ion-card-title>артов</ion-card-title>
					</div>
					<div class="info-counter">
						<ion-card-title>{{ nFormatter($store.getters.getRolls) }}</ion-card-title>
						<ion-card-title>роллов</ion-card-title>
					</div>
				</div>
				<div v-if="user.profileDescription" class="user-description">
					{{ user.profileDescription }}
				</div>
			</div>
		</div>
		<ion-card-content>
			<ion-button @click="openProfileEditorModal" expand="block">Редактировать профиль</ion-button>
		</ion-card-content>
	</ion-card>
</template>

<script>
import { IonModal } from '@ionic/vue';
import { modalController } from "@ionic/core";

import editUserProfile from "@/components/editUserProfile";

import userAvatar from "@/components/userAvatar";

export default {
	components: { IonModal, userAvatar },
	props: ['user'],
	computed: {
		getAge() {
			return (new Date().getFullYear() - new Date(this.user.birthday * 1).getFullYear());
		}
	},
	methods: {
		async openProfileEditorModal() {
			const modal = await modalController
				.create({
					component: editUserProfile,
					cssClass: 'my-custom-class',
					swipeToClose: true,
					componentProps: {
						user: {
							name: this.user.name,
							login: this.user.login,
							profileDescription: this.user.profileDescription,
							findSpheres: this.user.findSpheres,
							mySpheres: this.user.mySpheres,
						}
					},
				})
			return modal.present();
		},
		nFormatter(num) {
			if (num >= 1000000000) {
				return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
			}
			if (num >= 1000000) {
				return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' м.';
			}
			if (num >= 1000) {
				return (num / 1000).toFixed(1).replace(/\.0$/, '') + ' тыс.';
			}
			return num;
		},
		async updatePhoto() {
			await this.takePhoto();
			if (this.$store.getters.getTargetImage) {
				document.location.href = '/edit-photo';
			}
		},
		async updateFromGallery() {
			await this.loadGallery();
			if (this.$store.getters.getTargetImage) {
				document.location.href = '/edit-photo';
			}

		},
	},
}
</script>

<style scoped>
.main-parent-profile{
	padding: 10px;
}

.user-name{
	text-align: center;
}

.user-profile-right{
	padding-left: 10px;
}

.info-counter{
	text-align: center;
}

.info-counter ion-card-title{
	font-size: 16px;
}

.arts-and-rolls-info{
	display: flex;
	justify-content: space-around;
	align-items: center;

}
</style>
