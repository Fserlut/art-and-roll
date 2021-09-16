<template>
	<div class="register-page second-step">
		<ion-card style="box-shadow: none">
			<div>
				<h1 class="text-center">Выберите {{ step > 2 ? stepsOptions[step - 3].title : stepsOptions[step].title }} сферу {{ step > 2 ? 'для поиска' : 'вашей деятельности' }}</h1>
				<ion-item lines="none">
					<ion-label @click="openPicker" class="text-center">
						<strong>{{ picked ? picked : 'Нажмите сюда, чтобы выбрать' }}</strong>
					</ion-label>
				</ion-item>
			</div>
			<div class="text-center mt-1 mb-1">
				<ion-button size="large" class="mb-1" @click="nextStep" color="primary">Продолжить</ion-button>
				<br>
				<span v-if="step !== 0 && step !== 3" @click="skip" class="link-btn">Пропустить</span>
			</div>
		</ion-card>
	</div>
</template>

<script>
import {IonItem, IonLabel, IonSelect, IonSelectOption} from "@ionic/vue"
import {pickerController} from "@ionic/core";

export default {
	components: {IonItem, IonLabel, IonSelect, IonSelectOption},
	data() {
		return {
			step: 0,
			picked: null,
			findSpheres: {},
			mySpheres: {},
			stepsOptions: [
				{
					idx: 0,
					title: 'основую',
					value: 'main',
				},
				{
					idx: 1,
					title: 'вторую',
					value: 'second',
				},
				{
					idx: 2,
					title: 'третью',
					value: 'third',
				}
			],
		}
	},
	computed: {
		getClearSpheres() {
			console.log('this.getMainType = ', this.getMainType);
			return (
				[
					{
						text: "Певец", value: "Певец"
					},
					{
						text: "Сценарист", value: "Сценарист"
					},
					{
						text: "Актер", value: "Актер"
					},
					{
						text: "Режиссер", value: "Режиссер"
					},
					{
						text: "Композитор", value: "Композитор"
					},
					{
						text: "Поэт", value: "Поэт"
					}
				].filter(el => (el.text !== this.getMainType && el.text !== this.getSecondType && el.text !== this.getThird))

			)
		},
		pickingOptions() {
			let clearSpheres = this.getClearSpheres;
			return {
				name: "Spheres",
				options: clearSpheres,
			}
		},
		getMainType() {
			let sphere;
			if (this.step > 2) {
				sphere = this.findSpheres.main;
				return sphere;
			}
			sphere = this.mySpheres.main;
			return sphere
		},
		getSecondType() {
			let sphere;
			if (this.step > 2) {
				sphere = this.findSpheres.second;
				return sphere;
			}
			sphere = this.mySpheres.second;
			return sphere
		},
		getThird() {
			let sphere;
			if (this.step > 2) {
				sphere = this.findSpheres.third;
				return sphere
			}
			sphere = this.mySpheres.third;
			return sphere
		},
		getPhone() {
			return this.$refs.tel.querySelector('input').value;
		},
		validPicked() {
			if (this.step === 0 || this.step === 3) {
				return this.picked !== null
			}
			return true
		}
	},
	methods: {
		skip() {
			this.nextStep();
		},
		async openPicker() {
			const picker = await pickerController.create({
				columns: [this.pickingOptions],
				buttons: [
					{
						text: "Отменить",
						role: "cancel",
					},
					{
						text: "Выбрать",
						handler: (value) => {
							this.picked = value.Spheres.text;
							console.log(this.picked);
						},
					},
				],
			});
			await picker.present();
		},
		nextStep() {
			if (this.validPicked) {
				if (this.step == 5) {
					this.findSpheres[this.stepsOptions[this.step - 3].value] = this.picked;
					this.$emit('nextStep', { findSpheres: this.findSpheres, mySpheres: this.mySpheres });
				} else {
					if (this.step > 2) {
						this.findSpheres[this.stepsOptions[this.step - 3].value] = this.picked;
					} else {
						this.mySpheres[this.stepsOptions[this.step].value] = this.picked;
					}
					this.picked = null;
					this.step++;
					this.openPicker();
				}
			} else {
				this.$store.commit('setError', {message: 'Чтобы продолжить нужно выбрать сферу'})
			}
		}
	},
}
</script>

<style scoped>

</style>
