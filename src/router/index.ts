import { createRouter, createWebHistory, } from 'vue-router'
import type { RouterOptions } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogInView from '../views/LogInView.vue'
import SignUpView from '../views/SignUpView.vue'
import ProfileView from '../views/ProfileView.vue'
import ProjectsListView from '../views/ProjectsListView.vue'
import UserProjectsListView from '../views/UserProjectsListView.vue'
import ProjectView from '../views/ProjectView.vue'
import InvestorsListView from '../views/InvestorsListView.vue'
import UserInvestorsListView from '../views/UserInvestorsListView.vue'
import InvestorView from '../views/InvestorView.vue'
import RequestView from '../views/RequestView.vue'
import UserRequestsListView from '../views/UserRequestsListView.vue'
import ModeratorRequestsListView from '../views/ModeratorRequestsListView.vue'
import BookmarksListView from '../views/BookmarksListView.vue'

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
            component: ProjectsListView
        },
        {
            path: '/u/:userId/projects',
            name: 'userProjects',
            component: UserProjectsListView
        },
        {
            path: '/project/:projectId',
            name: 'project',
            component: ProjectView,
        },
        {
            path: '/investors',
            name: 'investors',
            component: InvestorsListView
        },
        {
            path: '/u/:userId/investors',
            name: 'userInvestors',
            component: UserInvestorsListView
        },
        {
            path: '/investor/:investorId',
            name: 'investor',
            component: InvestorView
        },
        {
            path: '/admin/requests',
            name: 'requests',
            component: ModeratorRequestsListView
        },
        {
            path: '/u/:userId/requests',
            name: 'userRequests',
            component: UserRequestsListView
        },
        {
            path: '/request/:requestId',
            name: 'request',
            component: RequestView
        },
        {
            path: '/u/:userId/bookmarks',
            name: 'bookmarks',
            component: BookmarksListView
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
