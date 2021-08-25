import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/login')
	},
	{
		path: '/article/:articleId',
		name: 'article',
		component: () => import('../views/article'),
		props: true
	},
	{
		path: '/search',
		name: 'search',
		component: () => import('../views/search')
	},
	{
		path: '/',
		// name: 'Layout',
		component: () => import('../views/layout'),
		children: [
			{
				path: '',
				name: 'home',
				component: () => import('../views/home')
			},
			{
				path: '/qa',
				name: 'qa',
				component: () => import('../views/qa')
			},
			{
				path: '/radio',
				name: 'radio',
				component: () => import('../views/radio')
			},
			{
				path: '/my',
				name: 'my',
				component: () => import('../views/my')
			}
		]
	}
]

const router = new VueRouter({
	routes
})

export default router
