<template>
	<ion-app>
		<ion-router-outlet/>
		<Loading v-if="loading" />
		<Error />
	</ion-app>
</template>

<script>
import {IonApp, IonRouterOutlet} from '@ionic/vue';
import {defineComponent} from 'vue';
import Error from '@/components/error';
import Loading from '@/components/loading';

export default defineComponent({
	name: 'App',
	components: {
		IonApp,
		IonRouterOutlet,
		Error,
		Loading
	},
	computed: {
		loading() {
			return this.$store.getters.getLoading;
		}
	},
	async created() {
		if (localStorage.getItem('token')) {
			await this.$store.dispatch('checkAuth');
		}
	}
});
</script>
