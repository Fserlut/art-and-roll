<template>
	<ion-card style="box-shadow: none">
		<h1 class="text-center">Чтобы продолжить заполните поля ниже</h1>
		<ion-item>
			<ion-label position="floating">Имя</ion-label>
			<ion-input ref="name"></ion-input>
		</ion-item>
		<ion-item>
			<ion-label position="floating">Дата рождения</ion-label>
			<ion-datetime
				cancel-text="Отмена"
				done-text="Выбрать"
				ref="birthday"
				display-format="D MMM YYYY"
				min="1955-01-01"
				month-short-names="янв, фев, март, апр, май, июнь, июль, авг, сен, окт, нояб, дек">

			</ion-datetime>
		</ion-item>
		<ion-item>
			<ion-label position="floating">Логин</ion-label>
			<ion-input inputmode="email" type="text" ref="login"></ion-input>
		</ion-item>
		<div class="text-center mt-2 mb-1">
			<ion-button size="large" @click="nextStep" color="primary">Продолжить</ion-button>
		</div>
	</ion-card>
</template>

<script>

import UserService from "@/backend/user";

export default {
	computed: {
		getLogin() {
			return this.$refs.login.querySelector('input').value;
		},
		getName() {
			return this.$refs.name.querySelector('input').value;
		},
		getBirthday() {
			return this.$refs.birthday.querySelector('input').value;
		}
	},
	methods: {
		clearLogin() {
			this.$refs.login.querySelector('input').value = ''
		},
		clearName() {
			this.$refs.name.querySelector('input').value = ''
		},
		validName() {
			if (this.$refs.name.querySelector('input').value.length > 0) {
				if (!(/^[а-я]*$/i.test(this.$refs.name.querySelector('input').value))) {
					this.$store.commit('setError', {message: 'Имя содержит недопустимые символы'});
					return true;
				}
				return false
			}
			this.$store.commit('setError', {message: 'Пропущено поле Имя'});
			return true
		},
		validBirthDay() {
			if (this.$refs.birthday.querySelector('input').value != '') {
				return false
			}
			this.$store.commit('setError', {message: 'Заполните дату рождения'});
			return true
		},
		async validLogin() {
			let login = this.$refs.login.querySelector('input').value;
			if (login.length > 0) {
				if (!(/^[a-z][a-z0-9\._-]*$/i.test(login))) {
					this.$store.commit('setError', {message: 'В поле логин использаются недопустимые символы'})
					return true;
				}
				let { data } = await UserService.validLogin(login);
				data.isClosed ? this.$store.commit('setError', {message: 'Логин уже занят'}) : '';
				return data.isClosed;
			}
			this.$store.commit('setError', {message: 'Пропущено поле Логин'});
			return true;
		},
		async nextStep() {
			let loginIsValid = await this.validLogin();
			if (!loginIsValid && !this.validName() && !this.validBirthDay()) {
				this.$emit('nextStep', {login: this.getLogin, name: this.getName, birthday: +new Date(this.getBirthday)});
				this.clearLogin();
				this.clearName();
			}
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
