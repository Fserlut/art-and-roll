<template>
	<ion-page>
		<ion-card>
			<ion-avatar>
				<img src="https://ionicframework.com/docs/demos/api/avatar/avatar.svg">
			</ion-avatar>
			<h1 class="text-center">Введите код из смс.</h1>
			<ion-item>
				<ion-label position="floating">Код</ion-label>
				<ion-input inputmode="tel" type="tel" ref="smscode"></ion-input>
			</ion-item>
			<div class="text-center mt-2 mb-1">
				<ion-button id="login-btn" class="login-btn" size="large" @click="login" color="tertiary">Войти
				</ion-button>
			</div>
			<div id="phone-sign-in-recaptcha"></div>
		</ion-card>
	</ion-page>
</template>

<script>
import {loadingController} from '@ionic/vue';
import store from "@/store";
import toast from "@/utils/toast";
import {IonPage} from '@ionic/vue';
import firebase from 'firebase/app';

export default {
	components: {IonPage},
	name: 'Home',
	computed: {
		getCode() {
			return this.$refs.smscode.querySelector('input').value;
		},

		checkLoginData() {
			// Check phone
			return (true);
		}
	},
	methods: {
		async login() {
			const loading = await loadingController
				.create({
					spinner: null,
					message: 'Проверяем данные...',
					translucent: true,
					cssClass: 'custom-class custom-loading',
					backdropDismiss: true
				});

			await loading.present();
			if (this.checkLoginData) {
				try {
					await store.dispatch('login', {code: this.getCode});
					setTimeout(async () => {
						if (!store.getters.isRegistred) {
							console.log('Отправить на регистрацию');
							this.$router.push('/register');
						} else {
							this.$router.push('/profile');
						}
					}, 1000);
				} catch (e) {
					console.log(e);
					throw e;
				}
			}
			await loading.dismiss();
		}
	},
	mounted() {
	}
};
</script>

<style scoped>
.ion-page {
	display: flex;
	align-items: center;
	justify-content: center;
}

ion-card,
ion-item {
	--background: #fff;
	color: #000;
}

ion-card {
	position: relative;
	overflow: visible;
}

ion-card h1 {
	padding-top: 15px;
}

ion-avatar img {
	max-width: 75px !important;
	width: 75px;
	height: auto;
}

ion-avatar {
	width: 75px;
	position: absolute;
	top: -45px;
	left: 50%;
	transform: translateX(-50%);
}

ion-item {
	padding-right: 20px;
}
</style>
