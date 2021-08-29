<template>
	<ion-page>
		<UserTopNavbar/>
		<div class="user-info-block">
			<UserInfo />
		</div>
		<Navigations/>
	</ion-page>
</template>

<script>
import Navigations from '@/components/navigations';
import UserTopNavbar from '@/components/userTopNavbar';
import UserInfo from "@/components/userInfo";
import {IonPage} from '@ionic/vue';

export default {
	components: {Navigations, UserTopNavbar, UserInfo, IonPage},
	computed: {
		user() {
			return this.$store.getters.user;
		}
	}
}
</script>

<style scoped>
.ion-page{
	justify-content: flex-start;
}
.user-info-block{
	margin-top: 115px;
	z-index: 111;
}
</style>
