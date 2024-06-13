import { createRouter, createWebHistory, } from 'vue-router'
import type { RouterOptions } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogInView from '../views/LogInView.vue'
import SignUpView from '../views/SignUpView.vue'
import ProfileView from '../views/ProfileView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import InvestorsView from '../views/InvestorsView.vue'
import ProjectView from '../views/ProjectView.vue'
import InvestorView from '../views/InvestorView.vue'
import RequestsView from '../views/RequestsView.vue'

const router = createRouter(<RouterOptions> {
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/login',
            name: 'login',
            component: LogInView
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignUpView
        },
        {
            path: '/u/:userId/profile',
            name: 'profile',
            component: ProfileView
        },
        {
            path: '/projects',
            name: 'projects',
            component: ProjectsView
        },
        {
            path: '/u/:userId/projects',
            name: 'userProjects',
            component: ProjectsView
        },
        {
            path: '/project/:projectId',
            name: 'project',
            component: ProjectView
        },
        {
            path: '/investors',
            name: 'investors',
            component: InvestorsView
        },
        {
            path: '/u/:userId/investors',
            name: 'userInvestors',
            component: InvestorsView
        },
        {
            path: '/investor/:investorId',
            name: 'investor',
            component: InvestorView
        },
        {
            path: '/:role/requests',
            name: 'requests',
            component: RequestsView
        },
        {
            path: '/u/:userId/requests',
            name: 'userRequests',
            component: RequestsView
        },
        // {
        //     path: '/:pathMatch(.*)',
        //     redirect: '/'
        // }
    ]
})

router.beforeEach((to, from, next) => {
    const publicViews = [
        'home',
        'login',
        'signup',
        'projects',
        'project',
        'investors',
        'investor',
    ];
    const authRequired = !publicViews.includes(to.name.toString());
    const loggedIn = localStorage.getItem('authToken');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
})

export default router
