import {ref, onMounted, watch} from 'vue';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import {Filesystem, Directory} from '@capacitor/filesystem'
import {Storage} from '@capacitor/storage'
import firebase from "firebase";
import store from "@/store";

function _base64ToArrayBuffer(base64) {
	let binary_string = window.atob(base64);
	let len = binary_string.length;
	let bytes = new Uint8Array(len);
	for (let i = 0; i < len; i++) {
		bytes[i] = binary_string.charCodeAt(i);
	}
	return bytes.buffer;
}

export function usePhotoGallery() {

	const takePhoto = async () => {
		const cameraPhoto = await Camera.getPhoto({
			resultType: CameraResultType.Base64,
			source: CameraSource.Camera,
			quality: 100
		});
		const fileName = new Date().getTime() + '.jpeg';
		let folderName = store.getters.user.uid + '/avatar';
		const ref = firebase.storage().ref(`${folderName}/${fileName}`)
		const task = ref.put(_base64ToArrayBuffer(cameraPhoto.base64String))
		task.on('state_changed', snapshot => {

		}, error => {
			console.log(error)
		}, () => {
			task.snapshot.ref.getDownloadURL().then(async (url) => {
				await store.dispatch('setUserInfoToDB', {
					avatarUrl: url
				})
				let userDataFromDB = {};
				await firebase.database().ref(`/users/${store.getters.user.uid}/info`).get().then((snapshot) => {
					if (snapshot.exists()) {
						userDataFromDB = snapshot.val();
					} else {
						console.log("No data available");
					}
				}).catch((error) => {
					console.error(error);
				});
				store.commit('setAvatar', {avatar: userDataFromDB.avatar});
			})
		})
	};

	return {
		takePhoto
	};
}

