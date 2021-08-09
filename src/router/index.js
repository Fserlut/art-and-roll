import {createRouter, createWebHistory} from '@ionic/vue-router';
// eslint-disable-next-line no-unused-vars
import {RouteRecordRaw} from 'vue-router';
import Home from '../views/Home.vue'

const routes = [
	{
		path: '/',
		redirect: '/home'
	},
	{
		path: '/home',
		name: 'Home',
		component: Home
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
