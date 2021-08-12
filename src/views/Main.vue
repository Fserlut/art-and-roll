<template>
	<ion-page>
		Привет, {{ name }} пока все, дальше больше!
	</ion-page>
</template>

<script>
import store from "@/store";
import { IonPage } from '@ionic/vue';

export default {
	components: {
		IonPage
	},
	computed: {
		name() {
			return store.getters.user.name;
		}
	},
}
</script>

<style scoped>
.ion-page {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
