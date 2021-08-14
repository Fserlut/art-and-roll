import firebase from 'firebase/app';

export default {
	actions: {
		async login(state, payload) {
			try {
				let res = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);
				state.commit('setUser', {name: res.user.displayName, email: res.user.email, uid: res.user.uid});
			} catch (e) {
				state.commit('setError', e);
			}
		},
		async register(state, payload) {
			try {
				await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(function(result) {
					state.commit('setUser', {name: result.user.displayName, email: result.user.email, uid: result.user.uid});
					return result.user.updateProfile({
						displayName: payload.name,
					});
				});
				const uid = await state.dispatch('getUid');
				await firebase.database().ref(`/users/${uid}/info`).set({
					name: payload.name,
				})
			} catch (e) {
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
