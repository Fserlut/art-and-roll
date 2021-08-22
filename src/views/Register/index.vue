<template>
	<ion-page>
		<FirstStep
			v-if="step == 1"
			@next-step="setNextStep"
		/>
		<SecondStep
			v-if="step == 2"
			@next-step="register"
		/>
	</ion-page>
</template>

<script>
import store from "@/store";
import toast from "@/utils/toast";
import {IonPage, loadingController} from '@ionic/vue';
import FirstStep from "@/views/Register/components/FirstStep";
import SecondStep from '@/views/Register/components/SecondStep'

export default {
	data() {
		return {
			step: 1,
			user: {}
		}
	},
	components: {IonPage, FirstStep, SecondStep},
	name: 'Home',
	computed: {},
	methods: {
		setNextStep(userData) {
			this.user = {...this.user, ...userData}
			this.step++;
		},
		async register(userData) {
			console.log(userData);
			const loading = await loadingController
				.create({
					spinner: null,
					message: 'Создаем профиль',
					translucent: true,
					cssClass: 'custom-class custom-loading',
					backdropDismiss: true
				});
			await loading.present();
			this.user = {...this.user, ...userData}
			try {
				await store.dispatch('register', {
					...this.user
				});
				// await toast({
				// 	message: 'Успешно! Через 1,5 секунды мы вам что-то покажем',
				// 	duration: 2000,
				// 	color: 'success'
				// });
				// setTimeout(() => {
				// 	this.$router.push('/main');
				// }, 1500)
			} catch (e) {
				console.log(e);
				throw e;
			}
			await loading.dismiss();
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
