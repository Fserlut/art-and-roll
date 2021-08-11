<template>
	<div>
		Привет, {{ name }} пока все, дальше больше!
	</div>
</template>

<script>
import store from "@/store";

export default {
	computed: {
		name() {
			return store.getters.user.name;
		}
	}
}
</script>

<style scoped>

</style>
