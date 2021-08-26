<template>
	<ion-page>
		<ion-card>
			<ion-avatar>
				<img src="https://ionicframework.com/docs/demos/api/avatar/avatar.svg">
			</ion-avatar>
			<h1 class="text-center">Введите номер телефона, чтобы войти</h1>
			<ion-item>
				<input class="native-input" v-model="phone" type="tel" inputmode="tel" placeholder="+7 (9__) ___-__-__" v-mask="'+7 (9##) ###-##-##'">
			</ion-item>
			<div class="text-center mt-2 mb-1">
				<ion-button expand="block" id="login-btn" class="login-btn" size="large" @click="login" color="tertiary">
					Войти
				</ion-button>
			</div>
		</ion-card>
	</ion-page>
</template>

<script>
import {loadingController} from '@ionic/vue';
import store from "@/store";
import toast from "@/utils/toast";
import {IonPage} from '@ionic/vue';
import api from "@/api";
import router from "@/router";

export default {
	components: {IonPage},
	data() {
		return {
			phone: '',
		}
	},
	name: 'Home',
	computed: {
		validPhone() {
			let phone = '+' + this.phone.replace(/\D/g, '');
			return phone.length === 12
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

			await loading.dismiss();

			if (this.validPhone) {
				try {
					let res = await fetch((api.baseUrl + '/find-user'), {
						method: 'POST',
						headers: {
							'content-type': 'application/json'
						},
						body: JSON.stringify({phone: '+' + this.phone.replace(/\D/g, '')})
					});
					let user = await res.json();
					if (!user) {
						console.log('old user');
					} else {
						store.commit('setPhone', {phone: '+' + this.phone.replace(/\D/g, '')});
						router.push('/register');
					}
				} catch (e) {
					toast({
						message: e.message,
						duration: 1500,
						color: 'danger'
					})
				}
			} else {
				toast({
					message: 'Неверный номер телефона',
					duration: 1500,
					color: 'danger'
				})
			}
		}
	},
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
	margin-top: 20px;
	margin-bottom: 20px;
}
input{
	background: transparent!important;
	border: none!important;
	outline: none!important;
	font-size: 22px;
	width: 100%;
	text-align: center;
}
</style>
