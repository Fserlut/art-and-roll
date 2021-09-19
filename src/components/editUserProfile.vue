<template>
	<ion-page>
		<div class="user-edit-profile-modal">
			<ion-header>
				<ion-toolbar class="pt-ios ion-padding-top ion-padding-bottom">
					<ion-card-title class="text-center">Редактирование профиля</ion-card-title>
					<ion-icon
						class="close-modal-icon"
						@click="closeModal"
						size="large"
						:icon="chevronBackSharp"
					>
					</ion-icon>
				</ion-toolbar>
			</ion-header>
			<ion-content class="ion-padding">
				<userAvatar :show-text-edit-avatar="true" :avatar="$store.getters.user.avatar" />
				<ion-item class="name-input">
					<ion-label>Имя:</ion-label>
					<ion-input
						ref="name"
						autocomplete="off"
						inputmode="text"
						:value="userName"
						placeholder="Введите имя"
					></ion-input>
				</ion-item>
				<ion-item class="login-input">
					<ion-label>Логин:</ion-label>
					<ion-input
						ref="login"
						autocomplete="off"
						inputmode="text"
						:value="userLogin"
						placeholder="Введите логин"
					></ion-input>
				</ion-item>
				<ion-item class="desc-input">
					<ion-label
						ref="desc"
						placeholder="Введите описание"
					>
						Описание</ion-label>
					<ion-textarea
						maxLength="100"
						rows="5"
						autocomplete="off"
						inputmode="text"
						:value="userDescription"
					>

					</ion-textarea>
				</ion-item>
				<ion-item class="find-input">
					<ion-label>Основаная сфера</ion-label>

				</ion-item>
				<div class="button-container">
					<ion-button @click="editProfile" expand="block" color="primary">Обновить</ion-button>
				</div>
			</ion-content>
		</div>
	</ion-page>
</template>

<script>
import {
	IonPage,
	IonContent,
	IonHeader,
	IonCardTitle,
	IonToolbar,
	modalController,
	IonIcon,
	IonItem,
	IonLabel,
	IonInput,
} from '@ionic/vue';
import { chevronBackSharp } from 'ionicons/icons';

import userAvatar from '@/components/userAvatar';

import {validLogin, validName} from '@/utils/validator';

export default {
	data() {
		return {
			userName: '',
			userLogin: '',
			userDescription: '',
		}
	},
	props: {
		user: {
			type: Object,
		}
	},
	computed: {
		getName() {
			return document.querySelector('.name-input input').value;
		}
	},
	mounted() {
		this.userName = this.user.name;
		this.userLogin = this.user.login;
		this.userDescription = this.user.profileDescription;
	},
	methods: {
		async editProfile() {
			let name = document.querySelector('.name-input input').value;
			let login = document.querySelector('.login-input input').value;
			let desc = document.querySelector('.desc-input textarea').value;
			validName(name, true);
			let loginIsValid = login !== this.$store.getters.user.login ? await validLogin(login) : true;
			if (!loginIsValid && !validName(name)) {
				console.log('Можно менять профиль');
			}
		},
		closeModal() {
			modalController.dismiss();
		}
	},
	components: { IonItem, IonLabel, IonInput, userAvatar, IonContent, IonHeader, IonCardTitle, IonToolbar, IonIcon, IonPage },
	setup() {
		return {
			chevronBackSharp
		}
	}
};
</script>

<style scoped>
.user-edit-profile-modal {
	height: 100vh;
}

.close-modal-icon {
	position: absolute;
	left: 5px;
	top: 50%;
	transform: translateY(-50%);
}
</style>
