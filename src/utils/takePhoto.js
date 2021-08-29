import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import {Filesystem, Directory} from '@capacitor/filesystem'
import {Storage} from '@capacitor/storage'
import $api from "@/utils/backend";
import store from "@/store";

export function usePhotoGallery() {

	const takePhoto = async () => {
		const cameraPhoto = await Camera.getPhoto({
			resultType: CameraResultType.Base64,
			source: CameraSource.Camera,
			quality: 80
		});
		try {
			const { data }  = await $api.post('/update-avatar', {
				base64: cameraPhoto.base64String,
				login: store.getters.user.login
			});
			if (data.data.success) {
				store.commit('setUser', data.data.user);
			} else {
				store.commit('setError', {message: 'Ошибка при загрузке фотографии, попробейте еще раз'});
			}
		} catch (e) {
			console.log(e);
			store.commit('setError', {message: e.response.data.message});
			throw e
		}
	};

	return {
		takePhoto
	};
}

