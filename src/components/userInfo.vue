<template>
	<ion-card>
		<div class="main-parent-profile d-flex wrap">
			<div class="avatar text-center w-40">
				<div class="relative">
					<div class="avatar-img" :style="'background: url(' + user.avatar + ')'">
						<ion-icon @click="presentActionSheet" size="medium" :icon="addSharp"></ion-icon>
					</div>
				</div>
			</div>
			<div class="w-60 user-profile-right">
				<ion-card-title class="user-name">{{ user.name }}</ion-card-title>
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
				<ion-card-content>
					<ion-button expand="block">Редактировать профиль</ion-button>
				</ion-card-content>
			</div>
		</div>
	</ion-card>
</template>

<script>
import {addSharp} from 'ionicons/icons';
import {actionSheetController, IonModal, loadingController} from '@ionic/vue';
import {usePhotoGallery} from "@/utils/takePhoto";

export default {
	components: {IonModal},
	props: {
		user: {
			type: Object,
			required: true,
			default: {},
		}
	},
	methods: {
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
				this.$router.push('/edit-photo');
			}
		},
		async updateFromGallery() {
			await this.loadGallery();
			if (this.$store.getters.getTargetImage) {
				this.$router.push('/edit-photo');
			}

		},
		async presentActionSheet() {
			const actionSheet = await actionSheetController
				.create({
					header: 'Изменить аватар',
					cssClass: 'my-custom-class',
					buttons: [
						{
							text: 'Сделать фотографию',
							handler: this.updatePhoto,
						},
						{
							text: 'Загрузить из галереи',
							handler: this.updateFromGallery,
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

			const {role} = await actionSheet.onDidDismiss();
		}
	},
	setup() {
		const {takePhoto, loadGallery, photos} = usePhotoGallery();
		return {
			takePhoto, loadGallery, addSharp, photos
		}
	}
}
</script>

<style scoped>
.main-parent-profile{
	padding: 10px;
}

.user-name{
	text-align: center;
	margin-bottom: 10px;
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
	right: -5px;
	bottom: 15px;
	background: rgba(255, 255, 255, 1);
	border-radius: 50%;
	padding: 5px;
}
</style>
