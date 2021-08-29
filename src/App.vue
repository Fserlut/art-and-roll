<template>
	<ion-app>
		<ion-router-outlet/>
		<Error />
	</ion-app>
</template>

<script>
import {IonApp, IonRouterOutlet} from '@ionic/vue';
import {defineComponent} from 'vue';
import Error from '@/components/error';

export default defineComponent({
	name: 'App',
	components: {
		IonApp,
		IonRouterOutlet,
		Error
	},
	async created() {
		if (localStorage.getItem('token')) {
			await this.$store.dispatch('checkAuth');
		}
	}
});
</script>
