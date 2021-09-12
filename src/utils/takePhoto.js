import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import $api from "@/utils/backend";
import store from "@/store";
import router from "@/router";

export function usePhotoGallery() {
	let photo = {};

	const loadGallery = async () => {
		const cameraPhoto = await Camera.getPhoto({
			resultType: CameraResultType.DataUrl,
			source: CameraSource.Photos,
			quality: 80
		});
		photo = {
			date: +new Date(),
			base64: cameraPhoto.dataUrl,
			format: cameraPhoto.format
		};
		store.commit('clearTargetImage');
		store.commit('setTargetImage', { photo })
	};

	const takePhoto = async () => {
		const cameraPhoto = await Camera.getPhoto({
			resultType: CameraResultType.DataUrl,
			source: CameraSource.Camera,
			quality: 80
		});
		photo = {
			date: +new Date(),
			base64: cameraPhoto.dataUrl,
			format: cameraPhoto.format
		};
		store.commit('clearTargetImage');
		store.commit('setTargetImage', { photo })
	};

	return {
		takePhoto,
		photo,
		loadGallery
	};
}

