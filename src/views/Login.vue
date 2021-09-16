<template>
	<div class="login-page">
		<ion-page>
			<ion-card style="box-shadow: none">
				<h1 class="text-center">Введите номер телефона, чтобы войти</h1>
				<ion-item>
					<input class="native-input" v-model="phone" type="tel" inputmode="tel" placeholder="+7 (9__) ___-__-__" v-mask="'+7 (9##) ###-##-##'">
				</ion-item>
				<div class="text-center mt-2 mb-1">
					<ion-button expand="block" id="login-btn" class="login-btn" size="large" @click="login" color="primary">
						Войти
					</ion-button>
				</div>
			</ion-card>
		</ion-page>
	</div>
</template>

<script>
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
	mounted() {
		this.$store.commit('setLoading', false);
	},
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
			this.$store.commit('setLoading', true);
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
			this.$store.commit('setLoading', false);
		}
	},
};
</script>
