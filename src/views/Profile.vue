<template>
	<ion-page>
		<UserTopNavbar/>
		<div class="user-info-block">
			<UserInfo :user="user" />
		</div>
		<Navigations/>
	</ion-page>
</template>

<script>
import Navigations from '@/components/navigations';
import UserTopNavbar from '@/components/userTopNavbar';
import UserInfo from "@/components/userInfo";
import UserService from "@/utils/user";
import { IonPage } from '@ionic/vue';

export default {
	components: { Navigations, UserTopNavbar, UserInfo, IonPage },
	computed: {
		user() {
			return this.$store.getters.user;
		}
	},
	methods: {
		async getFullUserData() {
			let res = await UserService.getUserData();
			console.log(res);
		}
	},
	mounted() {
		this.getFullUserData();
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
