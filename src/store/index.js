import auth from './auth';
import user from './User';
import imageEditor from "@/store/imageEditor";
import {createStore} from 'vuex';

const store = createStore({
	state: {
		error: null
	},
	mutations: {
		setError(state, error) {
			state.error = error;
		},
		clearError(state) {
			state.error = null;
		}
	},
	getters: {
		error: s => s.error,
	},
	modules:{
		auth,
		user,
		imageEditor
	}
});

export default store;
