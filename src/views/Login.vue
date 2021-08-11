<template>
	<ion-app>
		<ion-card>
			<ion-avatar>
				<img src="https://ionicframework.com/docs/demos/api/avatar/avatar.svg">
			</ion-avatar>
			<h1 class="text-center">Чтобы продолжить нужно войти в свой профиль</h1>
			<ion-item>
				<ion-label position="floating">Логин</ion-label>
				<ion-input ref="login"></ion-input>
			</ion-item>
			<ion-item>
				<ion-label position="floating">Пароль</ion-label>
				<ion-input ref="password" type="password"></ion-input>
			</ion-item>
			<div class="text-center mt-2 mb-1">
				<ion-button size="large" @click="login" color="tertiary">Войти</ion-button>
			</div>
			<div class="text-center">
				<h4 @click="goRegister">Нет аккаунта? Загеристрируйся.</h4>
			</div>
		</ion-card>
	</ion-app>
</template>

<script>
import {defineComponent} from 'vue';
import {loadingController} from '@ionic/vue';
import store from "@/store";
import toast from "@/utils/toast";

export default defineComponent({
	name: 'Home',
	computed: {
		getLogin() {
			return this.$refs.login.querySelector('input').value;
		},
		getPassword() {
			return this.$refs.password.querySelector('input').value;
		},
		checkLoginData() {
			return (this.getLogin.length > 4 && this.getPassword.length > 4);
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
					await store.dispatch('login', {email: this.getLogin, password: this.getPassword});
					await toast({message: 'Успешно! Через 1,5 секунды мы вам что-то покажем', duration: 1500, color: 'success'});
					setTimeout(() => {
						this.$router.push('/main');
					}, 1500)
				} catch (e) {
					console.log(e);
					throw e;
				}
			}
			await loading.dismiss();
		},
		goRegister() {
			this.$router.push('/register');
		}
	}
});
</script>

<style scoped>
ion-app {
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
