<template>
	<div class="profile-page">
		<ion-page>
			<UserTopNavbar/>
			<div class="user-info-block">
				<UserInfo v-if="user" :user="user"/>
			</div>
			<Navigations/>
		</ion-page>
	</div>
</template>

<script>
import Navigations from '@/components/navigations';
import UserTopNavbar from '@/components/userTopNavbar';
import UserInfo from "@/components/userInfo";
import UserService from "@/utils/user";
import { IonPage } from '@ionic/vue';

export default {
	components: { Navigations, UserTopNavbar, UserInfo, IonPage },
	data() {
		return {
			user: null,
		}
	},
	methods: {
		async getFullUserData() {
			let { data } = await UserService.getUserData();
			await this.$store.commit('setUser', data.user);
			this.user = {...data.user};
		}
	},
	mounted() {
		this.getFullUserData();
	}
}
</script>
