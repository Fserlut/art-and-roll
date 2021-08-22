import firebase from 'firebase/app';
import store from "@/store/index";

const setRecaptcha = () => {
	window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('phone-sign-in-recaptcha', {
		'size': 'invisible',
		callback: function (response) {
			console.log('captcha resolved');
		},
		"expired-callback": function () {
			console.log('reset recaptcha')
			window.recaptchaVerifier.render().then(function (widgetId) {
				grecaptcha.reset(widgetId);
			})
		}
	});
}

export default {
	actions: {
		async login(state, payload) {
			try {
				if (payload.phone) {
					setRecaptcha();
					let res = await firebase.auth().signInWithPhoneNumber(payload.phone, window.recaptchaVerifier)
						.then((confirmationResult) => {
							window.confirmationResult = confirmationResult;
						}).catch(e => {
							state.commit('setError', e);
						});
				} else {
					await window.confirmationResult.confirm(payload.code).then(async (result) => {
						if (result.additionalUserInfo.isNewUser) {
							console.log('Новый пользователь');
							state.commit('isRegistred', !result.additionalUserInfo.isNewUser);
						} else {
							console.log('Уже зарегистирован');
							await state.dispatch('fetchUserData');
							state.commit('isRegistred', !result.additionalUserInfo.isNewUser);
						}
					}).catch((error) => {
						console.log('bad code');
						state.commit('setError', error);
					});
				}
			} catch (e) {
				state.commit('setError', e);
			}
		},
		async register(state, payload) {
			try {
				const uid = await state.dispatch('getUid');
				await firebase.database().ref(`/users/${uid}/info`).update({
					name: payload.name,
					login: payload.login,
					phone: state.getters.userPhone,
					findSpheres: payload.findSpheres,
					mySpheres: payload.mySpheres,
					avatar: 'https://ionicframework.com/docs/demos/api/avatar/avatar.svg',
				})
			} catch (e) {
				console.log(e);
				state.commit('setError', e);
			}
		},
		async getUid() {
			let user = await firebase.auth().currentUser;
			return user ? user.uid : null;
		},
		async logout(state) {
			await firebase.auth().signOut();
			state.commit('clearUser');
		}
	}
}
