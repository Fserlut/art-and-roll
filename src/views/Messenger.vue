<template>
	<ion-page>
		Messenger Page
		<Navigations />
	</ion-page>
</template>

<script>
import Navigations from '@/components/navigations';
import { IonPage } from '@ionic/vue';
export default {
	components: {Navigations, IonPage}
};
</script>
