<template>
	<ion-card>
		<ion-avatar>
			<img src="https://ionicframework.com/docs/demos/api/avatar/avatar.svg">
		</ion-avatar>
		<h1 class="text-center">Чтобы продолжить заполните поля ниже</h1>
		<ion-item>
			<ion-label position="floating">Имя</ion-label>
			<ion-input ref="name"></ion-input>
		</ion-item>
		<ion-item>
			<ion-label position="floating">Эл. Почта</ion-label>
			<ion-input inputmode="email" type="email" ref="login"></ion-input>
		</ion-item>
		<ion-item>
			<ion-label position="floating">Пароль</ion-label>
			<ion-input ref="password" type="password"></ion-input>
		</ion-item>
		<div class="text-center mt-2 mb-1">
			<ion-button size="large" @click="nextStep" color="tertiary">Зарегистрироваться</ion-button>
		</div>
		<div class="text-center">
			<h4 @click="goLogin">Уже с нами? Войдите.</h4>
		</div>
	</ion-card>
</template>

<script>

export default {
	computed: {
		getLogin() {
			return this.$refs.login.querySelector('input').value;
		},
		getPassword() {
			return this.$refs.password.querySelector('input').value;
		},
		getName() {
			return this.$refs.name.querySelector('input').value;
		}
	},
	methods: {
		nextStep() {
			this.$emit('nextStep', {email: this.getLogin, password: this.getPassword, name: this.getName});
		},
		goLogin() {
			this.$router.push('/login');
		}
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
