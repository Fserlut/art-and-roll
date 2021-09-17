<template>
	<div class="avatar">
		<div class="relative">
			<div v-if="showTextEditAvatar" @click="presentActionSheet" class="avatar-img" :style="'background: url(' + avatar + ')'">
			</div>
			<div v-else class="avatar-img" :style="'background: url(' + avatar + ')'">
				<ion-icon v-if="showEditAvatar" @click="presentActionSheet" size="medium" :icon="addSharp"></ion-icon>
			</div>
			<span class="link" v-if="showTextEditAvatar" @click="presentActionSheet">Изменить фотографию</span>
		</div>
	</div>
</template>

<script>
import { actionSheetController } from "@ionic/core";
import { addSharp } from 'ionicons/icons';
import { usePhotoGallery } from "@/utils/takePhoto";
export default {
	props: {
		avatar: {
			type: String,
			default: 'https://storage.yandexcloud.net/art-and-roll-backet/default/default.svg'
		},
		showEditAvatar: {
			type: Boolean,
			default: false,
		},
		showTextEditAvatar: {
			type: Boolean,
			default: false,
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
		const {takePhoto, loadGallery} = usePhotoGallery();
		return {
			takePhoto, loadGallery, addSharp
		}
	}
}
</script>
