import auth from './auth';
import user from './User';
import imageEditor from "@/store/imageEditor";
import {createStore} from 'vuex';

const store = createStore({
	state: {
		error: null,
		loading: false,
	},
	mutations: {
		setError(state, error) {
			state.error = error;
		},
		clearError(state) {
			state.error = null;
		},
		setLoading(state, value) {
			state.loading = value;
		}
	},
	getters: {
		error: s => s.error,
		getLoading: s => s.loading,
	},
	modules:{
		auth,
		user,
		imageEditor
	}
});

export default store;
