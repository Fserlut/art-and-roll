<template>
	<ion-tabs @ionTabsWillChange="beforeTabChange" @ionTabsDidChange="afterTabChange">
		<ion-tab-bar slot="bottom">
			<ion-tab-button tab="main" href="/main">
				<ion-icon :icon="homeSharp"></ion-icon>
			</ion-tab-button>

			<ion-tab-button tab="search" href="/search">
				<ion-icon :icon="searchSharp"></ion-icon>
			</ion-tab-button>

			<ion-tab-button tab="messenger" href="/messenger">
				<ion-badge color="danger">66</ion-badge>
				<ion-icon :icon="chatbubbleEllipsesSharp"></ion-icon>
			</ion-tab-button>

			<ion-tab-button tab="profile" href="/profile">
				<ion-icon :icon="personSharp"></ion-icon>
			</ion-tab-button>
		</ion-tab-bar>
	</ion-tabs>
</template>

<script>
import {
	IonIcon,
	IonTabBar,
	IonTabButton,
	IonTabs
} from '@ionic/vue';
import {personSharp, homeSharp, chatbubbleEllipsesSharp, searchSharp} from 'ionicons/icons';

export default {
	components: {IonIcon, IonTabBar, IonTabButton, IonTabs},
	setup() {
		const beforeTabChange = () => {
			// do something before tab change
		}
		const afterTabChange = () => {
			// do something after tab change
		}
		return {
			searchSharp,
			homeSharp,
			personSharp,
			chatbubbleEllipsesSharp,
			beforeTabChange,
			afterTabChange
		}
	}
};
</script>

<style>
ion-tab-bar{
	border-top: 1px solid rgba(255, 255, 255, .2);
	padding-top: 5px;
}
</style>
