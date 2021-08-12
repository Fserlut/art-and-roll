import {createRouter, createWebHistory} from '@ionic/vue-router';
// eslint-disable-next-line no-unused-vars
import {RouteRecordRaw} from 'vue-router';
import Login from '../views/Login.vue'
import Register from "@/views/Register";
import Main from "@/views/Main";
import firebase from 'firebase/app';
import store from "@/store";
import Profile from "@/views/Profile";
import Messenger from "@/views/Messenger";
import Search from "@/views/Search";

const routes = [
	{
		path: '/',
		beforeEnter(to, from, next) {
			if (!firebase.auth().currentUser){
				next('/login')
			}
			store.commit('setUser', {name: firebase.auth().currentUser.displayName, email: firebase.auth().currentUser.email, uid: firebase.auth().currentUser.uid});
			next('/main');
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		beforeEnter(to, from, next) {
			if (!firebase.auth().currentUser){
				next()
			}
			next('/main');
		}
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
		beforeEnter(to, from, next) {
			if (!firebase.auth().currentUser){
				next()
			}
			next('/main');
		}
	},
	{
		path: '/main',
		name: 'Main',
		component: Main,
		beforeEnter(to, from, next) {
			if (!firebase.auth().currentUser){
				next('/login')
			}
			store.commit('setUser', {name: firebase.auth().currentUser.displayName, email: firebase.auth().currentUser.email, uid: firebase.auth().currentUser.uid});
			next();
		}
	},
	{
		path: '/profile',
		name: 'Profile',
		component: Profile,
		beforeEnter(to, from, next) {
			if (!firebase.auth().currentUser){
				next('/login')
			}
			next();
		}
	},
	{
		path: '/messenger',
		name: 'Messenger',
		component: Messenger,
		beforeEnter(to, from, next) {
			if (!firebase.auth().currentUser){
				next('/login')
			}
			next();
		}
	},
	{
		path: '/search',
		name: 'Search',
		component: Search,
		beforeEnter(to, from, next) {
			if (!firebase.auth().currentUser){
				next('/login')
			}
			next();
		}
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
