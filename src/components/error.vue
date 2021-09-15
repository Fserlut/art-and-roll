<template>
	<div>

	</div>
</template>

<script>
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
			toast({ message: e.message, duration: 1500, color: 'danger', 'css-class': 'error-toast' });
		}
	},
}
</script>
