<template>
	<ion-card>
		<div class="avatar text-center">
			<div class="relative">
				<div class="avatar-img" :style="'background: url(' + getAvatar + ')'">
					<ion-icon @click="presentActionSheet" size="medium" :icon="addSharp"></ion-icon>
				</div>
			</div>
			<ion-card-title>{{ user.name }}</ion-card-title>
		</div>
		<ion-card-content>
			<ion-button expand="block">Редактировать профиль</ion-button>
		</ion-card-content>
	</ion-card>
</template>

<script>
import store from "@/store";
import { addSharp } from 'ionicons/icons';
import { actionSheetController, IonModal } from '@ionic/vue';
import { usePhotoGallery } from "@/utils/takePhoto";

export default {
	components: { IonModal },
	computed: {
		getAvatar() {
			return this.user.avatar;
		},
		user() {
			return store.getters.user;
		}
	},
	methods: {
		async presentActionSheet() {
			const actionSheet = await actionSheetController
				.create({
					header: 'Изменить аватар',
					cssClass: 'my-custom-class',
					buttons: [
						{
							text: 'Сделать фотографию',
							handler: async () => {
								await this.takePhoto();
							},
						},
						{
							text: 'Загрузить фотографию',
							handler: () => {
								console.log('Upload img');
							},
						},
						{
							text: 'Отменить',
							role: 'cancel',
							handler: () => {
								console.log('Cancel clicked')
							},
						},
					]
				})
			await actionSheet.present();

			const { role } = await actionSheet.onDidDismiss();
			console.log('onDidDismiss resolved with role', role);
		}
	},
	setup() {
		const {takePhoto} = usePhotoGallery();
		return {
			takePhoto, addSharp
		}
	}
}
</script>

<style scoped>
.avatar-img {
	width: 105px;
	height: 105px;
	border-radius: 50%;
	background-size: cover !important;
	background-position: center center !important;
	margin: 15px auto;
	position: relative;
}

.relative ion-icon {
	z-index: 112;
	position: absolute;
	right: 5px;
	bottom: 5px;
	background: rgba(255, 255, 255, 1);
	border-radius: 50%;
	padding: 5px;
}
</style>
