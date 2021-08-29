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
import {IonPage} from '@ionic/vue';
import mutations from "@/utils/mutations";
import UserService from '@/backend/user';

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
	},
	methods: {
		clearPhone() {
			this.phone = '';
		},
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

			if (this.validPhone) {
				try {
					let { data } = await UserService.findUser(mutations.getClearPhone(this.phone));
					await this.$store.commit('setPhone', {phone: mutations.getClearPhone(this.phone)});
					this.clearPhone();
					if (data.isActive) {
						await this.$router.push('/smscode?type=Login')
					} else {
						await this.$router.push('/register');
					}
				} catch (e) {
					this.$store.commit('setError', {message: e.response.data.message});
				}
			} else {
				this.$store.commit('setError', {message: 'Неверный номер телефона'});
			}
			await loading.dismiss();
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
