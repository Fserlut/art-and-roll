<template>
	<ion-card>
		<div class="avatar text-center">
			<div class="relative">
				<div class="avatar-img" :style="'background: url(' + getAvatar + ')'">
					<ion-icon size="large" :icon="pencilSharp"></ion-icon>
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
import { pencilSharp } from 'ionicons/icons';

export default {
	computed: {
		getAvatar() {
			if (this.user.avatar) {
				return this.user.avatar
			}
			return 'https://ionicframework.com/docs/demos/api/avatar/avatar.svg'
		},
		user() {
			return store.getters.user;
		}
	},
	setup() {
		return {
			pencilSharp
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
	right: -5px;
	bottom: -5px;
	background: rgba(255, 255, 255, .8);
	border-radius: 50%;
	padding: 5px;
}
</style>
