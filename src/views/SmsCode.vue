<template>
	<div class="sms-code-page">
		<ion-page>
			<ion-icon @click="close" size="large" :icon="closeOutline"></ion-icon>
			<ion-card style="box-shadow: none">
				<h1 class="text-center">Введите код из смс.</h1>
				<ion-item>
					<input @blur="checkFour" @change="checkFour" @input="checkFour" ref="code" class="native-input" v-model="smscode" type="tel" inputmode="tel" placeholder="# # # #" v-mask="'# # # #'">
				</ion-item>
				<div class="text-center mt-2 mb-1">
					<div class="resend">
						<span v-if="callBack">Отправить код повторно<br>можно будет через: {{backTime}}</span>
						<span @click="sendCode" class="link-btn" v-else>Отправить еще раз</span>
					</div>
					<ion-button expand="block" id="login-btn" class="login-btn" size="large" @click="login" color="primary">
						Войти
					</ion-button>
				</div>
			</ion-card>
		</ion-page>
	</div>
</template>

<script>
import toast from "@/utils/toast";
import {IonPage, IonIcon} from '@ionic/vue';
import auth from '@/utils/auth';
import mutations from "@/utils/mutations";
import { closeOutline } from 'ionicons/icons';

export default {
	components: { IonPage, IonIcon },
	data() {
		return {
			smscode: '',
			callBack: false,
			backTime: 60,
		}
	},
	name: 'smsCode',
	watch: {
		'$route'() {
			document.location.href = '/login';
		}
	},
	computed: {
		user() {
			return this.$store.getters.user;
		},
	},
	methods: {
		close() {
			this.$store.commit('setLoading', true);
			this.$store.commit('clearUser');
			document.location.href = '/login';
		},
		checkFour() {
			if (this.smscode.length === 7) {
				this.login();
			}
		},
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
			this.$refs.code.focus()
			try {
				let data = await auth.sendCode(this.user, this.$route.query.type);
				this.$store.commit('setUserId', {id: data.userId});
				this.$store.commit('setPhone', {phone: this.user.phone});
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
				this.$refs.code.blur();
				this.$store.commit('setLoading', true);
				await this.$store.dispatch('login', {phone: this.user.phone, code: mutations.getClearCode(this.smscode)});
				setTimeout(() => {
					this.clearCode();
					this.$store.commit('setLoading', false);
					document.location.href = '/profile';
				}, 1100);
			} catch (e) {
				console.log(e);
			}
		}
	},
	mounted() {
		this.sendCode();
	},
	setup() {
		return {
			closeOutline
		}
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
