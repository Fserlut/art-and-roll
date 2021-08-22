<template>
	<ion-card>
		<h1 v-if="step == 0" class="text-center">Выберите сферу вашей деятельности</h1>
		<h1 v-else class="text-center">Выберите сферу для поиска</h1>
		<div class="" v-if="step == 0">
			<ion-item>
				<ion-label>Основная сфера</ion-label>
				<ion-select @ionChange="changeSpheres" v-model="selectedCategoryType.main" interface="popover">
					<ion-select-option
						v-for="(sphere, idx) in spheres"
						:key="sphere.title + idx"
						:value="sphere.title"
					>
						{{ sphere.title }}
					</ion-select-option>
				</ion-select>
			</ion-item>
			<ion-item>
				<ion-label>Вторая сфера</ion-label>
				<ion-select @ionChange="changeThird" v-model="selectedCategoryType.second" interface="popover">
					<ion-select-option
						v-for="(sphere, idx) in secondSpheres"
						:key="sphere.title + idx"
						:value="sphere.title"
					>
						{{ sphere.title }}
					</ion-select-option>
				</ion-select>
			</ion-item>
			<ion-item>
				<ion-label>Третья сфера</ion-label>
				<ion-select v-model="selectedCategoryType.third" interface="popover">
					<ion-select-option
						v-for="(sphere, idx) in thirdSpheres"
						:key="sphere.title + idx"
						:value="sphere.title"
					>
						{{ sphere.title }}
					</ion-select-option>
				</ion-select>
			</ion-item>
		</div>
		<div class="" v-else>
			<ion-item>
				<ion-label>Основная сфера</ion-label>
				<ion-select @ionChange="changeSpheres" v-model="selectedFindCategoryType.main" interface="popover">
					<ion-select-option
						v-for="(sphere, idx) in spheres"
						:key="sphere.title + idx"
						:value="sphere.title"
					>
						{{ sphere.title }}
					</ion-select-option>
				</ion-select>
			</ion-item>
			<ion-item>
				<ion-label>Вторая сфера</ion-label>
				<ion-select @ionChange="changeThird" v-model="selectedFindCategoryType.second" interface="popover">
					<ion-select-option
						v-for="(sphere, idx) in secondSpheres"
						:key="sphere.title + idx"
						:value="sphere.title"
					>
						{{ sphere.title }}
					</ion-select-option>
				</ion-select>
			</ion-item>
			<ion-item>
				<ion-label>Третья сфера</ion-label>
				<ion-select v-model="selectedFindCategoryType.third" interface="popover">
					<ion-select-option
						v-for="(sphere, idx) in thirdSpheres"
						:key="sphere.title + idx"
						:value="sphere.title"
					>
						{{ sphere.title }}
					</ion-select-option>
				</ion-select>
			</ion-item>
		</div>
		<div class="text-center mt-2 mb-1">
			<ion-button size="large" @click="nextStep" color="tertiary">Продолжить</ion-button>
		</div>
	</ion-card>
</template>

<script>
import {IonItem, IonLabel, IonSelect, IonSelectOption} from "@ionic/vue"

export default {
	components: {IonItem, IonLabel, IonSelect, IonSelectOption},
	data() {
		return {
			step: 0,
			emitSpheres: {},
			spheres: [
				{
					title: 'Певец',
				},
				{
					title: 'Сценарист',
				},
				{
					title: 'Актер',
				},
				{
					title: 'Режиссер',
				},
				{
					title: 'Композитор',
				},
				{
					title: 'Поэт',
				}
			],
			secondSpheres: this.spheres,
			thirdSpheres: this.spheres,
		}
	},
	computed: {
		getMainType() {
			return this.selectedCategoryType.main;
		},
		getSecondType() {
			return this.selectedCategoryType.second;
		},
		getPhone() {
			return this.$refs.tel.querySelector('input').value;
		},
	},
	methods: {
		nextStep() {
			if (this.step == 0) {
				this.emitSpheres.mySpheres = this.selectedCategoryType;
				this.selectedCategoryType = '';
				this.step++;
			} else {
				this.emitSpheres.findSpheres = this.selectedFindCategoryType;
				this.$emit('nextStep', this.emitSpheres);
			}
		},
		changeThird() {
			this.thirdSpheres = this.spheres.filter(el => el.title != this.selectedCategoryType.main && el.title != this.selectedCategoryType.second);
		},
		changeSpheres() {
			this.secondSpheres = this.spheres.filter(el => el.title != this.selectedCategoryType.main && el.title != this.selectedCategoryType.third);
			this.thirdSpheres = this.spheres.filter(el => el.title != this.selectedCategoryType.main && el.title != this.selectedCategoryType.second);
		}
	},
	setup() {
		let selectedCategoryType = {};
		let selectedFindCategoryType = {};

		selectedCategoryType.main = '';
		selectedFindCategoryType.main = '';
		selectedCategoryType.second = '';
		selectedFindCategoryType.second = '';
		selectedCategoryType.third = '';
		selectedFindCategoryType.third = '';

		return {selectedCategoryType, selectedFindCategoryType};
	}
};
</script>

<style scoped>
ion-card,
ion-item {
	--background: #fff;
	color: #000;
}

ion-item {
	padding-right: 20px;
}
</style>
