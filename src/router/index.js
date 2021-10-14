import {createRouter, createWebHistory} from '@ionic/vue-router';
import store from "@/store";
import Login from '../views/Login.vue'
import Register from "@/views/Register/index";
import Main from "@/views/Main";
import Profile from "@/views/Profile";
import Messenger from "@/views/Messenger";
import Search from "@/views/Search";
import SmsCode from "@/views/SmsCode";
import EditPhoto from "@/views/EditPhoto";

const routes = [
	{
		path: '/',
		redirect: '/login',
		async beforeEnter(to, from, next) {
			if (localStorage.getItem('token')) {
				await store.dispatch('checkAuth');
				if (!store.getters.isAuth){
					next('/login')
				}
				next('/profile');
			} else {
				next('/login');
			}
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		async beforeEnter(to, from, next) {
			if (localStorage.getItem('token')) {
				await store.dispatch('checkAuth');
				if (!store.getters.isAuth){
					next()
				}
				next(from.fullPath);
			} else {
				next();
			}
		}
	},
	{
		path: '/smscode',
		name: 'SmsCode',
		component: SmsCode,
		async beforeEnter(to, from, next) {
			if (localStorage.getItem('token')) {
				await store.dispatch('checkAuth');
				if (!store.getters.isAuth){
					next()
				}
				next('/profile');
			} else {
				next();
			}
		}
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
		async beforeEnter(to, from, next) {
			if (localStorage.getItem('token')) {
				await store.dispatch('checkAuth');
				if (!store.getters.isAuth){
					next()
				}
				next('/profile');
			} else {
				next();
			}
		}
	},
	{
		path: '/main',
		name: 'Main',
		component: Main,
		async beforeEnter(to, from, next) {
			if (localStorage.getItem('token')) {
				await store.dispatch('checkAuth');
				if (store.getters.isAuth){
					next();
				}
				next('/login')
			} else {
				next('/login');
			}
		}
	},
	{
		path: '/profile',
		name: 'Profile',
		component: Profile,
		async beforeEnter(to, from, next) {
			if (localStorage.getItem('token')) {
				await store.dispatch('checkAuth');
				if (!store.getters.isAuth){
					next('/login')
				}
				next();
			} else {
				next('/login');
			}
		}
	},
	{
		path: '/edit-photo',
		name: 'EditPhoto',
		component: EditPhoto,
		async beforeEnter(to, from, next) {
			if (localStorage.getItem('token')) {
				await store.dispatch('checkAuth');
				if (!store.getters.isAuth){
					next('/login')
				}
				next();
			} else {
				next('/login');
			}
		}
	},
	{
		path: '/messenger',
		name: 'Messenger',
		component: Messenger,
		async beforeEnter(to, from, next) {
			if (localStorage.getItem('token')) {
				await store.dispatch('checkAuth');
				if (!store.getters.isAuth){
					next('/login')
				}
				next();
			} else {
				next('/login');
			}
		}
	},
	{
		path: '/search',
		name: 'Search',
		component: Search,
		async beforeEnter(to, from, next) {
			if (localStorage.getItem('token')) {
				await store.dispatch('checkAuth');
				if (!store.getters.isAuth){
					next('/login')
				}
				next();
			} else {
				next('/login');
			}
		}
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
