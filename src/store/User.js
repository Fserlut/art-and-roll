import firebase from "firebase";

export default {
	state: {
		isRegistred: false,
		user: {
			phone: '',
			name: '',
			login: '',
			_id: '',
			avatar: '',
		}
	},
	getters: {
		user: s => s.user,
		isRegistred: s => s.isRegistred,
		userPhone: s => s.user.phone,
	},
	actions: {
		async setUserInfoToDB(state, payload) {
			await firebase.database().ref(`/users/${state.state.user.uid}/info`).update({
				avatar: payload.avatarUrl
			});
		},
		async fetchUserData(state) {
			let uid = await state.dispatch('getUid');
			console.log('uid = ', uid);
			await firebase.database().ref(`/users/${uid}/info`).get().then( async (snapshot) => {
				if (snapshot.exists()) {
					await state.commit('setUser', snapshot.val());
				} else {
					console.log("No data available");
				}
			}).catch((error) => {
				console.error(error);
			});;
		}
	},
	mutations: {
		setPhone(state, payload) {
			state.user.phone = payload.phone;
		},
		isRegistred(state, isRegistredVal) {
			state.isRegistred = isRegistredVal;
		},
		setAvatar(state, payload) {
			state.user.avatar = payload.avatar;
		},
		setUserId(state, payload) {
			state.user._id = payload.id
		},
		setUser(state, payload) {
			state.user.avatar = payload.avatar;
			state.user.name = payload.name;
			state.user.login = payload.login;
			state.user.phone = payload.phone;
			state.user.mySpheres = payload.mySpheres;
			state.user.findSpheres = payload.findSpheres;
		},
		clearUser(state) {
			console.log('clear data');
			state.user = {}
		}
	},
}
