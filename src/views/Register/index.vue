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
import {IonPage} from '@ionic/vue';
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
			this.$store.commit('setLoading', true);

			this.user = {...this.user, ...userData, phone: this.$store.getters.user.phone}
			this.$store.commit('setUser', this.user);
			this.$store.commit('setLoading', false);
			await this.$router.push('/smscode?type=Register');
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
