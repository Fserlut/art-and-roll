<template>
	<ion-page>
		<h1 class="text-center">Ваша фотография</h1>
		<div class="canvas-parent">
<!--			<canvas width="100px" height="80px" ref="canvas" id="c"></canvas>-->
		</div>
		<ion-fab vertical="center" horizontal="end" slot="fixed">
			<ion-fab-button>
				<ion-icon :icon="add"></ion-icon>
			</ion-fab-button>
		</ion-fab>
		<ion-button @click="uploadAvatar" class="upload-img" expand="full">Обновить аватар</ion-button>
	</ion-page>
</template>

<script>
import { IonPage } from '@ionic/vue';
import { add } from 'ionicons/icons';
import {
	IonFab,
	IonFabButton,
	IonIcon,
} from '@ionic/vue';
import $api from "@/utils/backend";

export default {
	components: { IonPage, IonFab, IonFabButton, IonIcon },
	data() {
		return {
			param: this.$route.params.param,
			canvas: '',
			ctx: '',
			init: true,
			canvasWidth: '',
			canvasHeight: '',
		}
	},
	methods: {
		async uploadAvatar() {
			try {
				const { data }  = await $api.post('/update-avatar', {
					base64: this.canvas.toDataURL("image/jpeg").split(';base64,')[1],
					login: this.$store.getters.user.login
				});
				if (data.data.success) {
					await this.$store.commit('setUser', data.data.user);
					await this.$store.commit('clearTargetImage');
					this.destroyCanvas();
					await this.$router.push('/profile');
				} else {
					this.$store.commit('setError', {message: 'Ошибка при загрузке фотографии, попробейте еще раз'});
				}
			} catch (e) {
				console.log(e);
				this.$store.commit('setError', {message: e.response.data.message});
				throw e
			}
		},
		async initCanvas() {
			this.createCanvas();
			let c = document.getElementById("c");
			this.canvas = c;
			let ctx = c.getContext("2d");
			this.ctx = ctx;
			this.canvasWidth = 100 * window.innerWidth / 100;
			let sizeWidth = this.canvasWidth;
			this.canvasHeight = 100 * (window.innerHeight - 100) / 100 || 766;
			let sizeHeight = this.canvasHeight;

			c.width = sizeWidth;
			c.height = sizeHeight;
			c.style.width = sizeWidth;
			c.style.height = sizeHeight;
			this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
			let image = new Image();
			image.src = this.$store.getters.getTargetImage.base64;
			image.onload = function() {
				let scale = Math.max(c.width / image.width, c.height / image.height);
				let x = (c.width / 2) - (image.width / 2) * scale;
				let y = (c.height / 2) - (image.height / 2) * scale;
				ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
			}
		},
		destroyCanvas() {
			document.querySelector('canvas') ? document.querySelector('canvas').remove() : '';
		},
		createCanvas() {
			let canvas = document.createElement('canvas');
			this.canvas = canvas;
			canvas.id = 'c';
			document.querySelector('.canvas-parent').append(this.canvas);
		}
	},
	beforeUnmount() {
		this.destroyCanvas();
	},
	beforeDestroy() {
		this.destroyCanvas();
	},
	watch: {
		'$route'() {
			this.destroyCanvas();
			this.initCanvas();
		}
	},
	beforeRouteUpdate(to, from, next) {
		this.param = to.params.param;
		next();
	},
	mounted() {
		this.destroyCanvas();
		this.initCanvas();
	},
	setup() {
		return {
			add
		}
	}
};
</script>

<style scoped>
.upload-img{
	position: fixed;
	bottom: -5px;
	z-index: 9999999999;
	right: -5px;
	left: -5px;
	min-height: 53px;
}
.ion-page{
	justify-content: flex-start;
}
</style>
