import { toastController } from '@ionic/vue';

export default async (config) => {
	const toast = await toastController
		.create({
			message: config.message,
			duration: config.duration,
			color: config.color,
		})
	return toast.present();
}
