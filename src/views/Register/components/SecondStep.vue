<template>
	<ion-card>
		<h1 class="text-center">Тут вы заполняете свой профиль</h1>
		<ion-item>
			<ion-label position="floating">Телефон</ion-label>
			<ion-input inputmode="tel" type="tel" ref="tel"></ion-input>
		</ion-item>
		<div class="text-center mt-2 mb-1">
			<ion-button size="large" @click="nextStep" color="tertiary">Продолжить</ion-button>
		</div>
	</ion-card>
</template>

<script>

export default {
	computed: {
		getPhone() {
			return this.$refs.tel.querySelector('input').value;
		}
	},
	methods: {
		nextStep() {
			this.$emit('nextStep', {phone: this.getPhone});
		}
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
