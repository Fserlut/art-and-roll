<template>
	<ion-page>
		<ion-card>
			<ion-avatar>
				<img src="https://ionicframework.com/docs/demos/api/avatar/avatar.svg">
			</ion-avatar>
			<h1 class="text-center">Введите код из смс.</h1>
			<ion-item>
				<input class="native-input" v-model="smscode" type="tel" inputmode="tel" placeholder="# # # #" v-mask="'# # # #'">
			</ion-item>
			<div class="text-center mt-2 mb-1">
				<div class="resend">
					<span v-if="callBack">Отправить код повторно<br>можно будет через: {{backTime}}</span>
					<span @click="sendCode" class="link-btn" v-else>Отправить еще раз</span>
				</div>
				<ion-button expand="block" id="login-btn" class="login-btn" size="large" @click="login" color="tertiary">
					Войти
				</ion-button>
			</div>
		</ion-card>
	</ion-page>
</template>

<script>
import store from "@/store";
import toast from "@/utils/toast";
import {IonPage} from '@ionic/vue';
import auth from '@/utils/auth';
import mutations from "@/utils/mutations";

export default {
	components: {IonPage},
	data() {
		return {
			smscode: '',
			callBack: false,
			backTime: 60,
		}
	},
	name: 'smsCode',
	computed: {
		user() {
			return this.$store.getters.user;
		},
		getCode() {
			return this.$refs.smscode.querySelector('input').value;
		},
	},
	methods: {
		clearCode () {
			this.smscode = '';
		},
		resendCalc() {
			this.code = '';
			if (!this.backTime) {
				this.callBack = false
				this.backTime = 60
				return false
			}

			this.callBack = true
			setTimeout(() => {
				this.backTime--
				this.resendCalc()
			}, 1000)
		},
		async sendCode() {
			this.resendCalc();
			try {
				let data = await auth.sendCode(this.user, this.$route.query.type);
				store.commit('setUserId', {id: data.userId});
				store.commit('setPhone', {phone: this.user.phone});
				if (data.success) {
					toast({
						message: 'Смс с кодом успешно отправлено',
						color: 'success',
						duration: 1000
					})
				} else {
					this.$store.commit('setError', {message: 'Произошла ошибка при отправке смс...'});
				}
			} catch (e) {
				this.$store.commit('setError', {message: 'Произошла ошибка при отправке смс...'})
			}
		},
		async login() {
			try {
				await this.$store.dispatch('login', {phone: this.user.phone, code: mutations.getClearCode(this.smscode)});
				setTimeout(() => {
					this.clearCode();
					this.$router.push('/profile');
				}, 1100);
			} catch (e) {
				console.log(e);
			}
		}
	},
	mounted() {
		this.sendCode();
	}
};
</script>

<style scoped>
.resend{
	font-weight: bold;
	margin-bottom: 20px;
}
.ion-page {
	display: flex;
	align-items: center;
	justify-content: center;
}

ion-card{
	min-width: 350px;
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
