<template>
	<ion-page>
		<ion-toolbar class="pt-ios">
			<ion-title>Main Page</ion-title>
		</ion-toolbar>
		<Navigations />
	</ion-page>
</template>

<script>
import Navigations from '@/components/navigations';
import { IonPage, IonToolbar, IonTitle } from '@ionic/vue';
export default {
	components: { Navigations, IonPage, IonToolbar, IonTitle }
};
</script>

<style scoped>
.ion-toolbar{
	padding-top: ;
}
</style>
