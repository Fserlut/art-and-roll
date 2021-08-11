<template>
	<div>

	</div>
</template>

<script>
import messages from "@/utils/messages";
import store from "@/store";
import toast from "@/utils/toast";
export default {
	computed: {
		error() {
			return store.getters.error;
		}
	},
	watch: {
		error(e) {
			toast({message: messages[e.code] || 'Что-то пошло не так', duration: 1500, color: 'danger'});
		}
	},
}
</script>

<style scoped>

</style>
